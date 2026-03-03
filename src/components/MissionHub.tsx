import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Sword, ShieldCheck, Info } from "lucide-react";
// Import a Modal/Dialog component from your shadcn library
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const MissionHub = () => {
  const { toast } = useToast();

  const handleCompleteMission = (xp) => {
    toast({
      title: "XP ALLOTTED",
      description: `You've earned ${xp} XP for completing this mission!`,
    });
  };

  return (
    <div className="container py-12">
      <h2 className="text-4xl font-black italic text-white mb-8 tracking-tighter uppercase">Active Battles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GAZA MISSION CARD */}
        <div className="p-6 border-2 border-primary/20 bg-black/40 rounded-xl group hover:border-red-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Call for Gaza Ceasefire</h3>
            <span className="font-mono text-primary text-xl">+500 XP</span>
          </div>
          
          <p className="text-muted-foreground mb-6">Direct pressure on the PMO to demand an immediate and permanent ceasefire.</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 gap-3 border-b-4 border-red-900 uppercase italic">
                Join Battle <Sword className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-2 border-red-500 text-white">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black italic uppercase italic">Mission Briefing</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                <div className="bg-black/50 p-4 border border-white/10 rounded">
                  <p className="text-red-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase">
                    <Phone className="w-4 h-4" /> Call the PMO: 613-992-4211
                  </p>
                  <p className="text-sm italic text-slate-300">
                    "My name is [Your Name] from [Your City]. I am calling to demand that Canada calls for an immediate, unconditional, and permanent ceasefire in Gaza and ensures the full restoration of humanitarian aid."
                  </p>
                </div>

                <div className="bg-blue-900/20 p-3 border border-blue-500/30 rounded">
                  <p className="text-xs text-blue-200">
                    <strong>WHY THIS WORKS:</strong> Phone calls are logged by staff and weighted more heavily than emails. 10 calls in an hour can pause an entire office's schedule.
                  </p>
                </div>

                <Button 
                  onClick={() => handleCompleteMission(500)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4"
                >
                  I MADE THE CALL
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MissionHub;
