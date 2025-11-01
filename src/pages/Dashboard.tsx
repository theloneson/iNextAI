import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdvancedPerformanceChart } from '@/components/dashboard/AdvancedPerformanceChart';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { AIInsightCards } from '@/components/dashboard/AIInsightCards';
import { ConnectWalletDialog } from '@/components/dashboard/ConnectWalletDialog';
import { MoodWellnessDialog } from '@/components/dashboard/MoodWellnessDialog';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

const Index = () => {
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setShowWalletDialog(true);
  };

  const handleWalletConnected = () => {
    setIsWalletConnected(true);
    setShowWalletDialog(false);
    // Show mood dialog after wallet connection
    setTimeout(() => {
      setShowMoodDialog(true);
    }, 500);
  };

  return (
    <DashboardLayout 
      isWalletConnected={isWalletConnected} 
      onConnectWallet={handleWalletConnect}
    >
      {/* Responsive Grid - Performance full width, Recent Activities + AI Insights below */}
      <div className="w-full max-w-screen-2xl mx-auto h-[calc(100vh-140px)] overflow-hidden">
        <div className="flex flex-col gap-2 md:gap-3 h-full">
          
          {/* Top Row - Performance Chart + Metrics (Full Width) */}
          <div className="h-[55%] grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 min-h-0">
            {/* Performance Chart - 2/3 width */}
            <div className="lg:col-span-2 min-h-0">
              <AdvancedPerformanceChart />
            </div>
            
            {/* Performance Metrics - 1/3 width */}
            <div className="lg:col-span-1 min-h-0">
              <PerformanceMetrics />
            </div>
          </div>

          {/* Bottom Row - Recent Activities + AI Insights */}
          <div className="h-[43%] grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 min-h-0">
            <div className="min-h-0 overflow-hidden">
              <RecentActivities />
            </div>
            <div className="min-h-0 overflow-hidden">
              <AIInsightCards />
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConnectWalletDialog 
        open={showWalletDialog} 
        onOpenChange={setShowWalletDialog}
        onConnect={handleWalletConnected}
      />
      <MoodWellnessDialog open={showMoodDialog} onOpenChange={setShowMoodDialog} />
    </DashboardLayout>
  );
};

export default Index;
