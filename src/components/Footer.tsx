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
    <footer className="border-t-2 border-foreground py-10 mt-8 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-black text-sm mb-3 uppercase">
              <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center text-[10px] font-black">
                X
              </div>
              PROTEST V3
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Canadian civic accountability platform. All stats verified against open government sources.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3">Data Sources</h4>
            <ul className="space-y-1">
              {sources.map((s) => (
                <li key={s} className="text-xs text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-3">Navigate</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Missions</Link></li>
              <li><Link to="/power-map" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Power Map</Link></li>
              <li><Link to="/quest" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Quest</Link></li>
              <li><Link to="/truth-vault" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Truth Vault</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-input text-center text-xs text-muted-foreground">
          © 2026 PROTEST · Open source civic technology · All data from open.canada.ca
        </div>
      </div>
    </footer>
  );
};
