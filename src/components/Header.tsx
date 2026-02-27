import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Topics", href: "#topics" },
  { label: "Accountability", href: "#accountability" },
  { label: "Action Hub", href: "#action" },
  { label: "Oversight", href: "#oversight" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-navy-light/20">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5 font-heading font-bold text-xl tracking-tight">
          <Shield className="h-6 w-6 text-civic-red" />
          Protest
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-navy-medium/60"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button size="sm" variant="secondary" className="font-semibold">
            Sign In
          </Button>
        </div>
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-navy-light/20 pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-medium hover:bg-navy-medium/60 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <Button size="sm" variant="secondary" className="w-full font-semibold">Sign In</Button>
          </div>
        </div>
      )}
    </header>
  );
};
