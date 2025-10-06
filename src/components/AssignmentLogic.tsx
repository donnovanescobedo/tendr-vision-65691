import { TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssignmentLogicProps {
  criteria: "percentage" | "cost";
  onCriteriaChange: (criteria: "percentage" | "cost") => void;
}

const AssignmentLogic = ({ criteria, onCriteriaChange }: AssignmentLogicProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-4">Assignment Logic Control</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => onCriteriaChange("percentage")}
          className={`flex-1 p-6 rounded-lg border-2 transition-all ${
            criteria === "percentage"
              ? "border-primary bg-primary/5 shadow-lg"
              : "border-border hover:border-primary/30"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-3 rounded-lg ${
              criteria === "percentage" ? "bg-primary" : "bg-muted"
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                criteria === "percentage" ? "text-primary-foreground" : "text-muted-foreground"
              }`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Highest Assignment %</h3>
          </div>
          <p className="text-sm text-muted-foreground text-left">
            Prioritize carriers with the highest success rate and assignment percentage
          </p>
          {criteria === "percentage" && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm font-medium text-primary">✓ Currently Active</div>
            </div>
          )}
        </button>

        <button
          onClick={() => onCriteriaChange("cost")}
          className={`flex-1 p-6 rounded-lg border-2 transition-all ${
            criteria === "cost"
              ? "border-primary bg-primary/5 shadow-lg"
              : "border-border hover:border-primary/30"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-3 rounded-lg ${
              criteria === "cost" ? "bg-primary" : "bg-muted"
            }`}>
              <DollarSign className={`w-6 h-6 ${
                criteria === "cost" ? "text-primary-foreground" : "text-muted-foreground"
              }`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Lowest Cost</h3>
          </div>
          <p className="text-sm text-muted-foreground text-left">
            Select carriers offering the most competitive pricing for maximum savings
          </p>
          {criteria === "cost" && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm font-medium text-primary">✓ Currently Active</div>
            </div>
          )}
        </button>
      </div>

      <div className="mt-6">
        <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
          Apply & Reassign All
        </Button>
      </div>
    </div>
  );
};

export default AssignmentLogic;
