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
        
        {/* --- ARCADE MISSION SELECT HEADER --- */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-12 border-y-2 border-foreground py-8">
          <div className="flex flex-col items-center gap-0 mb-4">
             <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-muted-foreground mb-2">
              System Scan: {missions.length} Battles Detected
            </span>
            <div className="flex items-center justify-center gap-4">
               <div className="h-1 w-8 md:w-16 bg-accent hidden sm:block" />
               <h2 className="font-black text-6xl md:text-9xl italic text-accent drop-shadow-[6px_6px_0_black] leading-none tracking-tighter">
                {missions.length.toString().padStart(2, '0')}
              </h2>
              <div className="h-1 w-8 md:w-16 bg-accent hidden sm:block" />
            </div>
            <span className="font-black text-2xl md:text-4xl uppercase tracking-[0.1em] text-foreground mt-[-10px] italic">
              Active Missions
            </span>
          </div>
          
          <div className="bg-accent/10 border border-accent/30 px-6 py-3 rounded-sm">
            <p className="font-black text-xs md:text-sm uppercase tracking-[0.15em] text-accent animate-pulse">
              Select your first objective below to start your hero journey
            </p>
          </div>
        </div>

        {/* --- GRID OF MISSIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {missions.slice(0, 9).map((mission, idx) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="group relative block border-2 border-foreground p-6 bg-background hover:bg-accent/5 transition-all duration-300 animate-fade-in shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="font-black text-xl uppercase tracking-tight mb-4 group-hover:text-accent transition-colors italic">
                {mission.name}
              </h3>

              <div className="bg-foreground text-background p-3 mb-4">
                <div className="text-[9px] uppercase tracking-[0.2em] font-black opacity-80 mb-1">Target Authority</div>
                <div className="text-sm font-black uppercase">{mission.stages?.[0]?.label || "Federal Govt"}</div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status: <span className="text-foreground">{mission.subtitle}</span>
                </p>
                <div className="p-3 bg-slate-100 border-l-4 border-foreground text-xs font-bold leading-relaxed">
                  {mission.description?.slice(0, 90)}...
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-foreground/10">
                <div className="text-2xl font-black italic tracking-tighter text-foreground">
                  +{mission.xpBounty} <span className="text-[10px] uppercase tracking-normal not-italic opacity-60">XP</span>
                </div>
                <div className="bg-accent text-accent-foreground px-4 py-2 font-black text-xs uppercase border-2 border-foreground group-hover:bg-foreground group-hover:text-background transition-all">
                  Briefing &gt;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionHub;
