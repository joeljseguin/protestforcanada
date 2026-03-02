import { Button } from "@/components/ui/button";
import { Swords, Menu, X } from "lucide-react";
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
      <header className="sticky top-0 z-50 bg-background border-b-[3px] border-foreground">
        {/* Top bar: logo + version + CTA */}
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3 font-heading font-extrabold text-2xl tracking-tight uppercase">
            <div className="w-10 h-10 bg-foreground flex items-center justify-center">
              <Swords className="h-5 w-5 text-background" />
            </div>
            <span>PROTEST</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-[9px] font-mono text-muted-foreground tracking-widest border border-muted-foreground/30 px-2 py-0.5">
              v3.5
            </span>
            {user && profile ? (
              <Button
                size="sm"
                variant="outline"
                onClick={signOut}
                className="font-mono text-xs h-8 uppercase tracking-wider border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setAuthOpen(true)}
                className="font-mono text-xs h-8 uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 border-2 border-foreground neu-shadow-sm transition-all"
              >
                Join the Resistance
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2 border-2 border-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation bar */}
        <nav className="hidden md:block border-t-[3px] border-foreground bg-muted/40">
          <div className="container flex items-center gap-0">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-6 py-2.5 text-xs font-mono uppercase tracking-widest transition-all text-center flex-1
                  ${i < navItems.length - 1 ? "border-r-[3px] border-foreground" : ""}
                  ${
                    location.pathname === item.href
                      ? "bg-foreground text-background font-bold"
                      : "hover:bg-foreground/5"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t-[3px] border-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3.5 text-sm font-mono uppercase tracking-wider border-b border-foreground/20 transition-colors
                  ${location.pathname === item.href ? "bg-foreground text-background font-bold" : "hover:bg-muted"}`}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-6 py-3.5 text-sm font-mono uppercase tracking-wider bg-foreground text-background"
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
