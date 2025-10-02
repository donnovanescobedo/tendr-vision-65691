import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface ShipmentDashboardProps {
  assignmentCriteria: "percentage" | "cost";
}

const mockShipments = [
  {
    id: "SH-2024-001",
    deliveryDate: "2024-10-15",
    equipmentType: "53ft Dry Van",
    loadingTime: "2.5 hrs",
    carrierId: "C-1247",
    carrierName: "Swift Transport",
    cost: 2450,
    assignmentPercentage: 92,
    status: "accepted" as const,
  },
  {
    id: "SH-2024-002",
    deliveryDate: "2024-10-16",
    equipmentType: "48ft Reefer",
    loadingTime: "3.0 hrs",
    carrierId: "C-8932",
    carrierName: "Cold Chain Logistics",
    cost: 3200,
    assignmentPercentage: 88,
    status: "pending" as const,
  },
  {
    id: "SH-2024-003",
    deliveryDate: "2024-10-15",
    equipmentType: "53ft Dry Van",
    loadingTime: "2.0 hrs",
    carrierId: "C-4521",
    carrierName: "FastLine Freight",
    cost: 2100,
    assignmentPercentage: 95,
    status: "accepted" as const,
  },
  {
    id: "SH-2024-004",
    deliveryDate: "2024-10-17",
    equipmentType: "Flatbed 48ft",
    loadingTime: "4.0 hrs",
    carrierId: "C-6789",
    carrierName: "Heavy Haul Pro",
    cost: 4500,
    assignmentPercentage: 78,
    status: "rejected" as const,
  },
  {
    id: "SH-2024-005",
    deliveryDate: "2024-10-16",
    equipmentType: "53ft Dry Van",
    loadingTime: "2.5 hrs",
    carrierId: "C-3344",
    carrierName: "Express Route Inc",
    cost: 2300,
    assignmentPercentage: 90,
    status: "pending" as const,
  },
];

const ShipmentDashboard = ({ assignmentCriteria }: ShipmentDashboardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getOptimalIndicator = (shipment: typeof mockShipments[0]) => {
    const isOptimal = assignmentCriteria === "percentage" 
      ? shipment.assignmentPercentage >= 90 
      : shipment.cost <= 2500;
    
    return isOptimal ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-muted-foreground" />
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Shipment Dashboard</h2>
        <p className="text-muted-foreground mt-1">Track and manage all shipments in real-time</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Shipment ID</TableHead>
              <TableHead className="font-semibold">Delivery Date</TableHead>
              <TableHead className="font-semibold">Equipment Type</TableHead>
              <TableHead className="font-semibold">Loading Time</TableHead>
              <TableHead className="font-semibold">Carrier</TableHead>
              <TableHead className="font-semibold">Cost</TableHead>
              <TableHead className="font-semibold">Assignment %</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Optimal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShipments.map((shipment) => (
              <TableRow key={shipment.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium text-primary">{shipment.id}</TableCell>
                <TableCell>{shipment.deliveryDate}</TableCell>
                <TableCell>{shipment.equipmentType}</TableCell>
                <TableCell>{shipment.loadingTime}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{shipment.carrierName}</div>
                    <div className="text-sm text-muted-foreground">{shipment.carrierId}</div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">${shipment.cost.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${shipment.assignmentPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{shipment.assignmentPercentage}%</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                <TableCell>{getOptimalIndicator(shipment)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShipmentDashboard;
