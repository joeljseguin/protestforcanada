import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-accent px-3 py-1.5 text-sm font-bold uppercase tracking-wider mb-8 animate-fade-in">
            <span>🏆</span>
            <span className="text-accent-foreground">Be the Hero, Affect Change!</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Follow the
            <br />
            money, hold
            <br />
            <span className="bg-accent px-2 inline-block">power</span>
            <br />
            accountable.
          </h1>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button size="lg" className="font-bold text-sm h-12 uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent/80 px-8 rounded-none border-2 border-foreground" asChild>
              <Link to="/quest">
                <Zap className="h-4 w-4 mr-2" />
                Start Quest
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-bold text-sm h-12 uppercase tracking-wider px-8 rounded-none border-2 border-foreground" asChild>
              <Link to="/power-map">
                🗺 Who Has Power?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
