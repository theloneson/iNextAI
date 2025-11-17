import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Percent, Plus, BarChart3 } from "lucide-react";

export function PerformanceMetrics() {
  // Donut chart data
  const data = {
    profit: 60,
    loss: 30,
    breakEven: 10
  };
  
  const total = data.profit + data.loss + data.breakEven;
  const profitAngle = (data.profit / total) * 360;
  const lossAngle = (data.loss / total) * 360;
  const breakEvenAngle = (data.breakEven / total) * 360;

  const radius = 60;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <Card className="glass-card border-primary/20 p-3 md:p-4 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="mb-2 md:mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-xs md:text-sm font-bold text-foreground flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            Performance
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-xl md:text-2xl font-bold text-success">+343.6%</div>
          <Badge variant="outline" className="text-success border-success/30 text-[9px] px-1.5 py-0">
            Total PNL
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Best Trade</div>
          <div className="text-xs md:text-sm font-bold text-success">+86.6%</div>
        </div>
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Worst Trade</div>
          <div className="text-xs md:text-sm font-bold text-destructive">-26.6%</div>
        </div>
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Avg Trade</div>
          <div className="text-xs md:text-sm font-bold text-primary">+26.6%</div>
        </div>
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Win Rate</div>
          <div className="text-xs md:text-sm font-bold text-success">56.6%</div>
        </div>
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Degen Score</div>
          <div className="text-xs md:text-sm font-bold text-primary">71</div>
        </div>
        <div className="glass-card p-1.5 md:p-2 rounded-lg border border-primary/10">
          <div className="text-[9px] md:text-[10px] text-muted-foreground mb-0.5">Trades</div>
          <div className="text-xs md:text-sm font-bold text-foreground">20</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center justify-center flex-1 min-h-0">
        <svg width={radius * 2} height={radius * 2} className="w-20 h-20 md:w-24 md:h-24">
          <g transform={`translate(${radius}, ${radius}) rotate(-90)`}>
            {/* Profit segment */}
            <circle
              cx={0}
              cy={0}
              r={normalizedRadius}
              stroke="hsl(var(--success))"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${(profitAngle / 360) * circumference} ${circumference}`}
              strokeLinecap="round"
            />
            {/* Loss segment */}
            <circle
              cx={0}
              cy={0}
              r={normalizedRadius}
              stroke="hsl(var(--destructive))"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${(lossAngle / 360) * circumference} ${circumference}`}
              strokeDashoffset={-((profitAngle / 360) * circumference)}
              strokeLinecap="round"
            />
            {/* Break-even segment */}
            <circle
              cx={0}
              cy={0}
              r={normalizedRadius}
              stroke="hsl(var(--warning))"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${(breakEvenAngle / 360) * circumference} ${circumference}`}
              strokeDashoffset={-(((profitAngle + lossAngle) / 360) * circumference)}
              strokeLinecap="round"
            />
          </g>
        </svg>
        
        {/* Legend */}
        <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2 text-[9px] md:text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Profit</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
            <span className="text-muted-foreground">Loss</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Break-Even</span>
          </div>
        </div>
      </div>
    </Card>
  );
}