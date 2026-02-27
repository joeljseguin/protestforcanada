import { missions } from "@/data/accountabilityData";
import { ExternalLink, CheckCircle2, Circle, AlertTriangle, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MissionProgress = ({ stages, progress, crisis }: { stages: { label: string; complete: boolean }[]; progress: number; crisis: boolean }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-1">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center flex-1">
          <div className="flex items-center gap-1.5 flex-1">
            {stage.complete ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-civic-green" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <span className={`text-[10px] font-mono uppercase tracking-wider ${stage.complete ? "text-foreground" : "text-muted-foreground"}`}>
              {stage.label}
            </span>
          </div>
          {i < stages.length - 1 && (
            <div className="h-px w-4 mx-1 bg-border" style={stage.complete ? { background: "hsl(142 60% 38%)" } : undefined} />
          )}
        </div>
      ))}
    </div>
    <div className="relative h-3 rounded-full overflow-hidden bg-secondary">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${crisis ? "animate-pulse-red" : "glow-green"}`}
        style={{
          width: `${progress}%`,
          background: crisis
            ? "linear-gradient(90deg, hsl(0 75% 45%), hsl(0 75% 55%))"
            : "linear-gradient(90deg, hsl(142 60% 32%), hsl(142 60% 45%))",
        }}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-foreground">
        {progress}%
      </span>
    </div>
  </div>
);

export const MissionHub = () => {
  return (
    <section id="missions" className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            // Mission Control
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
          Humanitarian Mission Hub
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm mb-12">
          Active operations tracking. Every statistic carries a{" "}
          <Badge variant="outline" className="text-[10px] font-mono border-civic-green text-civic-green px-1.5 py-0 mx-1">
            Source: Verified
          </Badge>{" "}
          badge linked to its origin.
        </p>

        <div className="space-y-8">
          {missions.map((mission, idx) => (
            <div
              key={mission.id}
              className={`rounded-lg border overflow-hidden animate-fade-in bg-card ${mission.crisis ? "border-accent/40" : "border-border"}`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="p-6 pb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crosshair className="h-4 w-4" style={{ color: mission.crisis ? "hsl(0 75% 50%)" : "hsl(142 60% 38%)" }} />
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{mission.title}</h3>
                    {mission.crisis && (
                      <Badge className="bg-accent/20 text-accent border-accent/40 text-[10px] font-mono">
                        <AlertTriangle className="h-3 w-3 mr-1" /> CRISIS
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs font-mono">{mission.subtitle}</p>
                </div>
              </div>

              <div className="px-6 pb-4">
                <MissionProgress stages={mission.stages} progress={mission.progress} crisis={mission.crisis} />
              </div>

              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
              </div>

              <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {mission.stats.map((stat) => (
                  <div key={stat.label} className="rounded-md p-3 border border-border bg-secondary/50">
                    <div className="text-2xl font-bold font-heading" style={{ color: mission.crisis ? "hsl(0 75% 45%)" : "hsl(142 60% 35%)" }}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2"
                    >
                      <Badge variant="outline" className="text-[9px] font-mono border-civic-green/40 text-civic-green hover:bg-civic-green/10 cursor-pointer px-1.5 py-0">
                        <ExternalLink className="h-2 w-2 mr-0.5" /> Source: {stat.source}
                      </Badge>
                    </a>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6 flex flex-wrap gap-2">
                {mission.links.map((link) => (
                  <Button key={link.url} variant="outline" size="sm" asChild className="font-mono text-xs h-8 border-border hover:border-foreground/30">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
