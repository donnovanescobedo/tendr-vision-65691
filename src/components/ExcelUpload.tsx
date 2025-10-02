import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ExcelUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(72);
  const [fileName, setFileName] = useState("logistics_data_oct_2024.xlsx");

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Excel Upload & Sync</h2>
        <p className="text-muted-foreground mt-1">Upload and sync your shipment data in real-time</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Drop Excel file here</h3>
              <p className="text-sm text-muted-foreground">or click to browse (.xlsx, .xls)</p>
            </div>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Browse Files
            </Button>
          </div>
        </div>

        {/* Current File & Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">{fileName}</div>
                <div className="text-sm text-muted-foreground">Syncing with AI Engine</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary">{uploadProgress}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Carrier Response Rate</span>
              <span className="font-semibold text-foreground">{uploadProgress}% Complete</span>
            </div>
            <Progress value={uploadProgress} className="h-3" />
          </div>
        </div>

        {/* Live Preview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Processed</span>
            </div>
            <div className="text-2xl font-bold text-foreground">189 rows</div>
          </div>
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              <span className="text-sm font-medium text-warning">Processing</span>
            </div>
            <div className="text-2xl font-bold text-foreground">42 rows</div>
          </div>
          <div className="p-4 bg-muted/50 border border-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Remaining</span>
            </div>
            <div className="text-2xl font-bold text-foreground">16 rows</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;
