import { missions as rawMissions } from "@/data/gameData";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export const MissionHub = () => {
  const missions = [...rawMissions].sort((a, b) => a.rank - b.rank);
  const { addXP } = useAuth();

  return (
    <section id="missions" className="pt-4 pb-12 md:pb-20">
      <div className="container px-4 mx-auto">
        
        {/* --- CENTERED MISSION COUNTER & CTA --- */}
        <div className="flex flex-col items-center justify-center mb-10 border-b-2 border-foreground pb-6 overflow-hidden text-center">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-black text-6xl md:text-8xl italic text-accent drop-shadow-[4px_4px_0_hsl(var(--foreground))] leading-none">
              {missions.length.toString().padStart(2, '0')}
            </span>
            <div className="flex flex-col items-start leading-none">
              <span className="font-black text-sm md:text-xl uppercase tracking-[0.2em] text-foreground">Active</span>
              <span className="font-black text-sm md:text-xl uppercase tracking-[0.2em] text-muted-foreground">Missions</span>
            </div>
          </div>
          
          <div className="w-full max-w-md">
            <p className="font-black text-xs md:text-sm uppercase tracking-[0.2em] text-accent animate-pulse italic">
              Click the first mission below to start your hero journey
            </p>
          </div>
        </div>

        {/* --- GRID OF BATTLES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.slice(0, 9).map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="block border-2 border-foreground p-5 hover:shadow-[4px_4px_0_hsl(var(--border))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all animate-fade-in bg-background/50"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="font-black text-base uppercase tracking-wide mb-3 italic">{mission.name}</h3>

              <div className="bg-foreground text-background p-3 mb-3">
                <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Current Target</div>
                <div className="text-sm font-bold uppercase">{mission.stages?.[0]?.label || "Government"}</div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 font-bold">Status: {mission.subtitle}</p>

              <div className="bg-foreground text-background p-2 mb-4 border-l-4 border-accent">
                <p className="text-xs font-bold">Mission Intel: {mission.description?.slice(0, 80)}...</p>
              </div>

              <div className="text-lg font-black mb-3 text-accent drop-shadow-[1px_1px_0_black]">+{mission.xpBounty} XP</div>

              <div className="bg-accent text-accent-foreground py-2.5 px-4 text-center font-black text-sm uppercase tracking-wider border-2 border-foreground mb-3">
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
                  className="w-full bg-foreground text-background py-2.5 px-4 text-center font-black text-sm uppercase tracking-wider border-2 border-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
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

export default MissionHub;
