import { Button } from "@/components/ui/button";
import { Swords, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const navItems = [
  { label: "Missions", href: "/" },
  { label: "Power Map", href: "/power-map" },
  { label: "Quest", href: "/quest" },
  { label: "Truth Vault", href: "/truth-vault" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 neu-border border-t-0 border-x-0 bg-background">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 font-heading font-extrabold text-3xl tracking-tight uppercase">
            <div className="w-14 h-14 neu-border flex items-center justify-center bg-foreground">
              <Swords className="h-7 w-7 text-background" />
            </div>
            <span>PROTEST</span>
          </Link>
          <span className="text-[9px] font-mono text-muted-foreground tracking-widest neu-border px-1.5 py-0.5">v3.5</span>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider neu-border transition-all hover:bg-foreground hover:text-background min-w-[120px] text-center ${
                  location.pathname === item.href ? "bg-foreground text-background" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {user && profile ? (
              <Button size="sm" variant="outline" onClick={signOut} className="font-mono text-xs h-8 neu-border uppercase tracking-wider">
                Sign Out
              </Button>
            ) : (
              <Button size="sm" onClick={() => setAuthOpen(true)} className="font-mono text-xs h-8 neu-border neu-shadow-sm uppercase tracking-wider">
                Join the Resistance
              </Button>
            )}
          </div>
          <button className="md:hidden p-2 neu-border" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t-[3px] border-foreground pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm font-mono uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-6 py-3 text-sm font-mono uppercase tracking-wider bg-foreground text-background"
              >
                Join the Resistance
              </button>
            )}
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};
