import { Button } from "@/components/ui/button";
import { ArrowDown, AlertTriangle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden scanline" style={{ background: "hsl(220 15% 6%)" }}>
      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 text-accent px-3 py-1 rounded text-xs font-mono uppercase tracking-wider mb-6 animate-fade-in">
            <AlertTriangle className="h-3 w-3 animate-pulse" />
            3 Active Crisis Missions
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Follow the money,
            <br />
            <span className="text-gradient-neon">hold power accountable.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed font-mono animate-fade-in" style={{ animationDelay: "200ms" }}>
            Interactive accountability mapping. Verified data from StatsCan, Project Ploughshares, and Open Government Canada.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="font-mono uppercase tracking-wider text-xs h-11">
              <a href="#public-oversight">Explore Public Oversight</a>
            </Button>
            <Button size="lg" variant="outline" className="font-mono uppercase tracking-wider text-xs h-11 border-border hover:border-foreground/30">
              <a href="#missions">View Missions</a>
            </Button>
          </div>
        </div>
        <a href="#public-oversight" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hover:opacity-100 transition-opacity">
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};
