import { Link } from "react-router-dom";

// We define the data INSIDE the file temporarily to stop the crash
const missions = [
  {
    id: "1",
    name: "Mission 1: War Crimes Accountability",
    subtitle: "Target: Federal Government",
    xpBounty: 500
  }
];

export const MissionHub = () => {
  return (
    <section id="missions" className="pt-8 pb-12 bg-background min-h-screen">
      <div className="container px-4 mx-auto flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-12 text-center mx-auto">
          <div className="inline-block bg-[#FF0000] border-x-2 border-white px-4 py-1 mb-4 shadow-[4px_4px_0_black]">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white">
              System Recovered
            </span>
          </div>

          <h2 className="font-black text-4xl md:text-6xl uppercase italic tracking-tighter mb-4 text-foreground leading-tight">
            Humanitarian Crises
          </h2>

          <div className="space-y-4 px-4">
            <p className="font-black text-sm md:text-lg uppercase tracking-tight text-foreground max-w-lg leading-relaxed text-center">
              Below are the worst humanitarian crises in Canada. <span className="text-[#FF0000] underline uppercase">Start with mission 1.</span>
            </p>
            <p className="font-bold text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-md animate-pulse mx-auto">
              Learn why war crimes are being committed by Canada's Government and Corporations.
            </p>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {missions.map((mission) => (
            <Link
              key={mission.id}
              to={`/quest?mission=${mission.id}`}
              className="block border-2 border-foreground p-6 bg-background shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_#FF0000] transition-all"
            >
              <h3 className="font-black text-xl uppercase italic mb-4">{mission.name}</h3>
              <div className="bg-[#FF0000] text-white p-3 font-black text-center text-sm uppercase">
                Briefing &gt;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionHub;
