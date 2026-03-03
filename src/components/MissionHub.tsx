import { missions as rawMissions } from "@/data/gameData";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export const MissionHub = () => {
  const missions = [...rawMissions].sort((a, b) => a.rank - b.rank);
  const { addXP } = useAuth();

  return (
    <section id="missions" className="pt-8 pb-12 md:pb-20 bg-background">
      <div className="container px-4 mx-auto flex flex-col items-center">
        
        {/* --- CLEAN CENTERED HEADER --- */}
        <div className="w-full max-w-xl flex flex-col items-center mb-12 text-center">
          <div className="inline-block bg-accent/10 border-x-2 border-accent px-4 py-1 mb-4">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-accent">
              Mission Dossier Loaded
            </span>
          </div>

          <h2 className="font-black text-5xl md:text-6xl uppercase italic tracking-tighter mb-2">
            <span className="text-accent">{missions.length}</span> Active Battles
          </h2>
          
          <div className="h-1 w-24 bg-foreground mb-6" />

          <p className="font-bold text-sm md:text-base uppercase tracking-tight text-foreground max-w-md leading-relaxed animate-pulse">
            Click the first mission below to start your hero journey
          </p>
        </div>

        {/* --- GRID OF MISSIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {missions.slice(0, 9).map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="group block border-2 border-foreground p-6 bg-background hover:bg-accent/5 transition-all duration-300 animate-fade-in shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="font-black text-xl uppercase tracking-tight mb-4 group-hover:text-accent transition-colors italic">
                {mission.name}
              </h3>

              <div className="bg-foreground text-background p-3 mb-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-black opacity-80 mb-1">Target Authority</div>
                <div className="text-sm font-black uppercase">{mission.stages?.[0]?.label || "Federal Govt"}</div>
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Status: <span className="text-foreground">{mission.subtitle}</span>
              </p>

              <div className="bg-slate-100 p-3 border-l-4 border-foreground text-xs font-bold leading-relaxed mb-6">
                {mission.description?.slice(0, 90)}...
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-foreground/10">
                <div className="text-2xl font-black italic tracking-tighter text-foreground">
                  +{mission.xpBounty} <span className="text-[10px] uppercase tracking-normal not-italic opacity-60">XP</span>
                </div>
                <div className="bg-accent text-accent-foreground px-4 py-2 font-black text-xs uppercase border-2 border-foreground group-hover:bg-foreground group-hover:text-background transition-all">
                  Briefing &gt;
                </div>
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
                  className="w-full mt-3 bg-foreground text-background py-2 px-4 text-center font-black text-xs uppercase border-2 border-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
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
