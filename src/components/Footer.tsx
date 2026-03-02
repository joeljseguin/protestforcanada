import { Swords } from "lucide-react";
import { Link } from "react-router-dom";

const sources = [
  "GC InfoBase — Treasury Board",
  "Project Ploughshares — Military Exports",
  "Indigenous Services — Water Advisories",
  "StatsCan — Food Insecurity",
  "LEGISinfo — Parliament",
  "Commissioner of Lobbying",
];

export const Footer = () => {
  return (
    <footer className="ff-panel py-10 mt-8" style={{ borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading text-[9px] mb-3 uppercase text-accent">
              <div className="w-7 h-7 ff-panel flex items-center justify-center">
                <Swords className="h-3.5 w-3.5 text-accent" />
              </div>
              PROTEST v3
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs font-body leading-relaxed">
              Canadian civic accountability platform. All stats verified against open government sources.
            </p>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-primary mb-3">📖 Data Sources</h4>
            <ul className="space-y-1">
              {sources.map((s) => (
                <li key={s} className="text-xs text-muted-foreground font-body">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-primary mb-3">⚔ Navigate</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-xs font-body text-muted-foreground hover:text-accent transition-colors">▶ Missions</Link></li>
              <li><Link to="/power-map" className="text-xs font-body text-muted-foreground hover:text-accent transition-colors">▶ Power Map</Link></li>
              <li><Link to="/quest" className="text-xs font-body text-muted-foreground hover:text-accent transition-colors">▶ Quest</Link></li>
              <li><Link to="/truth-vault" className="text-xs font-body text-muted-foreground hover:text-accent transition-colors">▶ Truth Vault</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 text-center text-xs font-body text-muted-foreground">
          © 2026 PROTEST · Open source civic technology · All data from open.canada.ca
        </div>
      </div>
    </footer>
  );
};
