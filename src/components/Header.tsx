import { Button } from "@/components/ui/button";
import { Swords, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Missions", href: "/" },
  { label: "Power Map", href: "/power-map" },
  { label: "Quest", href: "/quest" },
  { label: "Truth Vault", href: "/truth-vault" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 neu-border border-t-0 border-x-0 bg-background">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-xl tracking-tight uppercase">
          <div className="w-8 h-8 neu-border flex items-center justify-center bg-foreground">
            <Swords className="h-4 w-4 text-background" />
          </div>
          <span>PROTEST</span>
          <span className="text-[9px] font-mono text-muted-foreground ml-1 tracking-widest neu-border px-1.5 py-0.5">v3</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider neu-border transition-all hover:bg-foreground hover:text-background ${
                location.pathname === item.href ? "bg-foreground text-background" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <div className="font-mono text-xs neu-border px-3 py-1.5 bg-secondary font-bold">
            🏆 0 XP
          </div>
          <Button size="sm" className="font-mono text-xs h-8 neu-border neu-shadow-sm uppercase tracking-wider">
            Sign In
          </Button>
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
        </div>
      )}
    </header>
  );
};
