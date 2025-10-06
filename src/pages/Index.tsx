import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ShipmentDashboard from "@/components/ShipmentDashboard";
import ExcelUpload from "@/components/ExcelUpload";
import CarrierPanel from "@/components/CarrierPanel";
import AssignmentLogic from "@/components/AssignmentLogic";
import IntegrationStatus from "@/components/IntegrationStatus";
import MapboxMap from "@/components/MapboxMap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin } from "lucide-react";

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
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Shipment Tracking</h2>
            </div>
            <p className="text-muted-foreground mt-1">Real-time route visualization across Mexico</p>
          </div>
          
          <div className="p-6">
            <Alert className="mb-4">
              <MapPin className="h-4 w-4" />
              <AlertTitle>Mapbox Token Required</AlertTitle>
              <AlertDescription>
                To use the interactive map, please add your Mapbox public token. Get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> and update it in MapboxMap.tsx
              </AlertDescription>
            </Alert>
            <MapboxMap />
          </div>
        </div>

        {/* Carrier Communication Panel (Escalation) */}
        <CarrierPanel />

        {/* Integration Status */}
        <IntegrationStatus />
      </main>
    </div>
  );
};

export default Index;
