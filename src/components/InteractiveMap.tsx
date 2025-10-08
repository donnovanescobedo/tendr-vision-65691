import { Navigation, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import mexicoMap from "@/assets/mexico-map-hero.jpg";

const mockRoutes = [
  {
    id: "SH-2024-001",
    origin: "Ciudad de México",
    destination: "Monterrey",
    originCoords: [-99.1332, 19.4326] as [number, number],
    destinationCoords: [-100.3161, 25.6866] as [number, number],
    status: "accepted" as const,
    progress: 65,
    eta: "3h 20m",
    carrier: "Swift Transport",
  },
  {
    id: "SH-2024-003",
    origin: "Guadalajara",
    destination: "Tijuana",
    originCoords: [-103.3496, 20.6597] as [number, number],
    destinationCoords: [-117.0382, 32.5149] as [number, number],
    status: "accepted" as const,
    progress: 42,
    eta: "5h 15m",
    carrier: "Cold Chain Logistics",
  },
  {
    id: "SH-2024-002",
    origin: "Cancún",
    destination: "Mérida",
    originCoords: [-86.8515, 21.1619] as [number, number],
    destinationCoords: [-89.5926, 20.9674] as [number, number],
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

      {/* Static Map with Overlays (No WebGL) */}
      <div className="relative h-96 border-b border-border overflow-hidden">
        <img src={mexicoMap} alt="Mexico map for shipment tracking" className="absolute inset-0 w-full h-full object-cover opacity-95" loading="lazy" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/20" />
        {/* Route overlays using approximate positions */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* CDMX (48,62) -> Monterrey (56,22) */}
          <defs>
            <style>{` @keyframes dash { to { stroke-dashoffset: -20; } } `}</style>
          </defs>
          <line x1="48" y1="62" x2="56" y2="22" stroke="hsl(var(--success))" strokeWidth="1.8" strokeDasharray="4 4" style={{ animation: 'dash 2s linear infinite' }} />
          {/* GDL (42,56) -> Tijuana (12,18) */}
          <line x1="42" y1="56" x2="12" y2="18" stroke="hsl(var(--success))" strokeWidth="1.6" strokeDasharray="4 4" style={{ animation: 'dash 2.2s linear infinite' }} />
          {/* Cancún (86,42) -> Mérida (78,44) */}
          <line x1="86" y1="42" x2="78" y2="44" stroke="hsl(var(--warning))" strokeWidth="1.6" strokeDasharray="4 4" style={{ animation: 'dash 1.8s linear infinite' }} />
          {/* Endpoints */}
          <circle cx="48" cy="62" r="1.6" fill="hsl(var(--success))" />
          <circle cx="56" cy="22" r="1.6" fill="hsl(var(--success))" />
          <circle cx="42" cy="56" r="1.4" fill="hsl(var(--success))" />
          <circle cx="12" cy="18" r="1.4" fill="hsl(var(--success))" />
          <circle cx="86" cy="42" r="1.4" fill="hsl(var(--warning))" />
          <circle cx="78" cy="44" r="1.4" fill="hsl(var(--warning))" />
        </svg>
        {/* Accent truck icons near active routes */}
        <Truck className="absolute text-success" style={{ left: '52%', top: '42%' }} />
        <Truck className="absolute text-success" style={{ left: '28%', top: '36%' }} />
        <Truck className="absolute text-warning" style={{ left: '82%', top: '43%' }} />
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
