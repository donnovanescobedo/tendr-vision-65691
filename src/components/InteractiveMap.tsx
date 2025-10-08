import { Navigation, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MapboxMap from "./MapboxMap";

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

      {/* Mapbox Map */}
      <MapboxMap routes={mockRoutes} />

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
