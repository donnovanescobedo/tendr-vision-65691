import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ShipmentDashboard from "@/components/ShipmentDashboard";
import ExcelUpload from "@/components/ExcelUpload";
import CarrierPanel from "@/components/CarrierPanel";
import AssignmentLogic from "@/components/AssignmentLogic";
import IntegrationStatus from "@/components/IntegrationStatus";
import InteractiveMap from "@/components/InteractiveMap";

const Index = () => {
  const [assignmentCriteria, setAssignmentCriteria] = useState<"percentage" | "cost">("percentage");

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="text-3xl font-bold text-primary">247</div>
            <div className="text-sm text-muted-foreground mt-1">Total Shipments</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="text-3xl font-bold text-success">189</div>
            <div className="text-sm text-muted-foreground mt-1">Accepted</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="text-3xl font-bold text-warning">42</div>
            <div className="text-sm text-muted-foreground mt-1">Pending</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="text-3xl font-bold text-destructive">16</div>
            <div className="text-sm text-muted-foreground mt-1">Rejected</div>
          </div>
        </div>

        {/* Assignment Logic Control */}
        <AssignmentLogic 
          criteria={assignmentCriteria}
          onCriteriaChange={setAssignmentCriteria}
        />

        {/* Excel Upload Section */}
        <ExcelUpload />

        {/* Shipment Dashboard */}
        <ShipmentDashboard assignmentCriteria={assignmentCriteria} />

        {/* Interactive Mexico Map */}
        <InteractiveMap />

        {/* Carrier Communication Panel (Escalation) */}
        <CarrierPanel />

        {/* Integration Status */}
        <IntegrationStatus />
      </main>
    </div>
  );
};

export default Index;
