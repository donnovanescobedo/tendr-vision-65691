import { Database, RefreshCw, CheckCircle, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const IntegrationStatus = () => {
  const integrations = [
    {
      name: "Excel Upload",
      icon: FileSpreadsheet,
      status: "synced" as const,
      lastSync: "2 mins ago",
      records: 247,
    },
    {
      name: "Oracle OTM",
      icon: Database,
      status: "syncing" as const,
      lastSync: "In progress",
      records: 189,
    },
    {
      name: "SAP ERP",
      icon: Database,
      status: "synced" as const,
      lastSync: "5 mins ago",
      records: 247,
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">OTM & SAP Integration</h2>
        <p className="text-muted-foreground mt-1">Real-time data synchronization status</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <integration.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{integration.name}</h3>
                </div>
                {integration.status === "synced" ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <RefreshCw className="w-5 h-5 text-primary animate-spin" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    className={
                      integration.status === "synced"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {integration.status === "synced" ? "Synced" : "Syncing"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Sync</span>
                  <span className="font-medium text-foreground">{integration.lastSync}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Records</span>
                  <span className="font-medium text-foreground">{integration.records}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sync Logs */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-semibold text-sm mb-3 text-foreground">Recent Sync Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">✓ Excel data imported to OTM</span>
              <span className="text-muted-foreground">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">✓ Carrier assignments synced to SAP</span>
              <span className="text-muted-foreground">5 mins ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">✓ Cost data updated in all systems</span>
              <span className="text-muted-foreground">8 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;
