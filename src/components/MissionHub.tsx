import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Sword, Phone, Info, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define the Mission structure for TypeScript
interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  actionUrl?: string;
  phone?: string;
  script?: string;
}

const missions: Mission[] = [
  {
    id: "gaza-1",
    title: "Gaza Ceasefire Call",
    description: "Direct pressure on the PMO to demand an immediate and permanent ceasefire.",
    xpReward: 500,
    phone: "613-992-4211",
    script: "My name is [Name] from [City]. I demand Canada calls for an immediate, unconditional ceasefire and restores full aid."
  },
  {
    id: "water-1",
    title: "End Water Advisories",
    description: "Demand clean water infrastructure for all First Nations communities now.",
    xpReward: 400,
    actionUrl: "https://petitions.ourcommons.ca/en/Home/Index"
  }
];

export const MissionHub = () => {
  const { toast } = useToast();

  const handleComplete = (missionTitle: string, xp: number) => {
    toast({
      title: "MISSION ACCOMPLISHED",
      description: `You earned ${xp} XP for ${missionTitle}!`,
    });
  };

  return (
    <div className="container py-12">
      {/* MISSION COUNTER HEADER */}
      <div className="w-full flex flex-col items-center justify-center mb-12 animate-in fade-in duration-700">
        <div className="flex items-center gap-4 bg-black/60 border-2 border-primary/40 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <span className="font-mono text-xl md:text-2xl font-black italic tracking-widest text-white uppercase">
            Missions Detected: <span className="text-primary">{missions.length.toString().padStart(3, '0')}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission) => (
          <div key={mission.id} className="p-6 border-2 border-primary/20 bg-black/40 rounded-xl group hover:border-red-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{mission.title}</h3>
              <span className="font-mono text-primary text-xl">+{mission.xpReward} XP</span>
            </div>
            
            <p className="text-muted-foreground mb-6">{mission.description}</p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 gap-3 border-b-4 border-red-900 uppercase italic">
                  Join Battle <Sword className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-2 border-red-500 text-white">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black italic uppercase">Mission Briefing</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 pt-4">
                  {mission.phone && (
                    <div className="bg-black/50 p-4 border border-white/10 rounded">
                      <p className="text-red-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase">
                        <Phone className="w-4 h-4" /> Call PMO: {mission.phone}
                      </p>
                      <p className="text-sm italic text-slate-300">"{mission.script}"</p>
                    </div>
                  )}

                  <div className="bg-blue-900/20 p-3 border border-blue-500/30 rounded flex gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-xs text-blue-200">
                      <strong>TACTICAL ADVICE:</strong> Phone calls are logged by staffers and have 10x the impact of a generic email.
                    </p>
                  </div>

                  <Button 
                    onClick={() => handleComplete(mission.title, mission.xpReward)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 uppercase"
                  >
                    I Have Taken Action
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionHub;
