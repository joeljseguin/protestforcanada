import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink, Gamepad2, Zap, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

function getAnonId(): string {
  let id = localStorage.getItem("anonHeroId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("anonHeroId", id);
  }
  return id;
}

interface PetitionRedirectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  missionId: string;
  missionName: string;
  petitionLabel: string;
  xp: number;
}

export const PetitionRedirectDialog = ({
  open,
  onOpenChange,
  url,
  missionId,
  missionName,
  petitionLabel,
  xp,
}: PetitionRedirectDialogProps) => {
  const [signing, setSigning] = useState(false);
  const { user, addXP } = useAuth();

  const handleSign = async () => {
    setSigning(true);

    // Track the signature
    await supabase.from("petition_signatures").insert({
      mission_id: missionId,
      petition_url: url,
      user_id: user?.id ?? null,
      anonymous_id: user ? null : getAnonId(),
    } as any);

    // Award XP
    await addXP("petition_sign", missionId, xp);

    // Open petition in new tab
    window.open(url, "_blank");
    setSigning(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="ff-panel border-accent sm:max-w-md" style={{ borderColor: "hsl(var(--accent))" }}>
        <DialogHeader>
          <DialogTitle className="font-heading text-[10px] uppercase flex items-center gap-2 text-accent">
            <AlertTriangle className="h-4 w-4" />
            ⚠ Leaving the Quest
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground pt-2">
            You're about to be redirected to sign a real petition for people in crisis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Crisis context */}
          <div className="ff-panel p-4">
            <div className="font-heading text-[8px] uppercase text-destructive mb-1">
              🚨 Real People Need Your Help
            </div>
            <p className="font-body text-xs text-foreground">
              <strong>{missionName}</strong> — This petition directly supports Canadians affected by this crisis.
              Your signature is counted by the House of Commons and can trigger government action.
            </p>
          </div>

          {/* What they're signing */}
          <div className="ff-panel p-3 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="font-body text-xs font-bold text-foreground uppercase">{petitionLabel}</div>
              <div className="font-body text-[10px] text-muted-foreground mt-0.5 break-all">{url}</div>
            </div>
          </div>

          {/* XP reward */}
          <div className="text-center ff-panel p-2">
            <span className="font-body text-xs text-muted-foreground">Signing earns you </span>
            <span className="inline-flex items-center gap-1 font-heading text-sm text-accent">
              <Zap className="h-3.5 w-3.5" /> +{xp} XP
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="font-body text-xs uppercase tracking-wider"
          >
            <Gamepad2 className="h-3.5 w-3.5 mr-1.5" />
            Keep Playing
          </Button>
          <Button
            onClick={handleSign}
            disabled={signing}
            className="font-body text-xs uppercase tracking-wider bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            {signing ? "Redirecting..." : "Sign the Petition"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
