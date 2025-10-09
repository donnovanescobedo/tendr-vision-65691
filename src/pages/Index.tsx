import { useState } from "react";
import { TrendingUp, CheckCircle2, Clock, XCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ShipmentDashboard from "@/components/ShipmentDashboard";
import ExcelUpload from "@/components/ExcelUpload";
import CarrierPanel from "@/components/CarrierPanel";
import AssignmentLogic from "@/components/AssignmentLogic";
import IntegrationStatus from "@/components/IntegrationStatus";

const Index = () => {
  const [assignmentCriteria, setAssignmentCriteria] = useState<"percentage" | "cost">("percentage");

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
          <div className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">247</div>
            <div className="text-sm text-muted-foreground">Total Shipments</div>
          </div>
          
          <div className="group bg-card rounded-2xl p-6 border border-border hover:border-success/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">189</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </div>
          
          <div className="group bg-card rounded-2xl p-6 border border-border hover:border-warning/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-warning/10 rounded-lg group-hover:bg-warning/20 transition-colors">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">42</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          
          <div className="group bg-card rounded-2xl p-6 border border-border hover:border-destructive/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">16</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Core Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <AssignmentLogic 
              criteria={assignmentCriteria}
              onCriteriaChange={setAssignmentCriteria}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <ExcelUpload />
          </div>
        </div>

        {/* Shipment Dashboard */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <ShipmentDashboard assignmentCriteria={assignmentCriteria} />
        </div>

        {/* Carrier Communication */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CarrierPanel />
        </div>

        {/* System Status */}
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <IntegrationStatus />
        </div>
      </main>
    </div>
  );
};

export default Index;
