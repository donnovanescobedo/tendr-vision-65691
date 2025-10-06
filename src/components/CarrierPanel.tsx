import { MessageSquare, Mail, Phone, AlertTriangle, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Only carriers with 3+ rejections
const mockRejectedCarriers = [
  {
    id: 1,
    carrier: "Heavy Haul Pro",
    carrierId: "C-6789",
    shipmentId: "SH-2024-004",
    rejectionCount: 3,
    attempts: [
      {
        timestamp: "2024-10-15 09:30 AM",
        channel: "phone" as const,
        message: "Flatbed required. Origin: Houston, TX → Destination: Denver, CO. 4 hrs loading time. Rate: $4,500",
        status: "rejected" as const,
        reason: "Equipment unavailable",
      },
      {
        timestamp: "2024-10-15 11:45 AM",
        channel: "whatsapp" as const,
        message: "Follow-up: Flatbed shipment SH-2024-004 still available. Can you help?",
        status: "rejected" as const,
        reason: "No drivers available",
      },
      {
        timestamp: "2024-10-15 02:15 PM",
        channel: "email" as const,
        message: "Final attempt: Flatbed shipment to Denver. Increased rate to $4,800.",
        status: "rejected" as const,
        reason: "Route not covered",
      },
    ],
  },
  {
    id: 2,
    carrier: "Express Route Inc",
    carrierId: "C-3344",
    shipmentId: "SH-2024-008",
    rejectionCount: 3,
    attempts: [
      {
        timestamp: "2024-10-15 08:00 AM",
        channel: "email" as const,
        message: "Dry van shipment. Dallas, TX → Phoenix, AZ. 2.5 hrs loading. Rate: $2,800",
        status: "rejected" as const,
        reason: "Price too low",
      },
      {
        timestamp: "2024-10-15 10:30 AM",
        channel: "phone" as const,
        message: "Follow-up call: Increased rate to $3,000 for SH-2024-008",
        status: "rejected" as const,
        reason: "Still not competitive",
      },
      {
        timestamp: "2024-10-15 01:00 PM",
        channel: "whatsapp" as const,
        message: "Final offer: $3,200 for Dallas to Phoenix shipment",
        status: "rejected" as const,
        reason: "Committed to other routes",
      },
    ],
  },
];

const CarrierPanel = () => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="w-4 h-4 text-success" />;
      case "email":
        return <Mail className="w-4 h-4 text-accent" />;
      case "phone":
        return <Phone className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border bg-destructive/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
              <h2 className="text-2xl font-bold text-foreground">Carrier Escalation Panel</h2>
            </div>
            <p className="text-muted-foreground">Carriers with 3+ rejections requiring human follow-up</p>
          </div>
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-lg px-4 py-2">
            {mockRejectedCarriers.length} Carrier{mockRejectedCarriers.length > 1 ? 's' : ''} Need Attention
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {mockRejectedCarriers.map((carrier) => (
          <div
            key={carrier.id}
            className="border-2 border-destructive/30 rounded-lg overflow-hidden bg-destructive/5 animate-fade-in"
          >
            {/* Carrier Header */}
            <div className="p-5 bg-destructive/10 border-b border-destructive/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-xl text-foreground">{carrier.carrier}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-muted-foreground">{carrier.carrierId}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">Shipment: {carrier.shipmentId}</span>
                  </div>
                </div>
                <Badge className="bg-destructive text-destructive-foreground">
                  {carrier.rejectionCount} Rejections
                </Badge>
              </div>
              
              <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2">
                <UserCog className="w-4 h-4" />
                Assign Human Operator
              </Button>
            </div>

            {/* Communication Timeline */}
            <div className="p-5 space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Communication Timeline
              </h4>
              
              {carrier.attempts.map((attempt, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-4 border-l-2 border-destructive/30 last:border-l-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-destructive border-2 border-card" />
                  
                  <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-muted rounded">
                          {getChannelIcon(attempt.channel)}
                        </div>
                        <span className="text-xs font-medium uppercase text-muted-foreground">
                          {attempt.channel}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{attempt.timestamp}</span>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded mb-2">
                      <p className="text-sm text-foreground">{attempt.message}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                        Rejected
                      </Badge>
                      <span className="text-xs text-destructive font-medium">
                        Reason: {attempt.reason}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarrierPanel;
