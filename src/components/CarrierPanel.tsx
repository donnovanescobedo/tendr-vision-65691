import { useState } from "react";
import { MessageSquare, Mail, Phone, AlertTriangle, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Only carriers with 3+ rejections
const mockRejectedCarriers = [
  {
    id: 1,
    carrierName: "Heavy Haul Pro",
    carrierId: "C-6789",
    shipmentId: "SH-2024-004",
    rejectionCount: 3,
    communicationAttempts: [
      {
        timestamp: "2024-10-15 09:30 AM",
        channel: "phone" as const,
        message: "Flatbed required. Origin: Houston, TX → Destination: Denver, CO. 4 hrs loading time. Rate: $4,500",
      },
      {
        timestamp: "2024-10-15 11:45 AM",
        channel: "whatsapp" as const,
        message: "Follow-up: Flatbed shipment SH-2024-004 still available. Can you help?",
      },
      {
        timestamp: "2024-10-15 02:15 PM",
        channel: "email" as const,
        message: "Final attempt: Flatbed shipment to Denver. Increased rate to $4,800.",
      },
    ],
  },
  {
    id: 2,
    carrierName: "Express Route Inc",
    carrierId: "C-3344",
    shipmentId: "SH-2024-008",
    rejectionCount: 3,
    communicationAttempts: [
      {
        timestamp: "2024-10-15 08:00 AM",
        channel: "email" as const,
        message: "Dry van shipment. Dallas, TX → Phoenix, AZ. 2.5 hrs loading. Rate: $2,800",
      },
      {
        timestamp: "2024-10-15 10:30 AM",
        channel: "phone" as const,
        message: "Follow-up call: Increased rate to $3,000 for SH-2024-008",
      },
      {
        timestamp: "2024-10-15 01:00 PM",
        channel: "whatsapp" as const,
        message: "Final offer: $3,200 for Dallas to Phoenix shipment",
      },
    ],
  },
];

const CarrierPanel = () => {
  const [selectedCarrier, setSelectedCarrier] = useState<typeof mockRejectedCarriers[0] | null>(null);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {mockRejectedCarriers.map((carrier) => (
          <div
            key={carrier.id}
            className="bg-card rounded-lg border-2 border-destructive/30 p-4 animate-fade-in hover:border-destructive/50 transition-colors cursor-pointer"
            onClick={() => setSelectedCarrier(carrier)}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{carrier.carrierName}</h3>
                <p className="text-xs text-muted-foreground">{carrier.shipmentId}</p>
              </div>
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                {carrier.rejectionCount}
              </Badge>
            </div>

            <Button className="w-full" variant="destructive" size="sm" onClick={(e) => {
              e.stopPropagation();
              // Handle assign operator
            }}>
              <UserCog className="w-3 h-3 mr-2" />
              Assign Human Operator
            </Button>
          </div>
        ))}
      </div>

      {/* Detailed Dialog */}
      <Dialog open={!!selectedCarrier} onOpenChange={(open) => !open && setSelectedCarrier(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              {selectedCarrier?.carrierName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCarrier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Carrier ID:</span>
                  <p className="font-medium">{selectedCarrier.carrierId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Shipment ID:</span>
                  <p className="font-medium">{selectedCarrier.shipmentId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Rejections:</span>
                  <p className="font-medium text-destructive">{selectedCarrier.rejectionCount}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Communication History</h4>
                {selectedCarrier.communicationAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                  >
                    <div className="p-2 bg-background rounded-md border border-border">
                      {getChannelIcon(attempt.channel)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium capitalize">{attempt.channel}</span>
                        <span className="text-xs text-muted-foreground">{attempt.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{attempt.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarrierPanel;
