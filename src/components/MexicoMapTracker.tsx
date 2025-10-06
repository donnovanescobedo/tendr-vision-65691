import { useState } from "react";
import { MapPin, Navigation, Truck, Calendar, Clock, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockMexicoRoutes = [
  {
    id: "SH-2024-001",
    origin: { city: "Ciudad de México", lat: 19.43, lng: -99.13 },
    destination: { city: "Monterrey", lat: 25.67, lng: -100.31 },
    status: "in-transit" as const,
    progress: 65,
    eta: "3h 20m",
    carrier: "Swift Transport MX",
    startDate: "2024-10-15",
    startTime: "08:00",
  },
  {
    id: "SH-2024-002",
    origin: { city: "Guadalajara", lat: 20.67, lng: -103.35 },
    destination: { city: "Tijuana", lat: 32.51, lng: -117.04 },
    status: "in-transit" as const,
    progress: 40,
    eta: "8h 15m",
    carrier: "Cold Chain MX",
    startDate: "2024-10-15",
    startTime: "06:30",
  },
  {
    id: "SH-2024-003",
    origin: { city: "Cancún", lat: 21.16, lng: -86.85 },
    destination: { city: "Mérida", lat: 20.97, lng: -89.62 },
    status: "in-transit" as const,
    progress: 85,
    eta: "45m",
    carrier: "FastLine MX",
    startDate: "2024-10-15",
    startTime: "10:00",
  },
];

const MexicoMapTracker = () => {
  const [startDate, setStartDate] = useState("2024-10-15");
  const [startTime, setStartTime] = useState("08:00");
  const [endDate, setEndDate] = useState("2024-10-16");
  const [endTime, setEndTime] = useState("18:00");

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Shipment Tracking</h2>
            <p className="text-muted-foreground mt-1">Real-time route visualization across Mexico</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Navigation className="w-3 h-3 mr-1" />
            Live Tracking
          </Badge>
        </div>

        {/* Date/Time Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg border border-border">
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
      </div>

      {/* Mexico Map Visualization */}
      <div className="relative bg-gradient-to-br from-muted/30 to-muted/50 h-[500px] border-b border-border overflow-hidden">
        {/* Stylized Mexico Map Background */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-20">
            {/* Simplified Mexico outline */}
            <path
              d="M 100 200 L 150 180 L 200 190 L 250 170 L 300 180 L 350 160 L 400 170 L 450 150 L 500 160 L 550 180 L 600 200 L 650 220 L 680 250 L 700 280 L 720 320 L 700 360 L 680 400 L 650 430 L 600 450 L 550 460 L 500 470 L 450 480 L 400 485 L 350 480 L 300 470 L 250 450 L 200 430 L 150 410 L 120 380 L 100 350 L 90 320 L 85 280 L 90 240 L 100 200 Z"
              fill="hsl(var(--primary) / 0.1)"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--border)) 0px, hsl(var(--border)) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 1px, transparent 1px, transparent 30px)"
        }}></div>

        {/* Route Visualization */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-full">
            {/* Route 1: CDMX to Monterrey (North) */}
            <div className="absolute top-1/2 left-1/3" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-primary fill-primary/20 animate-pulse" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                CDMX
              </div>
            </div>
            <svg className="absolute top-1/2 left-1/3 w-1/3 h-1/4" style={{ transform: 'translate(0, -50%)' }}>
              <line x1="0" y1="0" x2="100%" y2="-80%" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="8,4" className="animate-pulse" />
            </svg>
            <div className="absolute top-1/4 left-2/3 animate-truck-move" style={{ animationDuration: '8s', transform: 'translate(-50%, -50%)' }}>
              <Truck className="w-7 h-7 text-primary" />
            </div>
            <div className="absolute top-1/4 left-2/3" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-success fill-success/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                Monterrey
              </div>
            </div>

            {/* Route 2: Guadalajara to Tijuana (Northwest) */}
            <div className="absolute top-2/3 left-1/4" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-accent fill-accent/20 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                Guadalajara
              </div>
            </div>
            <svg className="absolute top-2/3 left-1/4 w-1/2 h-1/3" style={{ transform: 'translate(0, -50%)' }}>
              <line x1="0" y1="0" x2="90%" y2="-120%" stroke="hsl(var(--accent))" strokeWidth="3" strokeDasharray="8,4" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
            </svg>
            <div className="absolute top-1/3 right-1/4 animate-truck-move" style={{ animationDuration: '12s', animationDelay: '1s', transform: 'translate(-50%, -50%)' }}>
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <div className="absolute top-1/3 right-1/4" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-success fill-success/20 animate-pulse" style={{ animationDelay: '0.8s' }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                Tijuana
              </div>
            </div>

            {/* Route 3: Cancún to Mérida (Southeast) */}
            <div className="absolute bottom-1/4 right-1/4" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-warning fill-warning/20 animate-pulse" style={{ animationDelay: '0.6s' }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                Cancún
              </div>
            </div>
            <svg className="absolute bottom-1/4 right-1/4 w-1/5 h-1/6" style={{ transform: 'translate(-50%, 0)' }}>
              <line x1="0" y1="0" x2="-150%" y2="10%" stroke="hsl(var(--warning))" strokeWidth="3" strokeDasharray="8,4" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
            </svg>
            <div className="absolute bottom-1/4 right-1/2 animate-truck-move" style={{ animationDuration: '6s', animationDelay: '0.5s', transform: 'translate(-50%, -50%)' }}>
              <Truck className="w-6 h-6 text-warning" />
            </div>
            <div className="absolute bottom-1/4 right-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
              <MapPin className="w-8 h-8 text-success fill-success/20 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-card px-2 py-1 rounded border border-border">
                Mérida
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Active Shipments</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-3 h-3" />
            Filter Routes
          </Button>
        </div>
        
        <div className="space-y-3">
          {mockMexicoRoutes.map((route, index) => (
            <div
              key={route.id}
              className="group p-5 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-all hover:border-primary/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Truck className={`w-5 h-5 ${
                    index === 0 ? 'text-primary' : 
                    index === 1 ? 'text-accent' : 
                    'text-warning'
                  }`} />
                  <div>
                    <div className="font-bold text-foreground">{route.id}</div>
                    <div className="text-sm text-muted-foreground">{route.carrier}</div>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  In Transit
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                <div>
                  <div className="text-muted-foreground mb-1">Origin</div>
                  <div className="font-medium text-foreground">{route.origin.city}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Destination</div>
                  <div className="font-medium text-foreground">{route.destination.city}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Progress</div>
                  <div className="font-medium text-foreground">{route.progress}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">ETA</div>
                  <div className="font-medium text-foreground">{route.eta}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Start Time</div>
                  <div className="font-medium text-foreground">{route.startTime}</div>
                </div>
              </div>

              <div className="relative">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-gradient-to-r from-primary to-primary-glow' :
                      index === 1 ? 'bg-gradient-accent' :
                      'bg-gradient-to-r from-warning to-warning/70'
                    }`}
                    style={{ width: `${route.progress}%` }}
                  />
                </div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-primary rounded-full shadow-lg transition-all duration-500"
                  style={{ left: `${route.progress}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MexicoMapTracker;
