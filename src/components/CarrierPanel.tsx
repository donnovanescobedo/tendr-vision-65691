import { useState } from "react";
import { MessageSquare, Mail, Phone, AlertTriangle, UserCog, Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

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
    <div className="bg-gradient-to-br from-card via-card to-destructive/5 rounded-2xl border-2 border-destructive/20 shadow-xl overflow-hidden animate-fade-in">
      <div className="p-8 border-b border-destructive/20 bg-gradient-to-r from-destructive/5 via-destructive/10 to-destructive/5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Carriers Needing Your Attention</h2>
            </div>
            <div className="flex items-start gap-3 bg-card/50 rounded-lg p-4 border border-border/50">
              <Bot className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI tried reaching these carriers multiple times through phone, WhatsApp, and email, but they keep rejecting shipments. 
                <span className="font-semibold text-foreground"> Time for a human touch!</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge className="bg-destructive text-destructive-foreground border-0 text-2xl px-6 py-3 shadow-lg">
              {mockRejectedCarriers.length}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">Carriers Waiting</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRejectedCarriers.map((carrier, index) => (
            <Card
              key={carrier.id}
              className="group relative overflow-hidden border-2 border-destructive/30 hover:border-destructive/60 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card"
              onClick={() => setSelectedCarrier(carrier)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Status indicator */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 rounded-bl-full" />
              
              <div className="p-6 relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground mb-1 truncate">{carrier.carrierName}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{carrier.shipmentId}</span>
                      <span>•</span>
                      <span className="font-mono">{carrier.carrierId}</span>
                    </div>
                  </div>
                  <Badge className="bg-destructive text-destructive-foreground border-0 text-base px-3 py-1 shadow-md">
                    {carrier.rejectionCount}x
                  </Badge>
                </div>

                {/* AI Attempts Summary */}
                <div className="bg-muted/30 rounded-lg p-3 mb-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">AI Contact Attempts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {carrier.communicationAttempts.map((attempt, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        {getChannelIcon(attempt.channel)}
                        <span className="text-xs text-muted-foreground capitalize">{attempt.channel}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
                  variant="outline" 
                  size="default"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle assign operator
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Take Over This Case
                </Button>
              </div>
            </Card>
          ))}
        </div>
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
