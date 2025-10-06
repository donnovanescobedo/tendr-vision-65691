import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Calendar, Clock } from 'lucide-react';

// You'll need to add your Mapbox token via Supabase Edge Function Secrets
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'; // Replace with actual token

interface Route {
  id: string;
  origin: [number, number]; // [lng, lat]
  destination: [number, number]; // [lng, lat]
  originCity: string;
  destinationCity: string;
  color: string;
}

const mockRoutes: Route[] = [
  {
    id: 'SH-2024-001',
    origin: [-99.13, 19.43], // Ciudad de México
    destination: [-100.31, 25.67], // Monterrey
    originCity: 'Ciudad de México',
    destinationCity: 'Monterrey',
    color: '#3b82f6',
  },
  {
    id: 'SH-2024-002',
    origin: [-103.35, 20.67], // Guadalajara
    destination: [-117.04, 32.51], // Tijuana
    originCity: 'Guadalajara',
    destinationCity: 'Tijuana',
    color: '#8b5cf6',
  },
  {
    id: 'SH-2024-003',
    origin: [-86.85, 21.16], // Cancún
    destination: [-89.62, 20.97], // Mérida
    originCity: 'Cancún',
    destinationCity: 'Mérida',
    color: '#f59e0b',
  },
];

const MapboxMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [startDate, setStartDate] = useState("2024-10-15");
  const [startTime, setStartTime] = useState("08:00");
  const [endDate, setEndDate] = useState("2024-10-16");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-102.5528, 23.6345], // Center of Mexico
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add routes
      mockRoutes.forEach((route) => {
        // Add route line
        map.current!.addLayer({
          id: `route-${route.id}`,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [route.origin, route.destination],
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': route.color,
            'line-width': 3,
            'line-dasharray': [2, 2],
          },
        });

        // Add origin marker
        new mapboxgl.Marker({ color: route.color })
          .setLngLat(route.origin)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>Origin:</strong> ${route.originCity}`))
          .addTo(map.current!);

        // Add destination marker
        new mapboxgl.Marker({ color: '#22c55e' })
          .setLngLat(route.destination)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>Destination:</strong> ${route.destinationCity}`))
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Date/Time Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-card rounded-lg border border-border">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Start Date
          </label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Start Time
          </label>
          <Input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            End Date
          </label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            End Time
          </label>
          <Input 
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg border border-border shadow-lg" />
    </div>
  );
};

export default MapboxMap;
