import { Shield } from "lucide-react";

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
    <footer className="border-t border-border py-12 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <a href="#" className="flex items-center gap-2 font-heading font-bold text-lg mb-3">
              <Shield className="h-5 w-5 text-accent" />
              PROTEST
            </a>
            <p className="text-xs text-muted-foreground max-w-xs font-mono leading-relaxed">
              Canadian civic accountability platform. All statistics verified against open government data sources.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Verified Data Sources</h4>
            <ul className="space-y-1">
              {sources.map((s) => (
                <li key={s} className="text-xs text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-[10px] font-mono text-muted-foreground">
          © 2026 PROTEST · Open source civic technology · All data sourced from open.canada.ca, statcan.gc.ca, ploughshares.ca
        </div>
      </div>
    </footer>
  );
};
