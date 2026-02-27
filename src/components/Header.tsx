import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Public Oversight", href: "#public-oversight" },
  { label: "Missions", href: "#missions" },
  { label: "Take Action", href: "#action" },
  { label: "Topics", href: "#topics" },
  { label: "Oversight", href: "#oversight" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/90">
      <div className="container flex items-center justify-between h-14">
        <a href="#" className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight">
          <Shield className="h-5 w-5 text-accent" />
          <span>PROTEST</span>
          <span className="text-[9px] font-mono text-muted-foreground ml-1 tracking-widest">v2.0</span>
        </a>
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground rounded transition-colors hover:text-foreground hover:bg-secondary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button size="sm" className="font-mono text-xs h-8">
            Sign In
          </Button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-border pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
