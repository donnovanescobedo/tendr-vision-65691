import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Truck } from 'lucide-react';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom truck icon
const createTruckIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-truck-icon',
    html: `<div style="color: ${color}; font-size: 24px;">🚛</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

interface Route {
  id: string;
  origin: [number, number]; // [lat, lng]
  destination: [number, number]; // [lat, lng]
  originCity: string;
  destinationCity: string;
  color: string;
  progress: number;
}

const mockRoutes: Route[] = [
  {
    id: 'SH-2024-001',
    origin: [19.43, -99.13], // Ciudad de México
    destination: [25.67, -100.31], // Monterrey
    originCity: 'Ciudad de México',
    destinationCity: 'Monterrey',
    color: '#3b82f6',
    progress: 45,
  },
  {
    id: 'SH-2024-002',
    origin: [20.67, -103.35], // Guadalajara
    destination: [32.51, -117.04], // Tijuana
    originCity: 'Guadalajara',
    destinationCity: 'Tijuana',
    color: '#8b5cf6',
    progress: 78,
  },
  {
    id: 'SH-2024-003',
    origin: [21.16, -86.85], // Cancún
    destination: [20.97, -89.62], // Mérida
    originCity: 'Cancún',
    destinationCity: 'Mérida',
    color: '#f59e0b',
    progress: 30,
  },
];

const LeafletMap = () => {
  const [startDate, setStartDate] = useState("2024-10-15");
  const [startTime, setStartTime] = useState("08:00");
  const [endDate, setEndDate] = useState("2024-10-16");
  const [endTime, setEndTime] = useState("18:00");
  const [animatedRoutes, setAnimatedRoutes] = useState(mockRoutes);

  // Calculate truck position based on progress
  const calculateTruckPosition = (origin: [number, number], destination: [number, number], progress: number): [number, number] => {
    const lat = origin[0] + (destination[0] - origin[0]) * (progress / 100);
    const lng = origin[1] + (destination[1] - origin[1]) * (progress / 100);
    return [lat, lng];
  };

  // Animate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedRoutes(prev => 
        prev.map(route => ({
          ...route,
          progress: route.progress >= 100 ? 0 : route.progress + 1,
        }))
      );
    }, 200);

    return () => clearInterval(interval);
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
      <div className="w-full h-[500px] rounded-lg border border-border shadow-lg overflow-hidden">
        <MapContainer
          center={[23.6345, -102.5528]} // Center of Mexico
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {animatedRoutes.map((route) => {
            const truckPosition = calculateTruckPosition(route.origin, route.destination, route.progress);
            
            return (
              <div key={route.id}>
                {/* Route line */}
                <Polyline
                  positions={[route.origin, route.destination]}
                  color={route.color}
                  weight={3}
                  dashArray="10, 10"
                />
                
                {/* Origin marker */}
                <Marker position={route.origin}>
                  <Popup>
                    <div className="text-sm">
                      <strong>Origin:</strong> {route.originCity}<br/>
                      <strong>Shipment:</strong> {route.id}
                    </div>
                  </Popup>
                </Marker>
                
                {/* Destination marker */}
                <Marker position={route.destination}>
                  <Popup>
                    <div className="text-sm">
                      <strong>Destination:</strong> {route.destinationCity}<br/>
                      <strong>Shipment:</strong> {route.id}
                    </div>
                  </Popup>
                </Marker>
                
                {/* Animated truck */}
                <Marker position={truckPosition} icon={createTruckIcon(route.color)}>
                  <Popup>
                    <div className="text-sm">
                      <strong>Shipment:</strong> {route.id}<br/>
                      <strong>Progress:</strong> {route.progress}%<br/>
                      <strong>Route:</strong> {route.originCity} → {route.destinationCity}
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
      </div>

      {/* Active Shipments Details */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          Active Shipments
        </h3>
        <div className="space-y-3">
          {animatedRoutes.map((route) => (
            <div
              key={route.id}
              className="p-4 rounded-lg border-2 border-success/20 bg-success/5 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-success" />
                  <div>
                    <div className="font-semibold text-foreground">{route.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {route.originCity} → {route.destinationCity}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{route.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all duration-500"
                    style={{ width: `${route.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
