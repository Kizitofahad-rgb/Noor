import { Router, type Response } from 'express';
import { query } from './db.ts';
import {
  hashPassword,
  comparePassword,
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  requireAuth,
  optionalAuth,
  type AuthenticatedRequest,
} from './auth.ts';

export const apiRouter = Router();

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * POST /api/auth/signup
 * Create a new user with email, password (hashed with bcrypt), and display_name
 */
apiRouter.post('/auth/signup', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, displayName } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanName = (typeof displayName === 'string' && displayName.trim())
      ? displayName.trim()
      : email.split('@')[0];

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = await query('SELECT id FROM users WHERE LOWER(email) = $1', [cleanEmail]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    // Hash password with bcrypt
    const passwordHash = await hashPassword(password);

    // Insert user into PostgreSQL database
    const insertRes = await query(
      `INSERT INTO users (email, password_hash, display_name, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, email, display_name, created_at`,
      [cleanEmail, passwordHash, cleanName]
    );

    const userRow = insertRes.rows[0];
    const userPayload = {
      id: userRow.id,
      email: userRow.email,
      displayName: userRow.display_name,
    };

    // Issue session JWT token stored in httpOnly cookie
    const token = generateToken(userPayload);
    setAuthCookie(res, token);

    return res.status(201).json({
      user: {
        id: userRow.id,
        email: userRow.email,
        displayName: userRow.display_name,
        createdAt: userRow.created_at,
      },
      token, // also returned for clients requiring Authorization header
    });
  } catch (error) {
    console.error('[Auth Error] Signup failed:', error);
    return res.status(500).json({ error: 'An unexpected error occurred during sign up. Please try again.' });
  }
});

/**
 * POST /api/auth/login
 * Verify user password and issue JWT session cookie
 */
apiRouter.post('/auth/login', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const userResult = await query(
      'SELECT id, email, password_hash, display_name, created_at FROM users WHERE LOWER(email) = $1',
      [cleanEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userRow = userResult.rows[0];
    const isPasswordValid = await comparePassword(String(password), userRow.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userPayload = {
      id: userRow.id,
      email: userRow.email,
      displayName: userRow.display_name,
    };

    const token = generateToken(userPayload);
    setAuthCookie(res, token);

    return res.status(200).json({
      user: {
        id: userRow.id,
        email: userRow.email,
        displayName: userRow.display_name,
        createdAt: userRow.created_at,
      },
      token,
    });
  } catch (error) {
    console.error('[Auth Error] Login failed:', error);
    return res.status(500).json({ error: 'An unexpected error occurred during login. Please try again.' });
  }
});

/**
 * POST /api/auth/logout
 * Clear session cookie
 */
apiRouter.post('/auth/logout', (_req: AuthenticatedRequest, res: Response) => {
  clearAuthCookie(res);
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
});

/**
 * GET /api/auth/me
 * Fetch currently authenticated user or null
 */
apiRouter.get('/auth/me', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.json({ user: null });
  }

  try {
    const userRes = await query(
      'SELECT id, email, display_name, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userRes.rows.length === 0) {
      clearAuthCookie(res);
      return res.json({ user: null });
    }

    const user = userRes.rows[0];
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('[Auth Error] Fetching /api/auth/me failed:', error);
    return res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

/**
 * PUT /api/auth/profile
 * Edit user display name (Protected)
 */
apiRouter.put('/auth/profile', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { displayName } = req.body || {};
    if (!displayName || typeof displayName !== 'string' || displayName.trim().length < 2) {
      return res.status(400).json({ error: 'Display name must be at least 2 characters.' });
    }

    const cleanName = displayName.trim();

    const updateRes = await query(
      `UPDATE users 
       SET display_name = $1 
       WHERE id = $2 
       RETURNING id, email, display_name, created_at`,
      [cleanName, req.user!.id]
    );

    if (updateRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = updateRes.rows[0];

    // Issue updated token with new name
    const newToken = generateToken({
      id: user.id,
      email: user.email,
      displayName: user.display_name,
    });
    setAuthCookie(res, newToken);

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        createdAt: user.created_at,
      },
      token: newToken,
    });
  } catch (error) {
    console.error('[Profile Update Error]', error);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// ============================================================================
// USER PROGRESS ROUTES (PROTECTED)
// ============================================================================

/**
 * GET /api/progress
 * Retrieve the user's recitation and surah practice progress
 */
apiRouter.get('/progress', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT id, user_id, surah_id, verse_id, status, updated_at 
       FROM user_progress 
       WHERE user_id = $1 
       ORDER BY updated_at DESC`,
      [req.user!.id]
    );

    const progress = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      surahId: row.surah_id,
      verseId: row.verse_id,
      status: row.status,
      updatedAt: row.updated_at,
    }));

    return res.json({ progress });
  } catch (error) {
    console.error('[Progress Fetch Error]', error);
    return res.status(500).json({ error: 'Failed to retrieve progress.' });
  }
});

/**
 * POST /api/progress
 * Upsert a recitation progress entry (e.g., "practiced" / "completed")
 */
apiRouter.post('/progress', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { surahId, verseId, status } = req.body || {};

    if (!surahId && !verseId) {
      return res.status(400).json({ error: 'Either surahId or verseId must be provided.' });
    }

    const progressStatus = status || 'practiced';

    const result = await query(
      `INSERT INTO user_progress (user_id, surah_id, verse_id, status, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, surah_id, verse_id)
       DO UPDATE SET status = EXCLUDED.status, updated_at = NOW()
       RETURNING id, user_id, surah_id, verse_id, status, updated_at`,
      [req.user!.id, surahId ? String(surahId) : null, verseId ? String(verseId) : null, progressStatus]
    );

    const row = result.rows[0];
    return res.status(201).json({
      progress: {
        id: row.id,
        userId: row.user_id,
        surahId: row.surah_id,
        verseId: row.verse_id,
        status: row.status,
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    console.error('[Progress Save Error]', error);
    return res.status(500).json({ error: 'Failed to save recitation progress.' });
  }
});

/**
 * DELETE /api/progress/:id
 * Remove a specific progress entry
 */
apiRouter.delete('/progress/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM user_progress WHERE id = $1 AND user_id = $2', [id, req.user!.id]);
    return res.json({ success: true });
  } catch (error) {
    console.error('[Progress Delete Error]', error);
    return res.status(500).json({ error: 'Failed to delete progress entry.' });
  }
});

// ============================================================================
// SUBMITTED REELS ROUTES (PROTECTED)
// ============================================================================

/**
 * GET /api/reels/user
 * Fetch the authenticated user's submitted reels with their approval status
 */
apiRouter.get('/reels/user', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT id, user_id, video_url, caption, status, created_at 
       FROM submitted_reels 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user!.id]
    );

    const reels = result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      videoUrl: row.video_url,
      caption: row.caption,
      status: row.status,
      createdAt: row.created_at,
    }));

    return res.json({ reels });
  } catch (error) {
    console.error('[User Reels Fetch Error]', error);
    return res.status(500).json({ error: 'Failed to retrieve submitted reels.' });
  }
});

/**
 * POST /api/reels/submit
 * Submit a reel for moderation (pending)
 */
apiRouter.post('/reels/submit', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { videoUrl, caption } = req.body || {};

    if (!videoUrl || typeof videoUrl !== 'string' || videoUrl.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide a valid video URL or YouTube link.' });
    }

    if (!caption || typeof caption !== 'string' || caption.trim().length < 3) {
      return res.status(400).json({ error: 'Please provide a caption describing this reflection.' });
    }

    const cleanUrl = videoUrl.trim();
    const cleanCaption = caption.trim();

    const insertRes = await query(
      `INSERT INTO submitted_reels (user_id, video_url, caption, status, created_at)
       VALUES ($1, $2, $3, 'pending', NOW())
       RETURNING id, user_id, video_url, caption, status, created_at`,
      [req.user!.id, cleanUrl, cleanCaption]
    );

    const row = insertRes.rows[0];
    return res.status(201).json({
      reel: {
        id: row.id,
        userId: row.user_id,
        videoUrl: row.video_url,
        caption: row.caption,
        status: row.status,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('[Reel Submission Error]', error);
    return res.status(500).json({ error: 'Failed to submit reel for review.' });
  }
});
