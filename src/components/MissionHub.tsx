import { missions as rawMissions } from "@/data/gameData";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export const MissionHub = () => {
  const missions = [...rawMissions].sort((a, b) => a.rank - b.rank);
  const { addXP } = useAuth();

  return (
    <section id="missions" className="py-12 md:py-20">
      <div className="container">
                {/* --- DYNAMIC MISSION COUNTER --- */}
        <div className="flex justify-between items-end mb-10 border-b-2 border-foreground pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-black text-6xl md:text-8xl tracking-tighter italic text-accent drop-shadow-[4px_4px_0_hsl(var(--foreground))]">
              {missions.length.toString().padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="font-black text-xl uppercase tracking-[0.2em]">Active</span>
              <span className="font-black text-xl uppercase tracking-[0.2em] text-muted-foreground">Missions</span>
            </div>
          </div>
          
          <div className="hidden md:block text-right">
            <div className="text-[10px] font-black uppercase tracking-widest mb-1">System Status</div>
            <div className="flex gap-1 justify-end">
              {missions.map((_, i) => (
                <div key={i} className="w-1.5 h-6 bg-accent skew-x-[-15deg]" />
              ))}
            </div>
          </div>
        </div>
        {/* --- END MISSION COUNTER --- */}

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight inline-block">
            Active Missions
          </h2>
          <div className="h-1 w-20 bg-accent mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.slice(0, 9).map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="block border-2 border-foreground p-5 hover:shadow-[4px_4px_0_hsl(var(--border))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="font-black text-base uppercase tracking-wide mb-3">
                {mission.name}
              </h3>

              <div className="bg-foreground text-background p-3 mb-3">
                <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Current Target</div>
                <div className="text-sm font-bold uppercase">{mission.stages?.[0]?.label || "Government"}</div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Status: {mission.subtitle}
              </p>

              <div className="bg-foreground text-background p-2 mb-4">
                <p className="text-xs font-bold">
                  Mission Intel: {mission.description?.slice(0, 80)}
                </p>
              </div>

              <div className="text-lg font-black mb-3">+{mission.xpBounty} XP</div>

              <div className="bg-accent text-accent-foreground py-2.5 px-4 text-center font-black text-sm uppercase tracking-wider border-2 border-foreground">
                Take Action
              </div>

              {mission.links?.[0]?.url && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addXP("join_battle", mission.id, 50);
                    toast({ title: `+50 XP — Joining the battle for ${mission.name}!` });
                    window.open(mission.links[0].url, "_blank", "noopener");
                  }}
                  className="w-full mt-3 bg-foreground text-background py-2.5 px-4 text-center font-black text-sm uppercase tracking-wider border-2 border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  ⚔️ Join Battle
                </button>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
