import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface Route {
  id: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destinationCoords: [number, number];
  status: 'accepted' | 'pending' | 'rejected';
  progress: number;
  carrier: string;
}

interface MapboxMapProps {
  routes: Route[];
}

const MapboxMap = ({ routes }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-102.5528, 23.6345], // Mexico center
        zoom: 4.5,
        pitch: 45,
        bearing: 0,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        if (!map.current) return;

        // Add routes
        routes.forEach((route, index) => {
          if (route.status !== 'accepted') return;

          const routeId = `route-${route.id}`;
          const lineColor = route.status === 'accepted' ? '#10b981' : 
                           route.status === 'pending' ? '#f59e0b' : '#ef4444';

          // Add route line
          map.current!.addSource(routeId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [route.originCoords, route.destinationCoords],
              },
            },
          });

          map.current!.addLayer({
            id: routeId,
            type: 'line',
            source: routeId,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': lineColor,
              'line-width': 4,
              'line-opacity': 0.8,
            },
          });

          // Add animated dashed line
          map.current!.addLayer({
            id: `${routeId}-dashed`,
            type: 'line',
            source: routeId,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': lineColor,
              'line-width': 2,
              'line-dasharray': [0, 4, 3],
              'line-opacity': 0.6,
            },
          });

          // Origin marker
          const originEl = document.createElement('div');
          originEl.className = 'origin-marker';
          originEl.style.cssText = `
            width: 32px;
            height: 32px;
            background-color: ${lineColor};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
          `;

          const originMarker = new mapboxgl.Marker({ element: originEl })
            .setLngLat(route.originCoords)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="padding: 8px;">
                    <strong>${route.origin}</strong><br/>
                    <span style="color: #666; font-size: 12px;">${route.id}</span><br/>
                    <span style="color: #666; font-size: 12px;">${route.carrier}</span>
                  </div>
                `)
            )
            .addTo(map.current!);
          markersRef.current.push(originMarker);

          // Destination marker
          const destEl = document.createElement('div');
          destEl.className = 'destination-marker';
          destEl.style.cssText = `
            width: 32px;
            height: 32px;
            background-color: white;
            border: 3px solid ${lineColor};
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
            position: relative;
          `;
          
          const innerDot = document.createElement('div');
          innerDot.style.cssText = `
            width: 12px;
            height: 12px;
            background-color: ${lineColor};
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `;
          destEl.appendChild(innerDot);

          const destMarker = new mapboxgl.Marker({ element: destEl })
            .setLngLat(route.destinationCoords)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="padding: 8px;">
                    <strong>${route.destination}</strong><br/>
                    <span style="color: #666; font-size: 12px;">Destination</span><br/>
                    <span style="color: ${lineColor}; font-size: 12px; font-weight: 600;">Progress: ${route.progress}%</span>
                  </div>
                `)
            )
            .addTo(map.current!);
          markersRef.current.push(destMarker);

          // Animated truck marker
          if (route.progress > 0 && route.progress < 100) {
            const truckEl = document.createElement('div');
            truckEl.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" stroke="${lineColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 18H9" stroke="${lineColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" stroke="${lineColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="17" cy="18" r="2" stroke="${lineColor}" stroke-width="2" fill="white"/>
                <circle cx="7" cy="18" r="2" stroke="${lineColor}" stroke-width="2" fill="white"/>
              </svg>
            `;
            truckEl.style.cssText = `
              background-color: white;
              border-radius: 50%;
              padding: 8px;
              box-shadow: 0 4px 16px rgba(0,0,0,0.4);
              animation: truck-bounce 2s ease-in-out infinite;
            `;

            const progress = route.progress / 100;
            const truckLng = route.originCoords[0] + (route.destinationCoords[0] - route.originCoords[0]) * progress;
            const truckLat = route.originCoords[1] + (route.destinationCoords[1] - route.originCoords[1]) * progress;

            const truckMarker = new mapboxgl.Marker({ element: truckEl })
              .setLngLat([truckLng, truckLat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`
                    <div style="padding: 8px;">
                      <strong>🚚 In Transit</strong><br/>
                      <span style="color: #666; font-size: 12px;">${route.id}</span><br/>
                      <span style="color: ${lineColor}; font-size: 13px; font-weight: 600;">${route.progress}% Complete</span>
                    </div>
                  `)
              )
              .addTo(map.current!);
            markersRef.current.push(truckMarker);
          }
        });

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
          @keyframes truck-bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
        `;
        document.head.appendChild(style);
      });

      return () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing Mapbox:', error);
    }
  }, [tokenSubmitted, mapboxToken, routes]);

  if (!tokenSubmitted) {
    return (
      <div className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 h-96 border-b border-border flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <div className="bg-card rounded-xl p-8 border border-border shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">Enable Live Map</h3>
                <p className="text-sm text-muted-foreground">Enter your Mapbox token</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="pk.eyJ1Ijo..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Get your token at{' '}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              <Button
                onClick={() => setTokenSubmitted(true)}
                disabled={!mapboxToken}
                className="w-full"
              >
                Load Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 border-b border-border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapboxMap;
