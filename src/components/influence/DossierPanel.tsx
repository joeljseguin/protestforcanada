import { Phone, Mail, Globe, X, Zap, Share2 } from "lucide-react";
import { type PersonDossier } from "@/data/gameData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface DossierPanelProps {
  dossier: PersonDossier;
  label: string;
  nodeId: string;
  onClose: () => void;
}

export function DossierPanel({ dossier, label, nodeId, onClose }: DossierPanelProps) {
  const { user, addXP } = useAuth();
  const { toast } = useToast();

  const handleXPAction = async (action: string, xp: number, description: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Join the Resistance to earn XP.", variant: "destructive" });
      return;
    }
    await addXP(action, `power-map-${nodeId}`, xp);
    toast({ title: `+${xp} XP Earned!`, description });
  };

  return (
    <div
      className="absolute top-0 right-0 h-full w-80 z-50 bg-background overflow-y-auto animate-slide-in-right"
      style={{ border: "4px solid hsl(0 0% 0%)", borderRight: "none" }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-extrabold text-sm uppercase">{label}</h3>
          <button onClick={onClose} className="neu-border p-1 hover:bg-secondary">
            <X className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div className="neu-border p-3 bg-secondary">
            <div className="font-bold uppercase text-[11px] mb-1">{dossier.name}</div>
            <div className="text-muted-foreground">{dossier.title}</div>
          </div>

          {/* XP Action Buttons */}
          <div className="space-y-2">
            {dossier.phone && (
              <button
                onClick={() => {
                  window.open(`tel:${dossier.phone}`, "_self");
                  handleXPAction("call_office", 10, `Called ${dossier.name}'s office`);
                }}
                className="w-full flex items-center justify-between gap-2 neu-border p-2 hover:bg-secondary transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-3 w-3 shrink-0" /> {dossier.phone}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-primary">
                  <Zap className="h-3 w-3" />+10 XP
                </span>
              </button>
            )}
            {dossier.email && (
              <button
                onClick={() => {
                  window.open(`mailto:${dossier.email}`, "_self");
                  handleXPAction("email_office", 5, `Emailed ${dossier.name}'s office`);
                }}
                className="w-full flex items-center justify-between gap-2 neu-border p-2 hover:bg-secondary transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-3 w-3 shrink-0" /> {dossier.email}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-primary">
                  <Zap className="h-3 w-3" />+5 XP
                </span>
              </button>
            )}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${dossier.name} — ${dossier.title}. ${dossier.lobbyingActivity || ""}`);
                handleXPAction("share_dossier", 5, `Shared ${dossier.name}'s dossier`);
              }}
              className="w-full flex items-center justify-between gap-2 neu-border p-2 hover:bg-secondary transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <Share2 className="h-3 w-3 shrink-0" /> Share Dossier
              </span>
              <span className="flex items-center gap-1 text-[9px] font-bold text-primary">
                <Zap className="h-3 w-3" />+5 XP
              </span>
            </button>
          </div>

          {dossier.website && (
            <a href={dossier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 neu-border p-2 hover:bg-secondary transition-colors">
              <Globe className="h-3 w-3 shrink-0" /> Website
            </a>
          )}
          {dossier.assistant && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Assistant:</span> {dossier.assistant}</div>
          )}
          {dossier.reportsTo && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Reports to:</span> {dossier.reportsTo}</div>
          )}
          {dossier.salary && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Compensation:</span> {dossier.salary}</div>
          )}
          {dossier.netWorth && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Net Worth:</span> {dossier.netWorth}</div>
          )}
          {dossier.lobbyingActivity && (
            <div className="neu-border p-2 bg-muted">
              <span className="text-muted-foreground block mb-1">Lobbying Activity:</span>
              {dossier.lobbyingActivity}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
