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
} from 'lucide-react';
import { OrnamentedCard, BorderedSubPanel } from './Ornamentation';

interface LocationState {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  source: 'gps' | 'preset' | 'default';
}

const PRESET_CITIES: Array<{ name: string; country: string; lat: number; lng: number }> = [
  { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
];

const CALCULATION_METHODS: Array<{ id: string; name: string; fn: () => any }> = [
  { id: 'MWL', name: 'Muslim World League', fn: CalculationMethod.MuslimWorldLeague },
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
    // Sensible initial default (Makkah)
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

  const [now, setNow] = useState<Date>(new Date());
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [showMethodPicker, setShowMethodPicker] = useState<boolean>(false);
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

  // Request browser geolocation
  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let detectedCity = 'Your Location';
        let detectedCountry = '';

        try {
          // Free reverse geocoding via BigDataCloud client API
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            detectedCity = data.city || data.locality || data.principalSubdivision || 'Detected City';
            detectedCountry = data.countryName || '';
          }
        } catch {
          // If offline or blocked, derive from timezone
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

        setLocation(newLoc);
        localStorage.setItem('noor_user_location', JSON.stringify(newLoc));
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setGeoError('Location permission denied. You can select your city manually below.');
        } else {
          setGeoError('Unable to retrieve location. Using selected location.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  // Try geolocation once on initial mount if still default
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
    setLocation(newLoc);
    localStorage.setItem('noor_user_location', JSON.stringify(newLoc));
    setShowLocationPicker(false);
    setGeoError(null);
  };

  const handleMethodChange = (id: string) => {
    setMethodId(id);
    localStorage.setItem('noor_prayer_method', id);
    setShowMethodPicker(false);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('noor_prayer_sound', String(next));

    if (next) {
      playChime();
    }
  };

  // Play gentle Islamic chime / Bismillah tone using Web Audio API synthesis (pure audio, no external dependencies)
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setSoundPlaying(true);

      const notes = [293.66, 329.63, 369.99, 440.0, 554.37]; // D-Major pentatonic tranquil chime
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.18 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.18 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.18);
        osc.stop(ctx.currentTime + idx * 0.18 + 1.3);
      });

      setTimeout(() => setSoundPlaying(false), 2000);
    } catch {
      setSoundPlaying(false);
    }
  };

  // Calculate today's prayer times
  const prayerTimesToday = useMemo(() => {
    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const methodObj = CALCULATION_METHODS.find((m) => m.id === methodId) || CALCULATION_METHODS[0];
      const params = methodObj.fn();
      if (madhab === 'hanafi') {
        params.madhab = Madhab.Hanafi;
      } else {
        params.madhab = Madhab.Shafi;
      }
      return new PrayerTimes(coords, now, params);
    } catch {
      return null;
    }
  }, [location.latitude, location.longitude, methodId, madhab, now]);

  // Calculate tomorrow's Fajr for overnight countdown
  const tomorrowFajr = useMemo(() => {
    try {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const coords = new Coordinates(location.latitude, location.longitude);
      const methodObj = CALCULATION_METHODS.find((m) => m.id === methodId) || CALCULATION_METHODS[0];
      const params = methodObj.fn();
      if (madhab === 'hanafi') {
        params.madhab = Madhab.Hanafi;
      }
      const ptTomorrow = new PrayerTimes(coords, tomorrow, params);
      return ptTomorrow.fajr;
    } catch {
      return null;
    }
  }, [location.latitude, location.longitude, methodId, madhab, now]);

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

    // Find the next upcoming salat (only among true prayers, or including sunrise if requested)
    const currentTimeMs = now.getTime();
    let nextItem = list.find((item) => item.time.getTime() > currentTimeMs);
    let nextTargetTime: Date;
    let nextPrayerName: string;
    let nextArabicName: string;
    let prevTargetTime: Date;

    if (nextItem) {
      nextTargetTime = nextItem.time;
      nextPrayerName = nextItem.name;
      nextArabicName = nextItem.arabic;

      // Find previous
      const itemIdx = list.indexOf(nextItem);
      prevTargetTime = itemIdx > 0 ? list[itemIdx - 1].time : new Date(nextItem.time.getTime() - 4 * 3600 * 1000);
    } else {
      // All today's prayers have passed -> next is tomorrow's Fajr!
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

    // Calculate progress between previous and next prayer
    const totalIntervalMs = Math.max(1, nextTargetTime.getTime() - prevTargetTime.getTime());
    const elapsedIntervalMs = Math.max(0, currentTimeMs - prevTargetTime.getTime());
    const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedIntervalMs / totalIntervalMs) * 100)));

    // Active prayer window
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

  return (
    <OrnamentedCard className="p-6 sm:p-7 space-y-6">
      {/* Header: Location & Calculation Method Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent-gold/20 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold tracking-wider uppercase border border-accent-gold/30">
              <Clock className="w-3.5 h-3.5" />
              Salat Times
            </span>

            {/* Geolocation status pill */}
            <button
              onClick={requestGeolocation}
              disabled={isLocating}
              title="Click to re-detect exact GPS location"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-secondary hover:text-accent-gold text-xs font-medium transition-colors"
            >
              <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-bounce text-accent-gold' : 'text-accent-gold'}`} />
              <span className="font-semibold">{location.city}</span>
              {location.country && <span className="text-text-muted hidden md:inline">({location.country})</span>}
              <RefreshCw className={`w-3 h-3 ml-1 ${isLocating ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <p className="text-sm text-text-secondary">
            Accurate astronomical calculations with live countdown to your next prayer.
          </p>
        </div>

        {/* Action buttons: Change Location, Method, Sound */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowLocationPicker(!showLocationPicker);
                setShowMethodPicker(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-primary text-xs font-medium transition-all"
            >
              <span>Change City</span>
              <ChevronDown className="w-3.5 h-3.5 text-accent-gold" />
            </button>

            {/* City Preset Dropdown */}
            {showLocationPicker && (
              <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-bg-card border border-accent-gold rounded-xl shadow-2xl p-2 z-50 divide-y divide-accent-gold/15">
                <div className="px-3 py-2 text-xs font-semibold text-accent-gold uppercase tracking-wider">
                  Select Quick City
                </div>
                <div className="py-1">
                  <button
                    onClick={requestGeolocation}
                    className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-accent-gold/20 rounded-lg flex items-center justify-between font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent-gold" />
                      Use GPS Location
                    </span>
                    {location.source === 'gps' && <CheckCircle2 className="w-4 h-4 text-accent-gold" />}
                  </button>
                </div>
                <div className="py-1 space-y-0.5">
                  {PRESET_CITIES.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-colors ${
                        location.city === city.name
                          ? 'bg-accent-gold/25 text-accent-gold font-semibold'
                          : 'text-text-primary hover:bg-accent-gold/15'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-xs text-text-muted">{city.country}</div>
                      </div>
                      {location.city === city.name && <CheckCircle2 className="w-4 h-4 text-accent-gold" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowMethodPicker(!showMethodPicker);
                setShowLocationPicker(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-primary text-xs font-medium transition-all"
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
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-accent-gold/20 border-accent-gold text-accent-gold'
                : 'bg-bg-card border-accent-gold/30 text-text-muted hover:text-text-primary'
            } ${soundPlaying ? 'scale-105 ring-2 ring-accent-gold' : ''}`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {geoError && (
        <div className="px-4 py-2.5 rounded-lg bg-amber-950/60 border border-amber-600/50 text-amber-200 text-xs sm:text-sm flex items-center justify-between">
          <span>{geoError}</span>
          <button
            onClick={() => setGeoError(null)}
            className="text-amber-300 font-semibold hover:underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Countdown Hero Highlight */}
      {prayerSchedule && (
        <div className="relative overflow-hidden rounded-xl border border-accent-gold/50 bg-gradient-to-br from-bg-card via-bg-card/90 to-bg-primary p-5 sm:p-7 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Left Column: Next Prayer Name & Arabic */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent-gold">
                  Next Prayer
                </span>
                <span className="text-text-muted">·</span>
                <span className="text-xs text-text-secondary">
                  Current window: <span className="text-text-primary font-medium">{prayerSchedule.currentActive}</span>
                </span>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-3xl sm:text-4xl font-bold text-text-primary font-serif">
                  {prayerSchedule.nextPrayerName}
                </h3>
                <span className="font-arabic text-2xl sm:text-3xl text-accent-gold" dir="rtl">
                  {prayerSchedule.nextArabicName}
                </span>
                <span className="text-base sm:text-lg font-semibold text-accent-gold/90 px-2.5 py-0.5 rounded bg-accent-gold/10 border border-accent-gold/25">
                  at {formatTime(prayerSchedule.nextTargetTime)}
                </span>
              </div>

              <p className="text-sm text-text-secondary">
                {prayerSchedule.totalHours > 0
                  ? `${prayerSchedule.totalHours} hour${prayerSchedule.totalHours > 1 ? 's' : ''} and ${prayerSchedule.totalMinutes} minute${prayerSchedule.totalMinutes !== 1 ? 's' : ''} remaining`
                  : `${prayerSchedule.totalMinutes} minute${prayerSchedule.totalMinutes !== 1 ? 's' : ''} and ${prayerSchedule.totalSeconds}s remaining`}
              </p>
            </div>

            {/* Right Column: Prominent Digital Countdown */}
            <div className="flex flex-col items-start md:items-end justify-center space-y-2 bg-bg-primary/70 border border-accent-gold/30 rounded-xl p-4 sm:px-6 shadow-inner">
              <div className="text-xs uppercase tracking-wider text-accent-gold font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-accent-gold" />
                Remaining Time
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-accent-gold">
                {prayerSchedule.countdownStr}
              </div>
              <div className="text-xs text-text-muted flex items-center gap-2">
                <span>Calculated via {activeMethodName.split(' ')[0]}</span>
                {soundEnabled && <span className="text-accent-gold">· Chime on</span>}
              </div>
            </div>
          </div>

          {/* Progress Bar indicating time passage to next prayer */}
          <div className="mt-5 space-y-1.5">
            <div className="w-full h-2 bg-bg-primary/80 rounded-full overflow-hidden border border-accent-gold/20">
              <div
                className="h-full bg-gradient-to-r from-accent-gold-dim via-accent-gold to-[#E5C378] transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${prayerSchedule.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>Prayer window progress</span>
              <span className="font-mono text-text-secondary">{prayerSchedule.progressPercent}%</span>
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
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      {prayer.name}
                    </span>
                    <Icon className={`w-4 h-4 ${isNext ? 'text-accent-gold' : 'text-text-muted'}`} />
                  </div>

                  <div className="font-arabic text-xl text-accent-gold leading-tight" dir="rtl">
                    {prayer.arabic}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-accent-gold/15">
                  <div className={`text-base sm:text-lg font-bold tracking-tight ${isNext ? 'text-accent-gold' : 'text-text-primary'}`}>
                    {formatTime(prayer.time)}
                  </div>
                  <div className="text-[11px] text-text-muted truncate">
                    {prayer.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Note with Qibla reference and Coordinates */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted border-t border-accent-gold/15 pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-accent-gold" />
          <span>Coordinates: {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°</span>
          <span>·</span>
          <span>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
        <div className="text-center sm:text-right text-text-secondary">
          Times automatically adjust with daily solar astronomical movement.
        </div>
      </div>
    </OrnamentedCard>
  );
}
