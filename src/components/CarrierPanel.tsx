import { MessageSquare, Mail, Phone, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockCarrierMessages = [
  {
    id: 1,
    carrier: "Swift Transport",
    shipmentId: "SH-2024-001",
    channel: "whatsapp" as const,
    message: "Shipment SH-2024-001: Origin: Chicago, IL → Destination: New York, NY. Loading time: 2.5 hrs. Can you handle this?",
    status: "accepted" as const,
    responseTime: "2 mins ago",
  },
  {
    id: 2,
    carrier: "Cold Chain Logistics",
    shipmentId: "SH-2024-002",
    channel: "email" as const,
    message: "Reefer shipment available. Origin: Miami, FL → Destination: Boston, MA. Loading: 3.0 hrs. Rate: $3,200",
    status: "pending" as const,
    responseTime: "Sent 15 mins ago",
    retryIn: "5 mins",
  },
  {
    id: 3,
    carrier: "Heavy Haul Pro",
    shipmentId: "SH-2024-004",
    channel: "phone" as const,
    message: "Flatbed required. Origin: Houston, TX → Destination: Denver, CO. 4 hrs loading time.",
    status: "rejected" as const,
    responseTime: "8 mins ago",
    reason: "Equipment unavailable",
  },
];

const CarrierPanel = () => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Carrier Communication Panel</h2>
            <p className="text-muted-foreground mt-1">Automated messaging and response tracking</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            Send Bulk Messages
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {mockCarrierMessages.map((msg) => (
          <div
            key={msg.id}
            className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow bg-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {getChannelIcon(msg.channel)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{msg.carrier}</h3>
                  <p className="text-sm text-muted-foreground">Shipment: {msg.shipmentId}</p>
                </div>
              </div>
              {getStatusBadge(msg.status)}
            </div>

            <div className="bg-muted/30 p-4 rounded-lg mb-3">
              <p className="text-sm text-foreground">{msg.message}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{msg.responseTime}</span>
              <div className="flex items-center gap-2">
                {msg.status === "pending" && msg.retryIn && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-warning">Retry in {msg.retryIn}</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Send Reminder
                    </Button>
                  </div>
                )}
                {msg.status === "rejected" && msg.reason && (
                  <span className="text-xs text-destructive">Reason: {msg.reason}</span>
                )}
                {msg.status === "accepted" && (
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarrierPanel;
