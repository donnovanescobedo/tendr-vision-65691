import { useState, useEffect } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, Brain, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ExcelUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(72);
  const [fileName, setFileName] = useState("logistics_data_oct_2024.xlsx");
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          setIsProcessing(false);
          return 100;
        }
        return Math.min(prev + Math.random() * 3, 100);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="relative overflow-hidden p-5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileSpreadsheet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-lg">{fileName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Syncing with AI Engine
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-success" />
                        Sync Complete
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{Math.round(uploadProgress)}%</span>
              </div>
            </div>

            {/* Animated AI Processing Icons */}
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <div className="p-3 bg-accent/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-5 h-5 text-accent" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Carrier Response Rate</span>
                <span className="font-bold text-foreground">{Math.round(uploadProgress)}% Complete</span>
              </div>
              <div className="relative">
                <Progress value={uploadProgress} className="h-4" />
                <div 
                  className="absolute top-0 left-0 h-4 bg-gradient-primary rounded-full transition-all duration-500 opacity-50 blur-sm"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
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
