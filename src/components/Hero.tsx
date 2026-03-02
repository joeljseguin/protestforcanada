import { Button } from "@/components/ui/button";
import { ArrowDown, Swords, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="container relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 neu-border px-4 py-2 text-sm font-mono uppercase tracking-wider mb-8 animate-fade-in bg-secondary font-bold">
            <Swords className="h-4 w-4" />
            10 Active Missions
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6 animate-fade-in uppercase" style={{ animationDelay: "100ms" }}>
            Follow the
            <br />
            <span className="text-mission-green">money</span>, hold
            <br />
            <span className="inline-block neu-border px-4 py-1 bg-secondary -rotate-1">power</span>
            {" "}accountable.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-mono animate-fade-in" style={{ animationDelay: "200ms" }}>
            Complete missions. Earn XP. Change Canada.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="font-mono uppercase tracking-wider text-sm h-12 neu-border neu-shadow text-lg px-8" asChild>
              <Link to="/quest">
                <Zap className="h-5 w-5 mr-2" />
                Start Quest
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-mono uppercase tracking-wider text-sm h-12 neu-border neu-shadow text-lg px-8" asChild>
              <Link to="/power-map">
                Who Has The Power?
              </Link>
            </Button>
          </div>
        </div>

        {/* XP indicator */}
        <div className="absolute top-0 right-0 hidden lg:block animate-float">
          <div className="neu-border neu-shadow-lg p-6 bg-secondary">
            <div className="text-5xl font-extrabold font-heading">+500</div>
            <div className="text-sm font-mono uppercase tracking-wider mt-1">XP per mission</div>
          </div>
        </div>
      </div>
    </section>
  );
};
