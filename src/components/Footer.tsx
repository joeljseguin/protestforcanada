import { dataSources } from "@/data/mockData";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <a href="#" className="flex items-center gap-2 font-heading font-bold text-lg mb-3">
              <Shield className="h-5 w-5 text-civic-red" />
              Protest
            </a>
            <p className="text-sm opacity-60 max-w-xs">
              Canadian civic engagement platform. Powered by open data from the Government of Canada.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-60">Data Sources</h4>
            <ul className="space-y-1.5 text-sm opacity-70">
              {Object.values(dataSources).map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider opacity-60">Platform</h4>
            <ul className="space-y-1.5 text-sm opacity-70">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs opacity-50">
          © 2026 Protest. Open source civic technology.
        </div>
      </div>
    </footer>
  );
};
