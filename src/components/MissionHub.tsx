import { missions as rawMissions, threatColors } from "@/data/gameData";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const MissionHub = () => {
  const missions = [...rawMissions].sort((a, b) => a.rank - b.rank);

  return (
    <section id="missions" className="py-12 md:py-20">
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-5 w-5 text-accent" />
          <h2 className="font-heading text-sm md:text-base uppercase tracking-tight text-primary">
            Top 10 Critical Missions
          </h2>
        </div>
        <p className="text-muted-foreground font-body text-sm mb-8 max-w-2xl">
          Complete missions to earn XP. Each mission is backed by verified government data.
        </p>

        <div className="space-y-3">
          {missions.map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="block ff-panel p-4 card-hover animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-4 md:gap-6">
                {/* Rank */}
                <div className="shrink-0 w-11 h-11 ff-panel flex items-center justify-center font-heading text-sm text-accent">
                  #{mission.rank}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-body font-bold text-sm uppercase tracking-wide truncate text-foreground">
                      {mission.name}
                    </h3>
                    <Badge className={`${threatColors[mission.threatLevel]} text-[10px] font-body uppercase tracking-wider border border-border`}>
                      {mission.threatLevel}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs font-body truncate">{mission.subtitle}</p>
                </div>

                {/* HP-style progress bar */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                  <div className="w-32">
                    <div className="h-3 bg-muted rounded-sm overflow-hidden">
                      <div
                        className="h-full hp-bar rounded-sm transition-all duration-1000"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-body text-muted-foreground mt-1">{mission.progress}%</div>
                  </div>
                </div>

                {/* XP */}
                <div className="shrink-0 ff-panel px-3 py-2 font-body font-bold text-sm flex items-center gap-1.5 text-accent">
                  <Zap className="h-3.5 w-3.5" />
                  +{mission.xpBounty}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
