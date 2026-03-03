import { useSearchParams, Link } from "react-router-dom";
import { missions } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ChevronLeft, ShieldAlert, Phone, ExternalLink, Award } from "lucide-react";

const Quest = () => {
  const [searchParams] = useSearchParams();
  const missionId = searchParams.get("mission");
  const { addXP } = useAuth();
  
  const mission = missions.find((m) => m.id === missionId);

  if (!mission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-black uppercase italic">Mission Not Found</h1>
        <Link to="/" className="mt-4 text-red-600 font-bold underline">Return to Hub</Link>
      </div>
    );
  }

  const handleAction = () => {
    addXP("join_battle", mission.id, 100);
    toast({
      title: "XP SECURED",
      description: `+100 XP awarded for engaging in ${mission.name}.`,
    });
    if (mission.links?.[0]?.url) {
      window.open(mission.links[0].url, "_blank", "noopener");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* NAVIGATION */}
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest hover:text-red-600 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Hub
        </Link>
      </div>

      <div className="container max-w-4xl">
        {/* --- MISSION HEADER (RED & BOLD) --- */}
        <div className="bg-red-600 p-8 border-4 border-black mb-8 shadow-[8px_8px_0_black] text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <ShieldAlert className="text-white w-6 h-6 animate-pulse" />
            <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em]">
              Priority Objective
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic text-white tracking-tighter leading-none mb-4">
            {mission.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 border-t border-white/20 pt-6">
             <div className="flex items-center gap-2">
                <Award className="text-white w-5 h-5" />
                <span className="text-white font-black text-xl italic underline">+{mission.xpBounty} XP</span>
             </div>
             <span className="text-white/80 font-bold uppercase text-xs tracking-widest self-center">
               Target: {mission.stages?.[0]?.label || "Federal Authority"}
             </span>
          </div>
        </div>

        {/* --- INTEL SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0_black]">
              <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-red-600 pb-2 inline-block">Mission Briefing</h2>
              <p className="text-lg font-bold leading-relaxed text-slate-900">
                {mission.description}
              </p>
            </div>

            {/* THE TACTICAL SCRIPT */}
            <div className="bg-slate-900 text-white p-8 border-l-8 border-red-600 shadow-[4px_4px_0_black]">
               <h3 className="text-red-500 font-black uppercase tracking-widest mb-4 text-xs flex items-center gap-2">
                 <Phone className="w-4 h-4" /> Tactical Script
               </h3>
               <p className="text-xl md:text-2xl font-black italic leading-tight text-white mb-6">
                 "I am calling to demand immediate action on this humanitarian crisis. Human rights are non-negotiable for all residents of Canada."
               </p>
               <p className="text-[10px] uppercase font-bold text-slate-500 italic">
                 Read this clearly if prompted by a staffer or voicemail.
               </p>
            </div>
          </div>

          {/* ACTION SIDEBAR */}
          <div className="flex flex-col gap-4">
             <Button 
               onClick={handleAction}
               className="w-full bg-red-600 hover:bg-black text-white font-black py-10 text-xl uppercase italic border-b-4 border-black active:translate-y-1 transition-all flex flex-col gap-1 shadow-[4px_4px_0_black]"
             >
               Take Action <ExternalLink className="w-6 h-6" />
             </Button>
             
             <div className="p-4 bg-slate-100 border-2 border-black">
                <p className="text-[10px] font-black uppercase text-red-600 mb-2 underline tracking-widest">Why This Matters</p>
                <p className="text-xs font-bold leading-tight text-slate-700 italic">
                   Direct pressure on elected officials is the most effective way to counteract lobbyist influence. Every call is logged.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quest;
