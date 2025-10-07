import { MapPin, Navigation, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockRoutes = [
  {
    id: "SH-2024-001",
    origin: "Ciudad de México",
    destination: "Monterrey",
    status: "accepted" as const,
    progress: 65,
    eta: "3h 20m",
    carrier: "Swift Transport",
  },
  {
    id: "SH-2024-003",
    origin: "Guadalajara",
    destination: "Tijuana",
    status: "accepted" as const,
    progress: 42,
    eta: "5h 15m",
    carrier: "Cold Chain Logistics",
  },
  {
    id: "SH-2024-002",
    origin: "Cancún",
    destination: "Mérida",
    status: "pending" as const,
    progress: 0,
    eta: "Not started",
    carrier: "Swift Transport",
  },
];

const InteractiveMap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "border-success bg-success/5";
      case "pending":
        return "border-warning bg-warning/5";
      case "rejected":
        return "border-destructive bg-destructive/5";
      default:
        return "border-border bg-muted/30";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Shipment Tracking</h2>
            <p className="text-muted-foreground mt-1">Real-time route visualization across Mexico</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Navigation className="w-3 h-3 mr-1" />
            Live Tracking
          </Badge>
        </div>
      </div>

      {/* Map Placeholder with Routes */}
      <div className="relative bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-blue-950/20 h-96 border-b border-border overflow-hidden">
        {/* Terrain Background */}
        <div className="absolute inset-0 opacity-30">
          {/* Mountain ranges */}
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="terrain" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 80 L25 60 L50 70 L75 50 L100 65 L100 100 L0 100 Z" fill="hsl(var(--muted))" opacity="0.3"/>
                <path d="M0 90 L20 85 L40 88 L60 82 L80 87 L100 85 L100 100 L0 100 Z" fill="hsl(var(--muted))" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#terrain)" />
          </svg>
        </div>
        
        {/* Road Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeDasharray="15,8" />
        </svg>
        
        {/* City Markers */}
        <div className="absolute top-[25%] left-[25%] w-3 h-3 bg-foreground/40 rounded-full animate-pulse" title="Ciudad de México" />
        <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-foreground/40 rounded-full" title="Monterrey" />
        <div className="absolute top-[35%] left-[35%] w-2 h-2 bg-foreground/40 rounded-full" title="Guadalajara" />
        <div className="absolute top-[15%] left-[15%] w-2 h-2 bg-foreground/40 rounded-full" title="Tijuana" />
        <div className="absolute bottom-[20%] right-[20%] w-2 h-2 bg-foreground/40 rounded-full" title="Cancún" />
        
        {/* Grid overlay for coordinates */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 50px)"
        }}></div>

        {/* Route Indicators */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-64">
            {/* Route 1 - Active */}
            <div className="absolute top-1/4 left-1/4 animate-pulse">
              <MapPin className="w-8 h-8 text-success fill-success/20" />
            </div>
            <svg className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
              <line x1="0" y1="0" x2="100%" y2="50%" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            <div className="absolute top-1/3 left-1/2 animate-truck-move">
              <Truck className="w-6 h-6 text-success" />
            </div>
            <div className="absolute top-1/2 right-1/4">
              <MapPin className="w-8 h-8 text-success fill-success/20" />
            </div>

            {/* Route 2 - Active */}
            <div className="absolute bottom-1/4 left-1/3 animate-pulse" style={{ animationDelay: "0.5s" }}>
              <MapPin className="w-8 h-8 text-success fill-success/20" />
            </div>
            <svg className="absolute bottom-1/4 left-1/3 w-2/5 h-1/3">
              <line x1="0" y1="0" x2="100%" y2="-100%" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Route 3 - Pending */}
            <div className="absolute top-3/4 right-1/3 animate-pulse" style={{ animationDelay: "1s" }}>
              <MapPin className="w-8 h-8 text-warning fill-warning/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Route Details */}
      <div className="p-6">
        <div className="space-y-3">
          {mockRoutes.map((route) => (
            <div
              key={route.id}
              className={`p-4 rounded-lg border-2 ${getStatusColor(route.status)} transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Truck className={`w-5 h-5 ${
                    route.status === "accepted" ? "text-success" :
                    route.status === "pending" ? "text-warning" : "text-destructive"
                  }`} />
                  <div>
                    <div className="font-semibold text-foreground">{route.id}</div>
                    <div className="text-sm text-muted-foreground">{route.carrier}</div>
                  </div>
                </div>
                <Badge className={
                  route.status === "accepted" ? "bg-success/10 text-success border-success/20" :
                  route.status === "pending" ? "bg-warning/10 text-warning border-warning/20" :
                  "bg-destructive/10 text-destructive border-destructive/20"
                }>
                  {route.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Origin</div>
                  <div className="font-medium text-foreground">{route.origin}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Destination</div>
                  <div className="font-medium text-foreground">{route.destination}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Progress</div>
                  <div className="font-medium text-foreground">{route.progress}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">ETA</div>
                  <div className="font-medium text-foreground">{route.eta}</div>
                </div>
              </div>

              {route.status === "accepted" && route.progress > 0 && (
                <div className="mt-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success transition-all duration-500"
                      style={{ width: `${route.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
