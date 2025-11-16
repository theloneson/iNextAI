import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isWalletConnected?: boolean;
  onConnectWallet?: () => void;
}

export function DashboardLayout({ children, isWalletConnected = false, onConnectWallet }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Journal", path: "/journal" },
    { label: "Simulator", path: "/trading-new" },
    { label: "Market", path: "/market" },
    { label: "Copilot", path: "/copilot" },
    { label: "Portfolio", path: "/portfolio" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <header className="h-14 glass-card border-b border-primary/20 flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-primary">
            <span className="text-white font-bold text-sm">iN</span>
          </div>
          <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">iNext AI</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-primary/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isWalletConnected ? (
            <>
              <div className="glass-card px-3 py-1.5 rounded-lg border border-primary/20">
                <div className="text-xs font-medium text-muted-foreground">SPOTS</div>
              </div>
              <div className="glass-card px-3 py-1.5 rounded-lg border border-success/30">
                <div className="text-xs font-medium text-muted-foreground">Todays PNL</div>
                <div className="text-sm font-bold text-success">+200%</div>
              </div>
              <div className="w-9 h-9 gradient-primary rounded-full glow-primary flex items-center justify-center cursor-pointer">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
            </>
          ) : (
            <Button
              onClick={onConnectWallet}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
            >
              Connect Wallet
            </Button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
    </div>
  );
}