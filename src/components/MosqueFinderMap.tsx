import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMapsLibrary,
  useApiIsLoaded,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  Compass,
  AlertCircle,
  ExternalLink,
  Check,
  Search,
  Building2,
  Star,
  RefreshCw,
  LocateFixed,
} from 'lucide-react';
import { getRecommendedMosqueStandard } from '../lib/prayerMethodRecommender';

export interface MosquePlace {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distanceMeters?: number;
  rating?: number;
  userRatingsTotal?: number;
  googleMapsURI?: string;
}

interface MosqueFinderMapProps {
  userLocation: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  onSelectMosqueLocation: (loc: {
    latitude: number;
    longitude: number;
    mosqueName: string;
    city: string;
    country: string;
    recommendedMethodId?: string;
    recommendedMadhab?: 'shafi' | 'hanafi';
  }) => void;
  onClose?: () => void;
}

// Inner map component that executes when APIProvider is active
function MosqueMapContent({
  userLocation,
  onSelectMosqueLocation,
}: {
  userLocation: MosqueFinderMapProps['userLocation'];
  onSelectMosqueLocation: MosqueFinderMapProps['onSelectMosqueLocation'];
}) {
  const isLoaded = useApiIsLoaded();
  const apiStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const geometryLib = useMapsLibrary('geometry');

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: userLocation.latitude,
    lng: userLocation.longitude,
  });

  const [nearbyMosques, setNearbyMosques] = useState<MosquePlace[]>([]);
  const [selectedMosque, setSelectedMosque] = useState<MosquePlace | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [syncedMosqueId, setSyncedMosqueId] = useState<string | null>(null);

  // Update center when userLocation prop changes
  useEffect(() => {
    setCenter({
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    });
  }, [userLocation.latitude, userLocation.longitude]);

  // Search nearby mosques using Google Maps JavaScript SDK (Places API New)
  const fetchNearbyMosques = useCallback(async (lat: number, lng: number) => {
    if (!placesLib) return;
    setIsSearching(true);
    setSearchError(null);

    try {
      // Modern Places API New: Place.searchNearby
      if (placesLib.Place && typeof placesLib.Place.searchNearby === 'function') {
        const request = {
          locationRestriction: {
            center: { lat, lng },
            radius: 8000, // 8 km search radius
          },
          includedPrimaryTypes: ['mosque', 'place_of_worship'],
          fields: [
            'id',
            'displayName',
            'location',
            'formattedAddress',
            'googleMapsURI',
            'rating',
            'userRatingCount',
          ],
          maxResultCount: 15,
        };

        const { places } = await placesLib.Place.searchNearby(request);

        if (places && places.length > 0) {
          const mapped: MosquePlace[] = places.map((p: any) => {
            const pLat = typeof p.location?.lat === 'function' ? p.location.lat() : p.location?.lat || lat;
            const pLng = typeof p.location?.lng === 'function' ? p.location.lng() : p.location?.lng || lng;
            
            // Calculate distance in meters
            let dist = 0;
            const GoogleMaps = typeof window !== 'undefined' ? (window as any).google?.maps : null;
            if (geometryLib?.spherical?.computeDistanceBetween && GoogleMaps?.LatLng) {
              const from = new GoogleMaps.LatLng(lat, lng);
              const to = new GoogleMaps.LatLng(pLat, pLng);
              dist = Math.round(geometryLib.spherical.computeDistanceBetween(from, to));
            } else {
              // Haversine fallback
              const dLat = ((pLat - lat) * Math.PI) / 180;
              const dLng = ((pLng - lng) * Math.PI) / 180;
              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat * Math.PI) / 180) *
                  Math.cos((pLat * Math.PI) / 180) *
                  Math.sin(dLng / 2) *
                  Math.sin(dLng / 2);
              dist = Math.round(6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
            }

            return {
              id: p.id || String(Math.random()),
              name: p.displayName || 'Local Mosque',
              address: p.formattedAddress || 'Nearby vicinity',
              lat: pLat,
              lng: pLng,
              distanceMeters: dist,
              rating: p.rating,
              userRatingsTotal: p.userRatingCount,
              googleMapsURI: p.googleMapsURI || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName || 'Mosque')}&query_place_id=${p.id || ''}`,
            };
          });

          // Sort by nearest distance
          mapped.sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0));
          setNearbyMosques(mapped);
          setIsSearching(false);
          return;
        }
      }

      // Fallback: search by text query if searchNearby yields no items in remote area
      if (placesLib.Place && typeof placesLib.Place.searchByText === 'function') {
        const textReq = {
          textQuery: `mosque near ${userLocation.city || 'me'}`,
          locationBias: { lat, lng },
          fields: ['id', 'displayName', 'location', 'formattedAddress', 'googleMapsURI', 'rating', 'userRatingCount'],
          maxResultCount: 10,
        };
        const { places } = await placesLib.Place.searchByText(textReq);
        if (places && places.length > 0) {
          const mapped: MosquePlace[] = places.map((p: any) => ({
            id: p.id || String(Math.random()),
            name: p.displayName || 'Local Mosque',
            address: p.formattedAddress || '',
            lat: typeof p.location?.lat === 'function' ? p.location.lat() : p.location?.lat || lat,
            lng: typeof p.location?.lng === 'function' ? p.location.lng() : p.location?.lng || lng,
            distanceMeters: 500,
            rating: p.rating,
            userRatingsTotal: p.userRatingCount,
            googleMapsURI: p.googleMapsURI,
          }));
          setNearbyMosques(mapped);
          setIsSearching(false);
          return;
        }
      }

      // If no mosques returned in 8km (e.g. rural area), provide informative note
      setNearbyMosques([]);
      setSearchError('No registered mosques found in immediate 8km vicinity. You can search by town name or calibrate directly from your exact GPS coordinates.');
    } catch (err: any) {
      console.warn('Mosque search error:', err);
      setSearchError('Unable to retrieve nearby mosque points. Using direct high-precision astronomical coordinates.');
    } finally {
      setIsSearching(false);
    }
  }, [placesLib, geometryLib, userLocation.city]);

  // Execute initial search when placesLib is ready
  useEffect(() => {
    if (isLoaded && placesLib) {
      fetchNearbyMosques(center.lat, center.lng);
    }
  }, [isLoaded, placesLib, center.lat, center.lng, fetchNearbyMosques]);

  // Text search handler
  const handleTextSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !placesLib) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      if (placesLib.Place && typeof placesLib.Place.searchByText === 'function') {
        const res = await placesLib.Place.searchByText({
          textQuery: searchQuery.toLowerCase().includes('mosque') ? searchQuery : `${searchQuery} mosque`,
          fields: ['id', 'displayName', 'location', 'formattedAddress', 'googleMapsURI', 'rating', 'userRatingCount'],
          maxResultCount: 10,
        });

        if (res.places && res.places.length > 0) {
          const first = res.places[0];
          const newLat = typeof first.location?.lat === 'function' ? first.location.lat() : first.location?.lat || center.lat;
          const newLng = typeof first.location?.lng === 'function' ? first.location.lng() : first.location?.lng || center.lng;

          setCenter({ lat: newLat, lng: newLng });

          const mapped: MosquePlace[] = res.places.map((p: any) => ({
            id: p.id || String(Math.random()),
            name: p.displayName || 'Mosque',
            address: p.formattedAddress || '',
            lat: typeof p.location?.lat === 'function' ? p.location.lat() : p.location?.lat || newLat,
            lng: typeof p.location?.lng === 'function' ? p.location.lng() : p.location?.lng || newLng,
            rating: p.rating,
            userRatingsTotal: p.userRatingCount,
            googleMapsURI: p.googleMapsURI,
          }));

          setNearbyMosques(mapped);
          if (mapped[0]) setSelectedMosque(mapped[0]);
        } else {
          setSearchError(`No mosques found for "${searchQuery}".`);
        }
      }
    } catch (err) {
      setSearchError('Search query failed. Please verify connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSyncMosque = (mosque: MosquePlace) => {
    setSyncedMosqueId(mosque.id);
    const recommendation = getRecommendedMosqueStandard(userLocation.country, userLocation.city);

    onSelectMosqueLocation({
      latitude: mosque.lat,
      longitude: mosque.lng,
      mosqueName: mosque.name,
      city: userLocation.city,
      country: userLocation.country,
      recommendedMethodId: recommendation.methodId,
      recommendedMadhab: recommendation.madhab,
    });
  };

  const formatDistance = (meters?: number) => {
    if (!meters && meters !== 0) return '';
    if (meters < 1000) return `${meters} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Auto-locate Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <form onSubmit={handleTextSearch} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-accent-gold/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mosque or area (e.g. Central Mosque, Al-Faruq)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-bg-primary/80 border border-accent-gold/30 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-3.5 py-2 text-xs font-semibold bg-accent-gold/20 hover:bg-accent-gold/30 border border-accent-gold/40 text-accent-gold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Find</span>
          </button>
        </form>

        <button
          onClick={() => {
            setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
            fetchNearbyMosques(userLocation.latitude, userLocation.longitude);
          }}
          title="Recenter to my detected GPS coordinates"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-bg-card border border-accent-gold/30 hover:border-accent-gold text-text-secondary hover:text-accent-gold rounded-lg transition-colors shrink-0"
        >
          <LocateFixed className="w-3.5 h-3.5 text-accent-gold" />
          <span>My GPS Point</span>
        </button>
      </div>

      {searchError && (
        <div className="px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{searchError}</span>
        </div>
      )}

      {/* Interactive Google Map Container */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden border border-accent-gold/40 shadow-inner bg-bg-primary">
        <Map
          defaultCenter={center}
          center={center}
          defaultZoom={14}
          zoom={14}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_git_agentskills_v1']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {/* User Location Advanced Marker */}
          <AdvancedMarker
            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
            title="Your Exact Geolocation"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-emerald-400 opacity-75"></span>
              <div className="relative w-6 h-6 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
            </div>
          </AdvancedMarker>

          {/* Nearby Mosques Advanced Markers */}
          {nearbyMosques.map((mosque) => {
            const isSelected = selectedMosque?.id === mosque.id;
            const isSynced = syncedMosqueId === mosque.id;

            return (
              <AdvancedMarker
                key={mosque.id}
                position={{ lat: mosque.lat, lng: mosque.lng }}
                title={mosque.name}
                onClick={() => setSelectedMosque(mosque)}
              >
                <div
                  className={`relative p-1.5 rounded-full border-2 shadow-md cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${
                    isSynced
                      ? 'bg-emerald-500 border-white text-white'
                      : isSelected
                      ? 'bg-accent-gold border-white text-bg-primary scale-110'
                      : 'bg-bg-card border-accent-gold text-accent-gold'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Info Window for Selected Mosque */}
          {selectedMosque && (
            <InfoWindow
              position={{ lat: selectedMosque.lat, lng: selectedMosque.lng }}
              onCloseClick={() => setSelectedMosque(null)}
            >
              <div className="p-1 max-w-xs text-stone-900 font-sans">
                <div className="font-bold text-sm text-stone-900 leading-tight">
                  {selectedMosque.name}
                </div>
                <div className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {selectedMosque.address}
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
                  {selectedMosque.distanceMeters !== undefined && (
                    <span className="font-semibold text-emerald-700">
                      📍 {formatDistance(selectedMosque.distanceMeters)} away
                    </span>
                  )}
                  {selectedMosque.rating && (
                    <span className="flex items-center gap-1 text-amber-700">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {selectedMosque.rating} ({selectedMosque.userRatingsTotal || 0})
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-stone-200">
                  <button
                    onClick={() => handleSyncMosque(selectedMosque)}
                    className="flex-1 py-1 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Sync Prayer Time</span>
                  </button>

                  {selectedMosque.googleMapsURI && (
                    <a
                      href={selectedMosque.googleMapsURI}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Google Maps for walking directions"
                      className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

      {/* Mosque List & Sync Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-accent-gold font-semibold uppercase tracking-wider px-1">
          <span>Detected Nearby Mosques ({nearbyMosques.length})</span>
          <span className="text-text-muted font-normal lowercase">click to calibrate azan timetable</span>
        </div>

        {nearbyMosques.length === 0 ? (
          <div className="p-4 rounded-xl bg-bg-card/60 border border-accent-gold/20 text-center text-xs text-text-muted">
            {isSearching ? (
              <div className="flex items-center justify-center gap-2 text-accent-gold">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Google Maps for nearby masjids...</span>
              </div>
            ) : (
              <div>
                No local mosques detected within range. Your prayer times are being calculated using high-accuracy astronomical equations for coordinates {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {nearbyMosques.map((mosque) => {
              const isSynced = syncedMosqueId === mosque.id;

              return (
                <div
                  key={mosque.id}
                  className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    isSynced
                      ? 'bg-emerald-950/40 border-emerald-500/70 shadow'
                      : 'bg-bg-card/70 border-accent-gold/25 hover:border-accent-gold/60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-text-primary line-clamp-1">
                        {mosque.name}
                      </h4>
                      {mosque.distanceMeters !== undefined && (
                        <span className="text-[11px] font-mono text-accent-gold shrink-0 bg-accent-gold/10 px-1.5 py-0.5 rounded">
                          {formatDistance(mosque.distanceMeters)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted line-clamp-1 mt-0.5">
                      {mosque.address}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-accent-gold/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleSyncMosque(mosque)}
                      className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                        isSynced
                          ? 'bg-emerald-500 text-white'
                          : 'bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold border border-accent-gold/40'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isSynced ? 'Synced to Mosque' : 'Sync Timetable'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedMosque(mosque);
                          setCenter({ lat: mosque.lat, lng: mosque.lng });
                        }}
                        className="text-[11px] text-text-secondary hover:text-accent-gold underline px-1"
                      >
                        Focus
                      </button>
                      {mosque.googleMapsURI && (
                        <a
                          href={mosque.googleMapsURI}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open walking directions in Google Maps"
                          className="p-1 rounded text-text-muted hover:text-accent-gold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Fallback component implementing Mandatory Quota & Outage handling (Tier 2 & Tier 3)
function MapsQuotaFallback({ userLocation }: { userLocation: MosqueFinderMapProps['userLocation'] }) {
  const gMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=mosque+near+${encodeURIComponent(
    `${userLocation.latitude},${userLocation.longitude}`
  )}`;

  return (
    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/40 text-left space-y-3">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-200">
          <div>
            Google Maps Platform quota exceeded or key invalid. Check billing and quota settings in the{' '}
            <a
              href="https://console.cloud.google.com/google/maps-apis/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline text-amber-300 hover:text-white"
            >
              Google Cloud Console
            </a>
            .
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-bg-primary/70 border border-accent-gold/20 text-xs text-text-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-text-primary">Detected Coordinates: </span>
          <span className="font-mono text-accent-gold">
            {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}° ({userLocation.city})
          </span>
        </div>
        <a
          href={gMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-accent-gold hover:underline font-semibold"
        >
          <span>Find Mosques on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// Top-level MosqueFinderMap wrapped in APIProvider
export function MosqueFinderMap(props: MosqueFinderMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [hasAuthFailed, setHasAuthFailed] = useState<boolean>(() => Boolean((window as any).__GMP_AUTH_FAILED__));

  useEffect(() => {
    const handleAuthFail = () => setHasAuthFailed(true);
    window.addEventListener('gmp-auth-failure', handleAuthFail);
    return () => window.removeEventListener('gmp-auth-failure', handleAuthFail);
  }, []);

  if (!apiKey || hasAuthFailed) {
    return <MapsQuotaFallback userLocation={props.userLocation} />;
  }

  return (
    <APIProvider
      apiKey={apiKey}
      libraries={['places', 'geometry']}
    >
      <MosqueMapContentWrapper {...props} />
    </APIProvider>
  );
}

// Wrapper to inspect API loading status inside Provider context
function MosqueMapContentWrapper(props: MosqueFinderMapProps) {
  const status = useApiLoadingStatus();

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return <MapsQuotaFallback userLocation={props.userLocation} />;
  }

  return <MosqueMapContent {...props} />;
}
