import { Swords } from "lucide-react";
import { Link } from "react-router-dom";

const sources = [
  "GC InfoBase — Treasury Board of Canada Secretariat",
  "Project Ploughshares — Military Export Reports",
  "Indigenous Services Canada — Water Advisories",
  "StatsCan — Food Insecurity Data",
  "LEGISinfo — Parliament of Canada",
  "Office of the Commissioner of Lobbying",
];

export const Footer = () => {
  return (
    <footer className="border-t-[3px] border-foreground py-12 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-lg mb-3 uppercase">
              <div className="w-7 h-7 neu-border flex items-center justify-center bg-foreground">
                <Swords className="h-3.5 w-3.5 text-background" />
              </div>
              PROTEST v3
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs font-mono leading-relaxed">
              Canadian civic accountability platform. All statistics verified against open government data sources.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold mb-3">Verified Data Sources</h4>
            <ul className="space-y-1">
              {sources.map((s) => (
                <li key={s} className="text-xs text-muted-foreground font-mono">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold mb-3">Navigate</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="text-xs font-mono text-muted-foreground hover:text-foreground">Missions</Link></li>
              <li><Link to="/power-map" className="text-xs font-mono text-muted-foreground hover:text-foreground">Power Map</Link></li>
              <li><Link to="/quest" className="text-xs font-mono text-muted-foreground hover:text-foreground">Quest</Link></li>
              <li><Link to="/truth-vault" className="text-xs font-mono text-muted-foreground hover:text-foreground">Truth Vault</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t-[3px] border-foreground text-center text-xs font-mono text-muted-foreground">
          © 2026 PROTEST · Open source civic technology · All data from open.canada.ca, statcan.gc.ca, ploughshares.ca
        </div>
      </div>
    </footer>
  );
};
