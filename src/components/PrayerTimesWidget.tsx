import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  Prayer,
} from 'adhan';
import {
  Clock,
  MapPin,
  Compass,
  Volume2,
  VolumeX,
  ChevronDown,
  RefreshCw,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CheckCircle2,
  Sparkles,
  Building2,
  SlidersHorizontal,
  Navigation,
  X,
  Check,
  Search,
  LocateFixed,
  Radio,
} from 'lucide-react';
import { OrnamentedCard, BorderedSubPanel } from './Ornamentation';
import { MosqueFinderMap } from './MosqueFinderMap';
import { getRecommendedMosqueStandard } from '../lib/prayerMethodRecommender';

export interface LocationState {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  source: 'gps' | 'ip' | 'search' | 'preset' | 'default';
}

const PRESET_CITIES: Array<{ name: string; country: string; lat: number; lng: number }> = [
  // Holy Sanctuaries & Middle East
  { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { name: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },

  // East & Sub-Saharan Africa
  { name: 'Kampala', country: 'Uganda', lat: 0.3476, lng: 32.5825 },
  { name: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219 },
  { name: 'Dar es Salaam', country: 'Tanzania', lat: -6.7924, lng: 39.2083 },
  { name: 'Mogadishu', country: 'Somalia', lat: 2.0469, lng: 45.3182 },
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },

  // South & Southeast Asia
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },

  // Europe & Americas
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lng: -1.8904 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
];

const TIMEZONE_CITY_MAP: Record<string, { city: string; country: string; lat: number; lng: number }> = {
  'Africa/Kampala': { city: 'Kampala', country: 'Uganda', lat: 0.3476, lng: 32.5825 },
  'Africa/Nairobi': { city: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219 },
  'Africa/Dar_es_Salaam': { city: 'Dar es Salaam', country: 'Tanzania', lat: -6.7924, lng: 39.2083 },
  'Africa/Cairo': { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  'Africa/Lagos': { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 },
  'Africa/Johannesburg': { city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  'Africa/Casablanca': { city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898 },
  'Africa/Algiers': { city: 'Algiers', country: 'Algeria', lat: 36.7538, lng: 3.0588 },
  'Africa/Tunis': { city: 'Tunis', country: 'Tunisia', lat: 36.8065, lng: 10.1815 },
  'Europe/London': { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  'Europe/Paris': { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  'Europe/Berlin': { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  'Europe/Istanbul': { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  'America/New_York': { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  'America/Chicago': { city: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298 },
  'America/Toronto': { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  'America/Los_Angeles': { city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437 },
  'Asia/Riyadh': { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  'Asia/Dubai': { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  'Asia/Doha': { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310 },
  'Asia/Karachi': { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  'Asia/Kolkata': { city: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090 },
  'Asia/Dhaka': { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  'Asia/Jakarta': { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  'Asia/Kuala_Lumpur': { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  'Asia/Singapore': { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  'Australia/Sydney': { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
};

const CALCULATION_METHODS: Array<{ id: string; name: string; fn: () => any }> = [
  { id: 'MWL', name: 'Muslim World League (Global / East Africa / UK)', fn: CalculationMethod.MuslimWorldLeague },
  { id: 'ISNA', name: 'ISNA (North America)', fn: CalculationMethod.NorthAmerica },
  { id: 'Egyptian', name: 'Egyptian General Authority', fn: CalculationMethod.Egyptian },
  { id: 'UmmAlQura', name: 'Umm Al-Qura (Makkah)', fn: CalculationMethod.UmmAlQura },
  { id: 'Dubai', name: 'Dubai Religious Affairs', fn: CalculationMethod.Dubai },
  { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', fn: CalculationMethod.Karachi },
  { id: 'Qatar', name: 'Qatar Authority', fn: CalculationMethod.Qatar },
  { id: 'Kuwait', name: 'Kuwait Authority', fn: CalculationMethod.Kuwait },
  { id: 'Singapore', name: 'MUIS Singapore', fn: CalculationMethod.Singapore },
  { id: 'MoonsightingCommittee', name: 'Moonsighting Committee', fn: CalculationMethod.MoonsightingCommittee },
];

export function PrayerTimesWidget() {
  const [location, setLocation] = useState<LocationState>(() => {
    const saved = localStorage.getItem('noor_user_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Check timezone for instantaneous initial match
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const matched = TIMEZONE_CITY_MAP[tz];
      if (matched) {
        return {
          latitude: matched.lat,
          longitude: matched.lng,
          city: matched.city,
          country: matched.country,
          source: 'ip',
        };
      }
    } catch {}

    // Default Sanctuary location (Makkah)
    return {
      latitude: 21.4225,
      longitude: 39.8262,
      city: 'Makkah',
      country: 'Saudi Arabia',
      source: 'default',
    };
  });

  const [methodId, setMethodId] = useState<string>(() => {
    return localStorage.getItem('noor_prayer_method') || 'MWL';
  });

  const [madhab, setMadhab] = useState<'shafi' | 'hanafi'>(() => {
    return (localStorage.getItem('noor_prayer_madhab') as 'shafi' | 'hanafi') || 'shafi';
  });

  const [syncedMosque, setSyncedMosque] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(() => {
    const saved = localStorage.getItem('noor_synced_mosque');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [minuteOffsets, setMinuteOffsets] = useState<{
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  }>(() => {
    const saved = localStorage.getItem('noor_prayer_minute_offsets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
  });

  const [now, setNow] = useState<Date>(new Date());
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [autoCalibratedMsg, setAutoCalibratedMsg] = useState<string | null>(null);

  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [showMethodPicker, setShowMethodPicker] = useState<boolean>(false);
  const [showMosqueDrawer, setShowMosqueDrawer] = useState<boolean>(false);
  const [showOffsetsPanel, setShowOffsetsPanel] = useState<boolean>(false);
  const [citySearchTerm, setCitySearchTerm] = useState<string>('');
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('noor_prayer_sound') === 'true';
  });
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);

  // Keep live time ticking every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Central helper to apply new location & auto-calibrate local mosque standards
  const applyLocation = useCallback((newLoc: LocationState, notificationNote?: string) => {
    setLocation(newLoc);
    localStorage.setItem('noor_user_location', JSON.stringify(newLoc));

    if (newLoc.country) {
      const rec = getRecommendedMosqueStandard(newLoc.country, newLoc.city);
      setMethodId(rec.methodId);
      setMadhab(rec.madhab);
      localStorage.setItem('noor_prayer_method', rec.methodId);
      localStorage.setItem('noor_prayer_madhab', rec.madhab);
      setAutoCalibratedMsg(
        notificationNote || `Calibrated to ${rec.methodName} matching local mosques in ${newLoc.city}.`
      );
    }
  }, []);

  // Seamless IP and Timezone Fallback that never fails even in restricted iframes
  const detectLocationByIPOrTimezone = useCallback(async (): Promise<boolean> => {
    // 1. Try freeipapi.com
    try {
      const res = await fetch('https://freeipapi.com/api/json');
      if (res.ok) {
        const data = await res.json();
        if (data.latitude && data.longitude) {
          const newLoc: LocationState = {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            city: data.cityName || data.regionName || 'Detected City',
            country: data.countryName || '',
            source: 'ip',
          };
          applyLocation(newLoc, `Location detected via Network: ${newLoc.city}, ${newLoc.country}`);
          return true;
        }
      }
    } catch {}

    // 2. Try ipwho.is
    try {
      const res2 = await fetch('https://ipwho.is/');
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2.success && data2.latitude && data2.longitude) {
          const newLoc: LocationState = {
            latitude: data2.latitude,
            longitude: data2.longitude,
            city: data2.city || data2.region || 'Detected City',
            country: data2.country || '',
            source: 'ip',
          };
          applyLocation(newLoc, `Location detected via Network: ${newLoc.city}, ${newLoc.country}`);
          return true;
        }
      }
    } catch {}

    // 3. Fallback to device timezone mapping
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const matchedCity = TIMEZONE_CITY_MAP[tz];
      if (matchedCity) {
        const newLoc: LocationState = {
          latitude: matchedCity.lat,
          longitude: matchedCity.lng,
          city: matchedCity.city,
          country: matchedCity.country,
          source: 'ip',
        };
        applyLocation(newLoc, `Calibrated from your local timezone (${tz})`);
        return true;
      }
    } catch {}

    return false;
  }, [applyLocation]);

  // Request high-precision browser geolocation & gracefully fall back if denied in iframe
  const requestGeolocation = useCallback(() => {
    setIsLocating(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      detectLocationByIPOrTimezone().finally(() => setIsLocating(false));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let detectedCity = 'Your Location';
        let detectedCountry = '';

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            detectedCity = data.city || data.locality || data.principalSubdivision || 'Detected City';
            detectedCountry = data.countryName || '';
          }
        } catch {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          detectedCity = tz.split('/')[1]?.replace(/_/g, ' ') || 'Local Time';
        }

        const newLoc: LocationState = {
          latitude,
          longitude,
          city: detectedCity,
          country: detectedCountry,
          source: 'gps',
        };

        applyLocation(newLoc, `GPS lock confirmed: ${detectedCity}, ${detectedCountry}`);
        setIsLocating(false);
      },
      async () => {
        // In sandboxed iframes or if permission prompt was blocked/dismissed, fall back to IP location
        const success = await detectLocationByIPOrTimezone();
        setIsLocating(false);
        if (!success) {
          setGeoError('GPS and network location unavailable. You can search or select your city above.');
        }
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  }, [applyLocation, detectLocationByIPOrTimezone]);

  // Auto-detect on first mount if still default
  useEffect(() => {
    if (location.source === 'default') {
      requestGeolocation();
    }
  }, [location.source, requestGeolocation]);

  const handleSelectCity = (preset: typeof PRESET_CITIES[0]) => {
    const newLoc: LocationState = {
      latitude: preset.lat,
      longitude: preset.lng,
      city: preset.name,
      country: preset.country,
      source: 'preset',
    };
    setSyncedMosque(null);
    localStorage.removeItem('noor_synced_mosque');
    setShowLocationPicker(false);
    setGeoError(null);
    applyLocation(newLoc);
  };

  // Worldwide city search using geocoding
  const handleWorldwideCitySearch = async (query: string) => {
    const q = query.trim();
    if (!q) return;

    // First check preset matches
    const presetMatch = PRESET_CITIES.find(
      (c) => c.name.toLowerCase() === q.toLowerCase() || `${c.name}, ${c.country}`.toLowerCase() === q.toLowerCase()
    );
    if (presetMatch) {
      handleSelectCity(presetMatch);
      return;
    }

    setIsSearchingCity(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`);
      if (res.ok) {
        const results = await res.json();
        if (results && results.length > 0) {
          const item = results[0];
          const parts = (item.display_name || '').split(',').map((s: string) => s.trim());
          const cityName = parts[0] || q;
          const countryName = parts[parts.length - 1] || '';

          const newLoc: LocationState = {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            city: cityName,
            country: countryName,
            source: 'search',
          };

          setSyncedMosque(null);
          localStorage.removeItem('noor_synced_mosque');
          setShowLocationPicker(false);
          setGeoError(null);
          setCitySearchTerm('');
          applyLocation(newLoc, `Location set to ${cityName}, ${countryName}`);
        } else {
          setGeoError(`Could not find coordinates for "${q}". Please try a nearby major city.`);
        }
      }
    } catch {
      setGeoError('City search request failed. Please select from the list.');
    } finally {
      setIsSearchingCity(false);
    }
  };

  const handleMethodChange = (newMethodId: string) => {
    setMethodId(newMethodId);
    localStorage.setItem('noor_prayer_method', newMethodId);
    setShowMethodPicker(false);
  };

  const handleSelectMosque = (mosqueData: {
    latitude: number;
    longitude: number;
    mosqueName: string;
    city: string;
    country: string;
    recommendedMethodId?: string;
    recommendedMadhab?: 'shafi' | 'hanafi';
  }) => {
    const newLoc: LocationState = {
      latitude: mosqueData.latitude,
      longitude: mosqueData.longitude,
      city: mosqueData.city,
      country: mosqueData.country,
      source: 'gps',
    };
    setLocation(newLoc);
    localStorage.setItem('noor_user_location', JSON.stringify(newLoc));

    const mosqueInfo = {
      name: mosqueData.mosqueName,
      lat: mosqueData.latitude,
      lng: mosqueData.longitude,
    };
    setSyncedMosque(mosqueInfo);
    localStorage.setItem('noor_synced_mosque', JSON.stringify(mosqueInfo));

    if (mosqueData.recommendedMethodId) {
      setMethodId(mosqueData.recommendedMethodId);
      localStorage.setItem('noor_prayer_method', mosqueData.recommendedMethodId);
    }
    if (mosqueData.recommendedMadhab) {
      setMadhab(mosqueData.recommendedMadhab);
      localStorage.setItem('noor_prayer_madhab', mosqueData.recommendedMadhab);
    }

    setShowMosqueDrawer(false);
    setAutoCalibratedMsg(`Synchronized with ${mosqueData.mosqueName} (${mosqueData.city}).`);
  };

  const handleClearMosqueSync = () => {
    setSyncedMosque(null);
    localStorage.removeItem('noor_synced_mosque');
    setAutoCalibratedMsg('Reverted to standard regional astronomical calculation.');
  };

  const handleUpdateOffset = (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', delta: number) => {
    setMinuteOffsets((prev) => {
      const updated = {
        ...prev,
        [prayer]: Math.max(-60, Math.min(60, prev[prayer] + delta)),
      };
      localStorage.setItem('noor_prayer_minute_offsets', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetOffsets = () => {
    const reset = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
    setMinuteOffsets(reset);
    localStorage.setItem('noor_prayer_minute_offsets', JSON.stringify(reset));
  };

  // Play peaceful Adhan harmonic bell chime
  const playAdhanBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setSoundPlaying(true);

      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 2.0);
      });

      setTimeout(() => setSoundPlaying(false), 2400);
    } catch {
      setSoundPlaying(false);
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('noor_prayer_sound', String(next));
    if (next) playAdhanBell();
  };

  // Adhan.js Calculation Engine
  const prayerTimesToday = useMemo(() => {
    try {
      const coordinates = new Coordinates(location.latitude, location.longitude);
      const methodFn = CALCULATION_METHODS.find((m) => m.id === methodId)?.fn || CalculationMethod.MuslimWorldLeague;
      const params = methodFn();

      if (madhab === 'hanafi') {
        params.madhab = Madhab.Hanafi;
      } else {
        params.madhab = Madhab.Shafi;
      }

      const pt = new PrayerTimes(coordinates, now, params);

      const applyMins = (date: Date, mins: number) => {
        return new Date(date.getTime() + mins * 60000);
      };

      return {
        fajr: applyMins(pt.fajr, minuteOffsets.fajr),
        sunrise: pt.sunrise,
        dhuhr: applyMins(pt.dhuhr, minuteOffsets.dhuhr),
        asr: applyMins(pt.asr, minuteOffsets.asr),
        maghrib: applyMins(pt.maghrib, minuteOffsets.maghrib),
        isha: applyMins(pt.isha, minuteOffsets.isha),
        raw: pt,
      };
    } catch {
      return null;
    }
  }, [location.latitude, location.longitude, methodId, madhab, minuteOffsets, now]);

  // Tomorrow's Fajr for countdown past Isha
  const tomorrowFajr = useMemo(() => {
    try {
      const coordinates = new Coordinates(location.latitude, location.longitude);
      const methodFn = CALCULATION_METHODS.find((m) => m.id === methodId)?.fn || CalculationMethod.MuslimWorldLeague;
      const params = methodFn();
      if (madhab === 'hanafi') params.madhab = Madhab.Hanafi;
      else params.madhab = Madhab.Shafi;

      const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
      const pt = new PrayerTimes(coordinates, tomorrow, params);
      return new Date(pt.fajr.getTime() + minuteOffsets.fajr * 60000);
    } catch {
      return null;
    }
  }, [location.latitude, location.longitude, methodId, madhab, minuteOffsets, now]);

  // Format time (e.g. "05:14 AM")
  const formatTime = (date?: Date | null) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Current prayer & next prayer calculation with countdown
  const prayerSchedule = useMemo(() => {
    if (!prayerTimesToday) return null;

    const list = [
      { key: 'fajr', name: 'Fajr', arabic: 'الفجر', subtitle: 'Dawn prayer', time: prayerTimesToday.fajr, icon: Moon },
      { key: 'sunrise', name: 'Sunrise', arabic: 'الشروق', subtitle: 'Ishraq limit', time: prayerTimesToday.sunrise, icon: Sunrise, isNotSalat: true },
      { key: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', subtitle: 'Midday prayer', time: prayerTimesToday.dhuhr, icon: Sun },
      { key: 'asr', name: 'Asr', arabic: 'العصر', subtitle: 'Afternoon prayer', time: prayerTimesToday.asr, icon: Sun },
      { key: 'maghrib', name: 'Maghrib', arabic: 'المغرب', subtitle: 'Sunset prayer', time: prayerTimesToday.maghrib, icon: Sunset },
      { key: 'isha', name: 'Isha', arabic: 'العشاء', subtitle: 'Night prayer', time: prayerTimesToday.isha, icon: Moon },
    ];

    const currentTimeMs = now.getTime();
    const nextItem = list.find((item) => item.time.getTime() > currentTimeMs);
    let nextTargetTime: Date;
    let nextPrayerName: string;
    let nextArabicName: string;
    let prevTargetTime: Date;

    if (nextItem) {
      nextTargetTime = nextItem.time;
      nextPrayerName = nextItem.name;
      nextArabicName = nextItem.arabic;

      const itemIdx = list.indexOf(nextItem);
      prevTargetTime = itemIdx > 0 ? list[itemIdx - 1].time : new Date(nextItem.time.getTime() - 4 * 3600 * 1000);
    } else {
      nextTargetTime = tomorrowFajr || new Date(prayerTimesToday.fajr.getTime() + 24 * 3600 * 1000);
      nextPrayerName = 'Fajr';
      nextArabicName = 'الفجر';
      prevTargetTime = prayerTimesToday.isha;
    }

    const diffMs = Math.max(0, nextTargetTime.getTime() - currentTimeMs);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const countdownStr = `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;

    const totalIntervalMs = Math.max(1, nextTargetTime.getTime() - prevTargetTime.getTime());
    const elapsedIntervalMs = Math.max(0, currentTimeMs - prevTargetTime.getTime());
    const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedIntervalMs / totalIntervalMs) * 100)));

    let currentActive = 'Isha';
    if (currentTimeMs >= prayerTimesToday.fajr.getTime() && currentTimeMs < prayerTimesToday.sunrise.getTime()) {
      currentActive = 'Fajr';
    } else if (currentTimeMs >= prayerTimesToday.sunrise.getTime() && currentTimeMs < prayerTimesToday.dhuhr.getTime()) {
      currentActive = 'Duha (Post-Sunrise)';
    } else if (currentTimeMs >= prayerTimesToday.dhuhr.getTime() && currentTimeMs < prayerTimesToday.asr.getTime()) {
      currentActive = 'Dhuhr';
    } else if (currentTimeMs >= prayerTimesToday.asr.getTime() && currentTimeMs < prayerTimesToday.maghrib.getTime()) {
      currentActive = 'Asr';
    } else if (currentTimeMs >= prayerTimesToday.maghrib.getTime() && currentTimeMs < prayerTimesToday.isha.getTime()) {
      currentActive = 'Maghrib';
    }

    return {
      list,
      nextPrayerName,
      nextArabicName,
      nextTargetTime,
      countdownStr,
      totalHours,
      totalMinutes,
      totalSeconds,
      currentActive,
      progressPercent,
    };
  }, [prayerTimesToday, tomorrowFajr, now]);

  const activeMethodName = useMemo(() => {
    return CALCULATION_METHODS.find((m) => m.id === methodId)?.name || 'Muslim World League';
  }, [methodId]);

  // Filtered cities based on search term
  const filteredPresetCities = useMemo(() => {
    if (!citySearchTerm.trim()) return PRESET_CITIES;
    const term = citySearchTerm.toLowerCase().trim();
    return PRESET_CITIES.filter(
      (c) => c.name.toLowerCase().includes(term) || c.country.toLowerCase().includes(term)
    );
  }, [citySearchTerm]);

  return (
    <OrnamentedCard className="p-6 sm:p-7 space-y-6">
      {/* Header: Location & Calculation Method Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent-gold/20 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold tracking-wider uppercase border border-accent-gold/30">
              <Clock className="w-3.5 h-3.5" />
              Salat Times
            </span>

            {/* Geolocation status pill */}
            <button
              onClick={requestGeolocation}
              disabled={isLocating}
              title="Click to detect exact GPS or network location"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-bg-card border border-accent-gold/35 hover:border-accent-gold text-text-primary hover:text-accent-gold text-xs font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-bounce text-accent-gold' : 'text-accent-gold'}`} />
              <span className="font-bold">{location.city}</span>
              {location.country && <span className="text-text-muted hidden md:inline">({location.country})</span>}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold font-mono font-bold">
                {location.source === 'gps'
                  ? 'GPS'
                  : location.source === 'ip'
                  ? 'Network'
                  : location.source === 'search'
                  ? 'Custom'
                  : 'Preset'}
              </span>
              <RefreshCw className={`w-3 h-3 ml-0.5 ${isLocating ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary">
            High-precision astronomical calculations calibrated to local mosque timings.
          </p>
        </div>

        {/* Action Buttons: Nearby Mosques, Minute Offsets, Change City & Method */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Nearby Mosques & Google Maps Integration */}
          <button
            onClick={() => {
              setShowMosqueDrawer(!showMosqueDrawer);
              setShowOffsetsPanel(false);
              setShowLocationPicker(false);
              setShowMethodPicker(false);
            }}
            title="Explore nearby masjids and sync with your local mosque schedule on Google Maps"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              showMosqueDrawer || syncedMosque
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-bg-card border-accent-gold/30 hover:border-accent-gold text-text-primary'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${syncedMosque ? 'text-emerald-400' : 'text-accent-gold'}`} />
            <span>Nearby Mosques {syncedMosque ? '✓' : ''}</span>
          </button>

          {/* Minute offsets button */}
          <button
            onClick={() => {
              setShowOffsetsPanel(!showOffsetsPanel);
              setShowMosqueDrawer(false);
              setShowLocationPicker(false);
              setShowMethodPicker(false);
            }}
            title="Fine-tune minutes (+/-) to match your local mosque's published prayer timetable"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              Object.values(minuteOffsets).some((v) => v !== 0)
                ? 'bg-accent-gold/20 border-accent-gold text-accent-gold font-bold'
                : 'bg-bg-card border-accent-gold/30 hover:border-accent-gold text-text-primary'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-accent-gold" />
            <span className="hidden sm:inline">Tune Min</span>
          </button>

          {/* Change City with Live Worldwide Search */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLocationPicker(!showLocationPicker);
                setShowMethodPicker(false);
                setShowMosqueDrawer(false);
                setShowOffsetsPanel(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-primary text-xs font-medium transition-all cursor-pointer"
            >
              <span>Change City</span>
              <ChevronDown className="w-3.5 h-3.5 text-accent-gold" />
            </button>

            {/* City Preset & Search Dropdown */}
            {showLocationPicker && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-bg-card border border-accent-gold rounded-xl shadow-2xl p-2.5 z-50 divide-y divide-accent-gold/15">
                {/* Search Any City Worldwide */}
                <div className="pb-2.5 space-y-1.5">
                  <div className="text-[11px] font-bold text-accent-gold uppercase tracking-wider">
                    Search Any City Worldwide
                  </div>
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-accent-gold absolute left-2.5" />
                    <input
                      type="text"
                      value={citySearchTerm}
                      onChange={(e) => setCitySearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleWorldwideCitySearch(citySearchTerm);
                      }}
                      placeholder="e.g. Kampala, London, Nairobi, Cairo..."
                      className="w-full bg-bg-primary border border-accent-gold/35 rounded-lg pl-8 pr-16 py-1.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
                    />
                    {citySearchTerm && (
                      <button
                        onClick={() => handleWorldwideCitySearch(citySearchTerm)}
                        disabled={isSearchingCity}
                        className="absolute right-1 px-2 py-0.5 rounded bg-accent-gold text-bg-primary text-[10px] font-bold"
                      >
                        {isSearchingCity ? '...' : 'Go'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Instant GPS Detection Option */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      requestGeolocation();
                      setShowLocationPicker(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-text-primary hover:bg-accent-gold/20 rounded-lg flex items-center justify-between font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <LocateFixed className="w-4 h-4 text-accent-gold" />
                      Detect GPS / Network Location
                    </span>
                    {location.source === 'gps' && <CheckCircle2 className="w-4 h-4 text-accent-gold" />}
                  </button>
                </div>

                {/* Major Islamic Cities Presets */}
                <div className="pt-2 space-y-0.5">
                  <div className="px-2 py-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    Popular Islamic Hubs
                  </div>
                  {filteredPresetCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city)}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        location.city === city.name
                          ? 'bg-accent-gold/25 text-accent-gold font-bold'
                          : 'text-text-primary hover:bg-accent-gold/15'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{city.name}</div>
                        <div className="text-[10px] text-text-muted">{city.country}</div>
                      </div>
                      {location.city === city.name && <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Calculation Method Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMethodPicker(!showMethodPicker);
                setShowLocationPicker(false);
                setShowMosqueDrawer(false);
                setShowOffsetsPanel(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-primary text-xs font-medium transition-all cursor-pointer"
            >
              <span>Method: {methodId}</span>
              <ChevronDown className="w-3.5 h-3.5 text-accent-gold" />
            </button>

            {/* Method Picker Dropdown */}
            {showMethodPicker && (
              <div className="absolute right-0 mt-2 w-80 max-h-80 overflow-y-auto bg-bg-card border border-accent-gold rounded-xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 text-xs font-semibold text-accent-gold uppercase tracking-wider border-b border-accent-gold/20">
                  Calculation Standard
                </div>
                <div className="py-1 space-y-0.5">
                  {CALCULATION_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleMethodChange(m.id)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        methodId === m.id
                          ? 'bg-accent-gold/25 text-accent-gold font-semibold'
                          : 'text-text-primary hover:bg-accent-gold/15'
                      }`}
                    >
                      <span>{m.name}</span>
                      {methodId === m.id && <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Madhab toggle for Asr */}
                <div className="mt-2 pt-2 border-t border-accent-gold/20 px-3 py-2">
                  <div className="text-xs font-semibold text-accent-gold mb-2">Asr Calculation (Madhab)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMadhab('shafi');
                        localStorage.setItem('noor_prayer_madhab', 'shafi');
                      }}
                      className={`py-1 px-2 text-xs rounded border transition-colors ${
                        madhab === 'shafi'
                          ? 'border-accent-gold bg-accent-gold/25 text-accent-gold font-bold'
                          : 'border-accent-gold/30 text-text-secondary hover:bg-accent-gold/10'
                      }`}
                    >
                      Standard / Shafi'i
                    </button>
                    <button
                      onClick={() => {
                        setMadhab('hanafi');
                        localStorage.setItem('noor_prayer_madhab', 'hanafi');
                      }}
                      className={`py-1 px-2 text-xs rounded border transition-colors ${
                        madhab === 'hanafi'
                          ? 'border-accent-gold bg-accent-gold/25 text-accent-gold font-bold'
                          : 'border-accent-gold/30 text-text-secondary hover:bg-accent-gold/10'
                      }`}
                    >
                      Hanafi
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sound preview toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Adhan chime enabled - Click to test chime' : 'Enable Adhan chime reminder'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-accent-gold/20 border-accent-gold text-accent-gold'
                : 'bg-bg-card border-accent-gold/30 text-text-muted hover:text-text-primary'
            } ${soundPlaying ? 'scale-105 ring-2 ring-accent-gold' : ''}`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Auto-calibration or sync banner */}
      {autoCalibratedMsg && (
        <div className="px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{autoCalibratedMsg}</span>
          </div>
          <button
            onClick={() => setAutoCalibratedMsg(null)}
            className="text-emerald-300 font-semibold hover:underline ml-2 text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Mosque Finder Google Maps Drawer */}
      {showMosqueDrawer && (
        <div className="p-4 sm:p-6 rounded-2xl bg-bg-card/95 border border-accent-gold/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-accent-gold/20 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent-gold" />
                <h3 className="text-base sm:text-lg font-bold text-text-primary">
                  Nearby Mosques & Local Timetable Synchronization
                </h3>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Powered by Google Maps Platform. Detect masjids in your immediate vicinity and synchronize your prayer times with your local mosque congregation.
              </p>
            </div>
            <button
              onClick={() => setShowMosqueDrawer(false)}
              className="p-1 rounded-lg hover:bg-accent-gold/15 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <MosqueFinderMap
            userLocation={{
              latitude: location.latitude,
              longitude: location.longitude,
              city: location.city,
              country: location.country,
            }}
            onSelectMosqueLocation={handleSelectMosque}
            onClose={() => setShowMosqueDrawer(false)}
          />
        </div>
      )}

      {/* Minute Offsets Panel */}
      {showOffsetsPanel && (
        <div className="p-4 rounded-xl bg-bg-card/90 border border-accent-gold/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-accent-gold/20 pb-2">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-accent-gold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Mosque Minute Fine-Tuning (Iqamah / Timetable Offsets)
              </h4>
              <p className="text-[11px] text-text-muted mt-0.5">
                Calibrate by +/- minutes if your local masjid publishes specific safety margins or fixed adhan delays.
              </p>
            </div>
            <button onClick={handleResetOffsets} className="text-[11px] text-accent-gold hover:underline cursor-pointer">
              Reset All to 0m
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => (
              <div key={p} className="p-2.5 rounded-lg bg-bg-primary/80 border border-accent-gold/25 flex flex-col items-center">
                <span className="text-xs font-semibold uppercase text-text-secondary">{p}</span>
                <span className="text-base font-mono font-bold text-accent-gold my-1">
                  {minuteOffsets[p] > 0 ? `+${minuteOffsets[p]}` : minuteOffsets[p]}m
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateOffset(p, -1)}
                    className="w-6 h-6 rounded bg-bg-card border border-accent-gold/40 hover:bg-accent-gold/20 text-xs font-bold text-accent-gold cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleUpdateOffset(p, 1)}
                    className="w-6 h-6 rounded bg-bg-card border border-accent-gold/40 hover:bg-accent-gold/20 text-xs font-bold text-accent-gold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {geoError && (
        <div className="px-4 py-2.5 rounded-lg bg-amber-950/60 border border-amber-600/50 text-amber-200 text-xs sm:text-sm flex items-center justify-between">
          <span>{geoError}</span>
          <button
            onClick={() => setGeoError(null)}
            className="text-amber-300 font-semibold hover:underline ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Countdown Hero Highlight */}
      {prayerSchedule && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-accent-gold/50 bg-gradient-to-br from-bg-card via-bg-card/95 to-bg-primary p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Left Column: Next Prayer Name & Arabic */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider font-bold text-accent-gold">
                  Next Prayer
                </span>
                <span className="text-text-muted">·</span>
                <span className="text-xs text-text-secondary">
                  Current window: <span className="text-text-primary font-semibold">{prayerSchedule.currentActive}</span>
                </span>

                {/* Location indicator pill */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 border border-accent-gold/35 text-[11px] font-semibold text-accent-gold">
                  <MapPin className="w-3 h-3" />
                  <span>{location.city}</span>
                </span>

                {syncedMosque && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="max-w-[200px] truncate">Synced: {syncedMosque.name}</span>
                    <button
                      onClick={handleClearMosqueSync}
                      title="Clear mosque sync"
                      className="hover:text-white ml-0.5 cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary font-serif">
                  {prayerSchedule.nextPrayerName}
                </h3>
                <span className="font-arabic text-2xl sm:text-3xl text-accent-gold font-bold" dir="rtl">
                  {prayerSchedule.nextArabicName}
                </span>
                <span className="text-base sm:text-lg font-bold text-accent-gold px-3 py-0.5 rounded-lg bg-accent-gold/15 border border-accent-gold/35">
                  at {formatTime(prayerSchedule.nextTargetTime)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {prayerSchedule.totalHours > 0
                  ? `${prayerSchedule.totalHours} hour${prayerSchedule.totalHours > 1 ? 's' : ''} and ${prayerSchedule.totalMinutes} minute${prayerSchedule.totalMinutes !== 1 ? 's' : ''} remaining until ${prayerSchedule.nextPrayerName}`
                  : `${prayerSchedule.totalMinutes} minute${prayerSchedule.totalMinutes !== 1 ? 's' : ''} and ${prayerSchedule.totalSeconds}s remaining until ${prayerSchedule.nextPrayerName}`}
              </p>

              {/* Quick actions row inside Hero */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowMosqueDrawer(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sync with Nearby Mosque</span>
                </button>
                <button
                  onClick={requestGeolocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-primary/90 hover:bg-bg-primary border border-accent-gold/30 text-accent-gold text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Re-detect Location</span>
                </button>
              </div>
            </div>

            {/* Right Column: Prominent Digital Countdown */}
            <div className="flex flex-col items-start md:items-end justify-center space-y-2 bg-bg-primary/80 border border-accent-gold/35 rounded-2xl p-5 sm:px-7 shadow-inner">
              <div className="text-xs uppercase tracking-wider text-accent-gold font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-accent-gold" />
                <span>Remaining Time</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-accent-gold">
                {prayerSchedule.countdownStr}
              </div>
              <div className="text-xs text-text-muted flex items-center gap-2 flex-wrap">
                <span>{syncedMosque ? `Mosque Calibrated` : `Via ${activeMethodName.split(' ')[0]}`}</span>
                {Object.values(minuteOffsets).some((v) => v !== 0) && (
                  <span className="text-accent-gold">· Offsets active</span>
                )}
                {soundEnabled && <span className="text-accent-gold">· Chime on</span>}
              </div>
            </div>
          </div>

          {/* Progress Bar indicating time passage to next prayer */}
          <div className="mt-5 space-y-1.5">
            <div className="w-full h-2.5 bg-bg-primary/90 rounded-full overflow-hidden border border-accent-gold/25">
              <div
                className="h-full bg-gradient-to-r from-accent-gold-dim via-accent-gold to-amber-300 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${prayerSchedule.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted font-mono">
              <span>Prayer window progress</span>
              <span className="text-accent-gold font-bold">{prayerSchedule.progressPercent}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All 5 Daily Prayers + Sunrise */}
      {prayerSchedule && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {prayerSchedule.list.map((prayer) => {
            const isNext = prayer.name === prayerSchedule.nextPrayerName;
            const Icon = prayer.icon;
            const isPast = prayer.time.getTime() < now.getTime();

            return (
              <div
                key={prayer.name}
                className={`relative rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 ${
                  isNext
                    ? 'bg-accent-gold/20 border-2 border-accent-gold shadow-md shadow-accent-gold/15 scale-[1.02]'
                    : isPast
                    ? 'bg-bg-primary/60 border border-accent-gold/25 opacity-80'
                    : 'bg-bg-card/90 border border-accent-gold/35 hover:border-accent-gold/60'
                }`}
              >
                {/* Active / Next Badge */}
                {isNext && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent-gold text-bg-primary font-bold text-[10px] uppercase tracking-wider shadow">
                    Upcoming
                  </span>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                      {prayer.name}
                    </span>
                    <Icon className={`w-4 h-4 ${isNext ? 'text-accent-gold' : 'text-text-muted'}`} />
                  </div>

                  <div className="text-[11px] text-text-muted">{prayer.subtitle}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-accent-gold/20 flex items-baseline justify-between">
                  <span className={`text-base font-bold font-mono ${isNext ? 'text-accent-gold' : 'text-text-primary'}`}>
                    {formatTime(prayer.time)}
                  </span>
                  <span className="font-arabic text-sm text-accent-gold font-bold">
                    {prayer.arabic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </OrnamentedCard>
  );
}
