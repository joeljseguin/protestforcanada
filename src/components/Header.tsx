import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
      <header className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-black text-lg uppercase tracking-tight">
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center text-xs font-black">
              X
            </div>
            <span>PROTEST</span>
            <span className="text-xs font-normal text-muted-foreground ml-1">V3</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {user && profile ? (
              <div className="flex items-center gap-3">
                <div className="border-2 border-foreground px-3 py-1 flex items-center gap-2 bg-accent">
                  <span className="text-sm font-bold">⚡ {profile.total_xp} XP</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={signOut}
                  className="font-bold text-xs h-8 uppercase tracking-wider rounded-none border-2 border-foreground"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="border-2 border-foreground px-3 py-1 flex items-center gap-2 bg-accent">
                  <span className="text-sm font-bold">⚡ 0 XP</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  className="font-bold text-xs h-8 uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 rounded-none border-2 border-foreground px-4"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t-2 border-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-4 text-sm font-bold uppercase tracking-wider border-b border-input transition-colors
                  ${location.pathname === item.href ? "bg-accent" : "hover:bg-secondary"}`}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider bg-foreground text-background"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};
