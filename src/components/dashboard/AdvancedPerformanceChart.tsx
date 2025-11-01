import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

const tradeData = [
  { 
    time: '00:00', 
    pnl: 0, 
    emotional: 50, 
    volume: 1200,
    timestamp: '08:00-08:15',
    trades: 0,
    token: '-',
    emotion: 'Neutral',
    emotionScore: 50
  },
  { 
    time: '04:00', 
    pnl: -150, 
    emotional: 35, 
    volume: 800,
    timestamp: '04:00-04:15',
    trades: 3,
    token: 'BTC',
    emotion: 'Fear',
    emotionScore: 35
  },
  { 
    time: '08:00', 
    pnl: 200, 
    emotional: 75, 
    volume: 2100,
    timestamp: '08:00-08:15',
    trades: 5,
    token: '$PEPE',
    emotion: 'FOMO',
    emotionScore: 76
  },
  { 
    time: '12:00', 
    pnl: 343, 
    emotional: 65, 
    volume: 1800,
    timestamp: '12:00-12:15',
    trades: 7,
    token: 'ETH',
    emotion: 'Confident',
    emotionScore: 65
  },
  { 
    time: '16:00', 
    pnl: 280, 
    emotional: 45, 
    volume: 1500,
    timestamp: '16:00-16:15',
    trades: 4,
    token: 'SOL',
    emotion: 'Anxious',
    emotionScore: 45
  },
  { 
    time: '20:00', 
    pnl: 343, 
    emotional: 60, 
    volume: 1900,
    timestamp: '20:00-20:15',
    trades: 6,
    token: '$SPEPE',
    emotion: 'Neutral',
    emotionScore: 60
  },
];

// Custom dot component for trade markers
const CustomDot = (props: any) => {
  const { cx, cy, payload, onHover } = props;
  
  if (!payload || payload.trades === 0) return null;
  
  // Enhanced color coding based on PNL
  let fill = 'hsl(142 76% 50%)'; // success (bright green)
  let glow = '0 0 20px hsl(142 76% 50% / 0.8), 0 0 40px hsl(142 76% 50% / 0.4)';
  let innerFill = 'hsl(142 100% 90%)';
  
  if (payload.pnl < 0) {
    // Losses - RED with strong glow
    fill = 'hsl(0 84% 60%)'; // bright red
    glow = '0 0 20px hsl(0 84% 60% / 0.8), 0 0 40px hsl(0 84% 60% / 0.4)';
    innerFill = 'hsl(0 100% 95%)';
  } else if (payload.pnl < 150) {
    // Small gains - YELLOW/AMBER with moderate glow
    fill = 'hsl(45 100% 60%)'; // bright yellow
    glow = '0 0 20px hsl(45 100% 60% / 0.8), 0 0 40px hsl(45 100% 60% / 0.4)';
    innerFill = 'hsl(45 100% 95%)';
  }
  
  return (
    <g>
      {/* Outer glow ring */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={10} 
        fill={fill}
        opacity={0.15}
        style={{ 
          filter: `blur(4px)`,
          cursor: 'pointer'
        }}
      />
      {/* Main dot */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={7} 
        fill={fill}
        stroke="hsl(var(--background))"
        strokeWidth={2.5}
        style={{ 
          filter: `drop-shadow(${glow})`,
          cursor: 'pointer'
        }}
        onMouseEnter={() => onHover?.(payload)}
        onMouseLeave={() => onHover?.(null)}
      />
      {/* Inner highlight */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={3.5} 
        fill={innerFill}
        opacity={0.9}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover?.(payload)}
        onMouseLeave={() => onHover?.(null)}
      />
    </g>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;
  
  const data = payload[0].payload;
  if (data.trades === 0) return null;
  
  const isPositive = data.pnl >= 0;
  
  return (
    <div className="glass-card-elevated border border-primary/30 rounded-lg p-3 min-w-[200px]">
      <div className="space-y-1 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-primary/20">
          <span className="text-muted-foreground">TimeStamp:</span>
          <span className="text-primary font-medium">{data.timestamp}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Trades:</span>
          <span className="text-foreground font-semibold">{data.trades}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Dominant Token:</span>
          <span className="text-primary font-semibold">{data.token}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Avg Emotion:</span>
          <span className="text-accent font-semibold">{data.emotion} ({data.emotionScore})</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-primary/20">
          <span className="text-muted-foreground">PnL:</span>
          <span className={`font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{data.pnl < 0 ? data.pnl : `$${data.pnl}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export function AdvancedPerformanceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  
  const currentPnL = 343.50;
  const dailyChange = 12.5;
  const isPositive = currentPnL > 0;

  const periods = [
    { label: '1 D', value: '1D' },
    { label: '1 W', value: '1W' },
    { label: '1 M', value: '1M' },
  ];

  return (
    <Card className="glass-card-elevated border-primary/20 p-3 md:p-4 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary glow-primary" />
          <h3 className="text-sm md:text-base font-bold tracking-wide text-primary">PERFORMANCE ANALYSIS</h3>
        </div>
        <div className="text-right">
          <p className="text-lg md:text-xl font-bold text-success glow-success">
            {isPositive ? '+' : ''}{currentPnL} USDT
          </p>
          <div className="flex items-center justify-end gap-1 text-xs">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-success" />
            ) : (
              <TrendingDown className="w-3 h-3 text-destructive" />
            )}
            <span className={isPositive ? 'text-success' : 'text-destructive'}>
              {dailyChange}% today
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-xs md:text-sm font-medium text-foreground">PNL Over Time</h4>
            <div className="flex gap-1.5">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  variant="ghost"
                  size="sm"
                  className={`text-[10px] md:text-xs px-2 py-1 h-6 rounded-lg transition-all ${
                    selectedPeriod === period.value
                      ? 'gradient-primary text-white glow-primary'
                      : 'glass-card border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40'
                  }`}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 min-h-0 h-[45vh]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tradeData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(210 100% 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(210 100% 60%)" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--primary))" 
                opacity={0.08}
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                dy={8}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                dx={-5}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone" 
                dataKey="pnl" 
                stroke="hsl(210 100% 60%)" 
                strokeWidth={2}
                fill="url(#pnlGradient)" 
                dot={(props) => <CustomDot {...props} onHover={setHoveredPoint} />}
                activeDot={{ r: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
