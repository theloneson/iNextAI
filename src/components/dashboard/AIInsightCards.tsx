import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, AlertTriangle, TrendingUp, Lightbulb, Target, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

const insights = [
  {
    id: 1,
    type: "warning",
    title: "FOMO Pattern Detected",
    description: "You've made 3 quick trades after a loss. Consider taking a break to reset your emotional state.",
    confidence: 92,
    timeAgo: "2m ago",
    action: "Take Break",
    priority: "high"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Optimal Entry Window",
    description: "BTC showing strong support at $42,000. Your historical win rate at this level is 78%.",
    confidence: 85,
    timeAgo: "5m ago",
    action: "View Setup",
    priority: "medium"
  },
  {
    id: 3,
    type: "insight",
    title: "Emotional Correlation",
    description: "Your best trades happen when emotional score is between 60-75. Current: 65.",
    confidence: 89,
    timeAgo: "8m ago",
    action: "Learn More",
    priority: "low"
  },
  {
    id: 4,
    type: "strategy",
    title: "Risk Management Alert",
    description: "Current position size exceeds your typical 2% rule. Consider reducing exposure.",
    confidence: 94,
    timeAgo: "12m ago",
    action: "Adjust Size",
    priority: "high"
  }
];

export function AIInsightCards() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle;
      case "opportunity":
        return TrendingUp;
      case "insight":
        return Lightbulb;
      case "strategy":
        return Target;
      default:
        return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-warning bg-warning/10";
      case "opportunity":
        return "text-success bg-success/10";
      case "insight":
        return "text-primary bg-primary/10";
      case "strategy":
        return "text-accent bg-accent/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "low":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="glass-card border-primary/20 p-2.5 md:p-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs md:text-sm font-bold text-foreground flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          AI Insights
        </h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-[10px] h-6 px-1.5">
          View More
          <ChevronRight size={10} className="ml-0.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 -mr-1.5 pr-1.5">
        <div className="space-y-1.5">
          {insights.slice(0, 3).map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            const colorClass = getInsightColor(insight.type);
            const priorityColor = getPriorityColor(insight.priority);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-2 rounded-lg border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-1.5 mb-1">
                  <div className={`${colorClass} p-1 rounded-lg shrink-0`}>
                    <Icon size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <Badge variant="outline" className={`${priorityColor} text-[8px] font-bold px-1 py-0 h-4 uppercase`}>
                        {insight.priority}
                      </Badge>
                      <span className="text-[9px] text-muted-foreground shrink-0">
                        {insight.confidence}%
                      </span>
                    </div>
                    <h4 className="text-[10px] md:text-xs font-bold text-foreground mb-0.5 line-clamp-1">
                      {insight.title}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <div className="text-[9px] text-muted-foreground pl-6">{insight.timeAgo}</div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}