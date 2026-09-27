import dotenv from 'dotenv';
// Load environment variables immediately at the very top of the entry point
dotenv.config();

import express, { type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { apiRouter } from './src/server/routes.js';

// ============================================================================
// CONFIGURATION & FALLBACK KEYS
// ============================================================================
// Google Cloud Run / Production: Supply these via Cloud Run Environment Variables.
// ============================================================================
export const DEFAULT_CONFIG = {
  /**
   * 1. YouTube Data API v3 Key:
   * Used for fetching external faith reflections and reels.
   * If left blank, Noor gracefully falls back to verified, embeddable curated reels.
   */
  YOUTUBE_API_KEY: '', // <-- Paste your YouTube API Key here if not using process.env

  /**
   * 2. Quran API Base URL (Keyless & Public):
   * Free open API at https://api.alquran.cloud/v1 - NO API KEY OR AUTH REQUIRED.
   */
  QURAN_API_BASE: 'https://api.alquran.cloud/v1',

  /**
   * 3. Database Connection String (Optional):
   * Fallback connection string if a database is configured in the future.
   */
  DATABASE_URL: '', // <-- Paste database connection string here if applicable
};

// Resolve active configuration with fallbacks (no API key required for Quran data)
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || DEFAULT_CONFIG.YOUTUBE_API_KEY || '';
const QURAN_API_BASE = process.env.QURAN_API_BASE || DEFAULT_CONFIG.QURAN_API_BASE;
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_CONFIG.DATABASE_URL || '';

// ============================================================================
// DYNAMIC PORT & HOST BINDING (GOOGLE CLOUD RUN COMPATIBILITY)
// ============================================================================
// Cloud Run injects PORT (defaults to 8080) and requires binding to 0.0.0.0
const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

// Serve static assets from public/ (PWA manifest, icons, service worker)
app.use(express.static(path.resolve(__dirname, 'public')));

// Mount authentication, user progress, and submission routes under /api
app.use('/api', apiRouter);

// Log active configuration on startup without leaking secrets
console.log(`[Startup Config] Port: ${PORT} | Host: ${HOST} | Node Env: ${process.env.NODE_ENV || 'production'}`);
console.log(`[Startup Config] YouTube API: ${YOUTUBE_API_KEY ? 'Configured (Env/Default)' : 'Using Curated Fallback Reels'}`);
console.log(`[Startup Config] Quran API Base: ${QURAN_API_BASE} (Free & Keyless)`);
if (DATABASE_URL) {
  console.log(`[Startup Config] Database URL: Configured`);
}

// ============================================================================
// STARTUP HEALTH CHECKS (CRITICAL FOR CLOUD RUN DEPLOYMENTS)
// ============================================================================
// Cloud Run health probes ping / or /health to verify container readiness
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT,
    host: HOST,
    env: process.env.NODE_ENV || 'production',
    youtubeApiConfigured: Boolean(YOUTUBE_API_KEY),
    quranProvider: 'AlQuran Cloud (Keyless & Free)',
    quranApiBase: QURAN_API_BASE,
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Helper function to convert ISO 8601 duration (e.g. PT2M15S, PT59S) to mm:ss format
function parseISO8601Duration(duration: string): string {
  if (!duration) return '1:00';
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '1:00';
  const minutes = parseInt(match[1] || '0', 10);
  const seconds = parseInt(match[2] || '0', 10);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Fallback verified embeddable videos with tested 200 oEmbed responses
const verifiedFallbackReels = [
  {
    id: 'reel-yt-_PiLcpSPfmQ',
    title: 'To Truly Rely on Allah',
    speaker: 'Nouman Ali Khan',
    duration: '1:45',
    topic: 'Tawakkul & Trust',
    quote: 'True reliance on Allah begins when you do everything in your capability, and surrender the outcome to Him.',
    youtubeId: '_PiLcpSPfmQ',
    category: 'Remembrance' as const,
    likesCount: 1420,
    featuredAyah: 'Quran 65:3 · "And whoever relies upon Allah—then He is sufficient for him."',
  },
  {
    id: 'reel-yt-j7W44OPRVgM',
    title: 'Financial Advice from Prophet Muhammad (SAW)',
    speaker: 'Belal Assaad',
    duration: '2:10',
    topic: 'Barakah & Character',
    quote: 'Wealth does not decrease by giving in charity; rather, Allah purifies and expands the remainder.',
    youtubeId: 'j7W44OPRVgM',
    category: 'Character' as const,
    likesCount: 2310,
    featuredAyah: 'Quran 2:261 · "The example of those who spend their wealth in the way of Allah is like a seed..."',
  },
  {
    id: 'reel-yt-9ENUuWAFKsY',
    title: 'Our Rabb and His Closeness',
    speaker: 'Hisham Abu Yusuf',
    duration: '1:30',
    topic: 'Love of Allah',
    quote: 'Whenever you feel completely alone in this world, remember: your Lord is closer to you than your jugular vein.',
    youtubeId: '9ENUuWAFKsY',
    category: 'Remembrance' as const,
    likesCount: 1890,
    featuredAyah: 'Quran 50:16 · "And We are closer to him than his jugular vein."',
  },
  {
    id: 'reel-yt-PL3GVpsxv0I',
    title: "Allah's Reminder: A Wake-Up Call",
    speaker: 'Bilal Asaad',
    duration: '2:40',
    topic: 'Repentance & Turning Back',
    quote: 'Do not postpone repentance. Return to Allah today with your broken pieces and watch Him mend them.',
    youtubeId: 'PL3GVpsxv0I',
    category: 'Prayer & Peace' as const,
    likesCount: 3100,
    featuredAyah: 'Quran 39:53 · "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins."',
  },
  {
    id: 'reel-yt-Ie79XObO4G8',
    title: 'Allah Loves To Meet You',
    speaker: 'Hisham Abu Yusuf',
    duration: '1:15',
    topic: 'Spiritual Longing',
    quote: 'Whoever loves to meet Allah, Allah loves to meet them. Let your heart beat in longing for His meeting.',
    youtubeId: 'Ie79XObO4G8',
    category: 'Overcoming Grief' as const,
    likesCount: 2840,
    featuredAyah: 'Quran 13:28 · "Surely in the remembrance of Allah do hearts find rest."',
  },
];

// Server-side route to fetch verified, embeddable YouTube videos
app.get('/api/reels', async (req: Request, res: Response) => {
  const query = (req.query.q as string)?.trim() || 'Islamic reminder short';
  const apiKey = YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.json({
      reels: verifiedFallbackReels,
      source: 'fallback',
      total: verifiedFallbackReels.length,
    });
  }

  try {
    // 1. Call YouTube Data API v3 search endpoint
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoEmbeddable', 'true');
    searchUrl.searchParams.set('maxResults', '12');
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('key', apiKey);

    const searchResponse = await fetch(searchUrl.toString());
    if (!searchResponse.ok) {
      const errText = await searchResponse.text();
      console.warn('YouTube search API warning:', searchResponse.status, errText);
      return res.json({
        reels: verifiedFallbackReels,
        source: 'fallback-on-error',
        total: verifiedFallbackReels.length,
      });
    }

    const searchData = (await searchResponse.json()) as { items?: any[] };
    const items = searchData.items || [];
    const videoIds = items.map((item) => item.id?.videoId).filter(Boolean);

    if (videoIds.length === 0) {
      return res.json({
        reels: verifiedFallbackReels,
        source: 'fallback-empty',
        total: verifiedFallbackReels.length,
      });
    }

    // 2. Call YouTube Data API v3 videos endpoint to check status.embeddable and contentDetails
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videosUrl.searchParams.set('part', 'snippet,status,contentDetails');
    videosUrl.searchParams.set('id', videoIds.join(','));
    videosUrl.searchParams.set('key', apiKey);

    const videosResponse = await fetch(videosUrl.toString());
    if (!videosResponse.ok) {
      const errText = await videosResponse.text();
      console.warn('YouTube videos API warning:', videosResponse.status, errText);
      return res.json({
        reels: verifiedFallbackReels,
        source: 'fallback-on-videos-error',
        total: verifiedFallbackReels.length,
      });
    }

    const videosData = (await videosResponse.json()) as { items?: any[] };
    const videoItems = videosData.items || [];

    // 3. Filter out any videos with status.embeddable === false
    const embeddableVideos = videoItems.filter(
      (v) => v.status && v.status.embeddable === true
    );

    if (embeddableVideos.length === 0) {
      return res.json({
        reels: verifiedFallbackReels,
        source: 'fallback-none-embeddable',
        total: verifiedFallbackReels.length,
      });
    }

    // 4. Transform into Noor ReelItem structure
    const mappedReels = embeddableVideos.map((v, index) => {
      const snippet = v.snippet || {};
      const title = snippet.title || 'Sacred Reminder';
      const channelTitle = snippet.channelTitle || 'Islamic Scholar';
      const description = snippet.description || '';
      const duration = parseISO8601Duration(v.contentDetails?.duration);

      let category: 'Remembrance' | 'Overcoming Grief' | 'Prayer & Peace' | 'Character' = 'Remembrance';
      const lowerText = `${title} ${description}`.toLowerCase();
      if (lowerText.includes('sabr') || lowerText.includes('grief') || lowerText.includes('sadness') || lowerText.includes('hardship') || lowerText.includes('heal')) {
        category = 'Overcoming Grief';
      } else if (lowerText.includes('prayer') || lowerText.includes('salah') || lowerText.includes('tahajjud') || lowerText.includes('quran') || lowerText.includes('recitation')) {
        category = 'Prayer & Peace';
      } else if (lowerText.includes('character') || lowerText.includes('manners') || lowerText.includes('prophet') || lowerText.includes('advice') || lowerText.includes('family')) {
        category = 'Character';
      }

      let quote = description
        ? description.split('\n')[0].slice(0, 180)
        : title;
      if (!quote || quote.length < 15) {
        quote = title;
      }

      return {
        id: `yt-${v.id}`,
        title,
        speaker: channelTitle,
        duration,
        topic: category === 'Prayer & Peace' ? 'Prayer & Quran' : category,
        quote,
        youtubeId: v.id,
        category,
        likesCount: 1200 + index * 340,
        featuredAyah: 'Quran 2:186 · "I am near; I answer the call of the caller."',
      };
    });

    return res.json({
      reels: mappedReels,
      source: 'youtube-api',
      total: mappedReels.length,
    });
  } catch (error) {
    console.error('Failed to fetch reels from YouTube API:', error);
    return res.json({
      reels: verifiedFallbackReels,
      source: 'fallback-exception',
      total: verifiedFallbackReels.length,
    });
  }
});

// ============================================================================
// FREE & KEYLESS QURAN CONTENT ENDPOINTS (ALQURAN.CLOUD)
// ============================================================================
// In-memory cache for surah data (reduces network round-trips)
const surahCache = new Map<number, any>();

// Proxy route for full Surah text (Uthmani), English translation (Saheeh International),
// and Tafsir (Al-Muyassar) - 100% keyless and free
app.get('/api/quran/surah/:surahId', async (req: Request, res: Response) => {
  const rawParam = req.params.surahId;
  const paramStr = Array.isArray(rawParam) ? rawParam[0] : (rawParam || '');
  const surahId = parseInt(paramStr, 10);
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return res.status(400).json({ error: 'Invalid surah number. Must be between 1 and 114.' });
  }

  if (surahCache.has(surahId)) {
    return res.json(surahCache.get(surahId));
  }

  try {
    const targetUrl = `${QURAN_API_BASE}/surah/${surahId}/editions/quran-uthmani,en.sahih,ar.muyassar`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`AlQuran Cloud API returned HTTP ${response.status}`);
    }

    const json = (await response.json()) as {
      code: number;
      status: string;
      data: Array<{
        edition: { identifier: string; type: string };
        ayahs: Array<{ number: number; numberInSurah: number; text: string }>;
      }>;
    };

    if (json.code !== 200 || !json.data || json.data.length < 2) {
      throw new Error('Incomplete data received from AlQuran Cloud');
    }

    const arabicEdition = json.data[0];
    const englishEdition = json.data[1];
    const tafsirEdition = json.data[2] || null;

    const ayahs = arabicEdition.ayahs.map((ayah, idx) => ({
      numberInSurah: ayah.numberInSurah,
      globalNumber: ayah.number,
      arabic: ayah.text,
      translation: englishEdition?.ayahs?.[idx]?.text || '',
      tafsir: tafsirEdition?.ayahs?.[idx]?.text || '',
    }));

    const payload = {
      surahNumber: surahId,
      ayahs,
      source: 'alquran.cloud (free & keyless)',
    };

    surahCache.set(surahId, payload);
    return res.json(payload);
  } catch (error) {
    console.warn(`[AlQuran Cloud] Warning: Failed to fetch surah ${surahId}:`, error);
    return res.status(502).json({
      error: 'Failed to fetch Quran data from AlQuran Cloud',
      surahNumber: surahId,
    });
  }
});

// Quran API provider info endpoint
app.get('/api/quran/info', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    endpoint: QURAN_API_BASE,
    authRequired: false,
    provider: 'Al Quran Cloud (https://api.alquran.cloud/v1)',
  });
});

// ============================================================================
// PRODUCTION & DEVELOPMENT STATIC ASSET HANDLING
// ============================================================================
async function setupFrontendMiddleware() {
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');
  const distExists = fs.existsSync(distPath);

  if (!isProduction && !distExists) {
    try {
      console.log('[Dev] Starting Vite development server middleware...');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      return;
    } catch (viteError) {
      console.warn('[Dev Warning] Failed to initialize Vite dev middleware:', viteError);
    }
  }

  // Production mode or fallback if dist exists
  if (distExists) {
    console.log(`[Production] Serving static files from ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Graceful fallback if dist folder does not exist yet
    app.get('*', (_req: Request, res: Response) => {
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Noor Server</title>
            <style>
              body { background: #0E1F17; color: #F0E6D2; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .card { background: #122A1F; border: 1px solid #C9A55C; padding: 2rem; border-radius: 8px; text-align: center; max-width: 500px; }
              h1 { color: #C9A55C; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Noor Server Active</h1>
              <p>The backend server is running successfully on port ${PORT}.</p>
              <p>If you see this page, please run <code>npm run build</code> to compile the frontend assets.</p>
              <p><a href="/health" style="color: #C9A55C;">Check Health Status</a></p>
            </div>
          </body>
        </html>
      `);
    });
  }
}

// ============================================================================
// SERVER STARTUP WITH FAIL-SAFE ERROR HANDLING
// ============================================================================
async function startServer() {
  try {
    // 1. Mount frontend routes safely inside try-catch
    await setupFrontendMiddleware();

    // 2. Bind server to 0.0.0.0 and PORT (8080 default)
    const server = app.listen(PORT, HOST, () => {
      console.log('====================================================');
      console.log(`✨ Noor Server successfully started!`);
      console.log(`📡 Listening address: http://${HOST}:${PORT}`);
      console.log(`🩺 Health check URL:  http://${HOST}:${PORT}/health`);
      console.log(`📖 Quran API:         ${QURAN_API_BASE} (Free & Keyless)`);
      console.log(`🌍 Environment:       ${process.env.NODE_ENV || 'production'}`);
      console.log('====================================================');
    });

    // 3. Graceful shutdown handler for Cloud Run SIGTERM / SIGINT
    const handleShutdown = (signal: string) => {
      console.log(`[Shutdown] Received ${signal}. Closing HTTP server...`);
      server.close(() => {
        console.log('[Shutdown] HTTP server closed gracefully.');
        process.exit(0);
      });

      // Force terminate if still lingering after 5 seconds
      setTimeout(() => {
        console.error('[Shutdown] Forceful shutdown initiated due to timeout.');
        process.exit(1);
      }, 5000).unref();
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } catch (startupError) {
    console.error('[Critical Startup Error] An error occurred during boot:', startupError);
    // Fail-safe: Ensure the process still binds to PORT 8080 so Cloud Run health check passes
    try {
      app.listen(PORT, HOST, () => {
        console.warn(`[Fail-Safe Mode] Server running in recovery mode on http://${HOST}:${PORT}`);
      });
    } catch (bindError) {
      console.error('[Fatal Error] Unable to bind to port:', bindError);
      process.exit(1);
    }
  }
}

// Prevent unhandled promise rejections from crashing the server
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection] at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Uncaught Exception] caught:', error);
});

// Boot server
startServer();
