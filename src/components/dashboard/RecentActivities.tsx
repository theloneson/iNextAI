import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Activity,
  ChevronRight,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";

export const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: "trade",
      title: "Profitable BTC Trade",
      description: "Executed BUY order with 85% confidence",
      time: "3 mins ago",
      icon: TrendingUp,
      color: "success",
      value: "+$245.50"
    },
    {
      id: 2,
      type: "emotion",
      title: "Emotion Alert",
      description: "FOMO detected during ETH volatility",
      time: "8 mins ago",
      icon: AlertTriangle,
      color: "warning",
      value: "High Risk"
    },
    {
      id: 3,
      type: "ai",
      title: "AI Insight Generated",
      description: "Market pattern recognition: Bullish divergence",
      time: "15 mins ago",
      icon: Brain,
      color: "primary",
      value: "87% Accuracy"
    },
    {
      id: 4,
      type: "goal",
      title: "Daily Goal Achieved",
      description: "Reached +2.5% profit target",
      time: "1 hour ago",
      icon: Target,
      color: "success",
      value: "Goal Met"
    },
    {
      id: 5,
      type: "trade",
      title: "Stop Loss Triggered",
      description: "SOL position closed automatically",
      time: "2 hours ago",
      icon: TrendingDown,
      color: "destructive",
      value: "-$89.30"
    },
    {
      id: 6,
      type: "milestone",
      title: "Milestone Reached",
      description: "Completed 50 simulated trades",
      time: "3 hours ago",
      icon: CheckCircle,
      color: "accent",
      value: "Achievement"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-success/10 text-success";
      case "destructive":
        return "bg-destructive/10 text-destructive";
      case "warning":
        return "bg-warning/10 text-warning";
      case "primary":
        return "bg-primary/10 text-primary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return TrendingUp;
      case "emotion":
        return AlertTriangle;
      case "ai":
        return Brain;
      case "goal":
        return Target;
      case "milestone":
        return CheckCircle;
      default:
        return Activity;
    }
  };

  return (
    <Card className="glass-card border-primary/20 p-2.5 md:p-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs md:text-sm font-bold text-foreground flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          Recent Activities
        </h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-[10px] h-6 px-1.5">
          View More
          <ChevronRight size={10} className="ml-0.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 -mr-1.5 pr-1.5">
        <div className="space-y-1.5">
          {activities.slice(0, 4).map((activity, index) => {
            const Icon = getIcon(activity.type);
            const colors = getColorClasses(activity.color);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-2 rounded-lg border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-1.5">
                  <div className={`${colors} p-1 rounded-lg shrink-0`}>
                    <Icon size={12} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5 mb-0.5">
                      <h4 className="text-[10px] md:text-xs font-semibold text-foreground truncate">
                        {activity.title}
                      </h4>
                      {activity.value && (
                        <span className={`text-[10px] font-bold shrink-0 ${
                          activity.value.startsWith('+') ? 'text-success' : 
                          activity.value.startsWith('-') ? 'text-destructive' : 
                          'text-foreground'
                        }`}>
                          {activity.value}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground line-clamp-1 mb-0.5">
                      {activity.description}
                    </p>
                    <span className="text-[9px] text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};