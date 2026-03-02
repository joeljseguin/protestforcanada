import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container relative">
        <div className="max-w-3xl">
          {/* Status window */}
          <div className="ff-panel px-4 py-2 inline-flex items-center gap-2 text-sm font-body uppercase tracking-wider mb-8 animate-fade-in">
            <span className="text-accent">⚔</span>
            <span className="text-primary">10 Active Missions</span>
          </div>

          <div className="relative">
            <h1 className="font-heading text-xl md:text-2xl lg:text-3xl tracking-tight leading-relaxed mb-6 animate-fade-in text-foreground" style={{ animationDelay: "100ms" }}>
              Follow the{" "}
              <span className="text-accent">money</span>,
              <br />
              hold{" "}
              <span className="inline-block ff-panel px-3 py-1 text-primary">power</span>
              {" "}accountable.
            </h1>
            <span
              className="block mt-2 md:mt-0 md:absolute md:-right-48 md:top-1/2 md:-translate-y-1/2 md:-rotate-3 font-mono italic text-lg md:text-xl animate-fade-in bg-gradient-to-b from-[hsl(45,100%,85%)] via-[hsl(45,100%,60%)] to-[hsl(30,80%,35%)] bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(45,100%,60%/0.4)]"
              style={{ animationDelay: "150ms" }}
            >
              The Game that
              <br />
              fixes democracy
            </span>
          </div>

          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed font-body animate-fade-in" style={{ animationDelay: "200ms" }}>
            Complete missions. Earn XP. Change Canada.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="font-heading text-[9px] h-12 uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent/80 px-6" asChild>
              <Link to="/quest">
                <Zap className="h-4 w-4 mr-2" />
                ▶ Start Quest
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-body text-sm h-12 uppercase tracking-wider px-6 border-border" asChild>
              <Link to="/power-map">
                🗺 Who Has Power?
              </Link>
            </Button>
          </div>
        </div>

        {/* XP reward panel — FF4 style */}
        <div className="absolute top-0 right-0 hidden lg:block animate-float">
          <div className="ff-panel p-6 text-center">
            <div className="text-2xl font-heading text-accent">+500</div>
            <div className="text-sm font-body uppercase tracking-wider mt-2 text-muted-foreground">XP per mission</div>
            <div className="mt-3 w-full h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full xp-bar rounded-full" style={{ width: '65%' }} />
            </div>
            <div className="text-xs font-mono text-accent mt-1">EXP: 3250 / 5000</div>
          </div>
        </div>
      </div>
    </section>
  );
};
