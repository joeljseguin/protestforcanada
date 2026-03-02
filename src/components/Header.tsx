import { Button } from "@/components/ui/button";
import { Swords, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const navItems = [
  { label: "⚔ Missions", href: "/" },
  { label: "🗺 Power Map", href: "/power-map" },
  { label: "📜 Quest", href: "/quest" },
  { label: "📖 Truth Vault", href: "/truth-vault" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 ff-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        {/* Top bar */}
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 font-heading text-sm tracking-tight uppercase text-accent">
            <div className="w-10 h-10 ff-panel flex items-center justify-center shrink-0">
              <Swords className="h-5 w-5 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-accent text-xs">PROTEST</span>
              <span className="text-[8px] text-muted-foreground font-body">v3.5 — CIVIC RPG</span>
            </div>
          </Link>

          <div className="hidden lg:flex flex-col ml-4 border-l border-border/40 pl-4">
            <span className="font-heading text-[7px] uppercase tracking-wider text-primary leading-relaxed">The humanitarian quest game</span>
            <span className="font-body text-xs text-muted-foreground leading-tight">Win XP by taking action!</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user && profile ? (
              <div className="flex items-center gap-3">
                <div className="ff-panel px-3 py-1.5 flex items-center gap-2">
                  <span className="font-body text-xs text-accent">LV.{Math.floor(profile.total_xp / 100) + 1}</span>
                  <span className="font-body text-xs text-foreground">{profile.display_name || 'Hero'}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={signOut}
                  className="font-body text-xs h-8 uppercase tracking-wider"
                >
                  Escape
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => setAuthOpen(true)}
                className="font-heading text-[8px] h-9 uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent/80 px-4"
              >
                ▶ Join Party
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2 ff-panel"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation — FF4 command menu style */}
        <nav className="hidden md:block border-t border-border/30">
          <div className="container flex items-center gap-0">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-6 py-3 text-sm font-body uppercase tracking-wider transition-all text-center flex-1
                  ${i < navItems.length - 1 ? "border-r border-border/20" : ""}
                  ${
                    location.pathname === item.href
                      ? "bg-primary/20 text-primary font-bold"
                      : "hover:bg-secondary text-foreground/70 hover:text-foreground"
                  }`}
              >
                {location.pathname === item.href && <span className="mr-1">▶</span>}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/30">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-4 text-sm font-body uppercase tracking-wider border-b border-border/20 transition-colors
                  ${location.pathname === item.href ? "bg-primary/20 text-primary" : "hover:bg-secondary"}`}
              >
                {location.pathname === item.href && <span className="mr-2">▶</span>}
                {item.label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-6 py-4 text-sm font-body uppercase tracking-wider bg-accent/20 text-accent"
              >
                ▶ Join Party
              </button>
            )}
          </div>
        )}
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};
