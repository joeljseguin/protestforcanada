import { missions, threatColors } from "@/data/gameData";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";

export const MissionHub = () => {
  return (
    <section id="missions" className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-6 w-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
            Top 10 Critical Missions
          </h2>
        </div>
        <p className="text-muted-foreground font-mono text-sm mb-10 max-w-2xl">
          Complete missions to earn XP. Each mission is backed by verified data from open government sources.
        </p>

        <div className="space-y-4">
          {missions.map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="block neu-border p-5 bg-card card-hover animate-fade-in hover:neu-shadow-lg transition-all"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-4 md:gap-6">
                {/* Rank */}
                <div className="shrink-0 w-12 h-12 neu-border flex items-center justify-center font-extrabold text-xl font-heading bg-foreground text-background">
                  #{mission.rank}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-heading font-bold text-lg uppercase tracking-wide truncate">
                      {mission.name}
                    </h3>
                    <Badge className={`${threatColors[mission.threatLevel]} neu-border text-[10px] font-mono uppercase tracking-wider`}>
                      {mission.threatLevel}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs font-mono truncate">{mission.subtitle}</p>
                </div>

                {/* Progress */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                  <div className="w-32">
                    <div className="h-4 neu-border overflow-hidden bg-muted">
                      <div
                        className="h-full bg-foreground transition-all duration-1000"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1">{mission.progress}% complete</div>
                  </div>
                </div>

                {/* XP */}
                <div className="shrink-0 neu-border px-3 py-2 bg-secondary font-mono font-bold text-sm flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  +{mission.xpBounty} XP
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
