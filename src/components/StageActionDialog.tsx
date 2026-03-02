import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Pen,
  Mail,
  Phone,
  Users,
  BookOpen,
  Vote,
  Heart,
  Zap,
  CheckCircle2,
  ExternalLink,
  Lock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { StageConfig, StageAction } from "@/data/stageActions";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  share: Share2,
  petition: Pen,
  email: Mail,
  call: Phone,
  protest: Users,
  research: BookOpen,
  vote: Vote,
  donate: Heart,
};

const platformColors: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  twitter: "bg-foreground",
  bluesky: "bg-[#0085FF]",
  instagram: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  tiktok: "bg-foreground",
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageConfig: StageConfig;
  missionId: string;
};

export const StageActionDialog = ({ open, onOpenChange, stageConfig, missionId }: Props) => {
  const { user, addXP } = useAuth();
  const { toast } = useToast();
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  // Load completed actions from DB
  useEffect(() => {
    if (!user || !open) return;
    const load = async () => {
      const { data } = await supabase
        .from("xp_actions")
        .select("action_type")
        .eq("user_id", user.id)
        .eq("mission_id", missionId);
      if (data) {
        setCompletedActions(new Set(data.map((d) => d.action_type)));
      }
    };
    load();
  }, [user, open, missionId]);

  const earnedXP = stageConfig.actions
    .filter((a) => completedActions.has(a.id))
    .reduce((sum, a) => sum + a.xp, 0);

  const handleAction = async (action: StageAction) => {
    if (completedActions.has(action.id)) return;

    // Open share/external link
    if (action.shareUrl) {
      window.open(action.shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    } else if (action.externalUrl) {
      window.open(action.externalUrl, "_blank", "noopener,noreferrer");
    }

    if (!user) {
      toast({
        title: "Sign in to earn XP",
        description: "Join the Resistance to track your impact and earn rewards.",
      });
      return;
    }

    setLoading(action.id);

    try {
      await addXP(action.id, missionId, action.xp);
      setCompletedActions((prev) => new Set([...prev, action.id]));
      toast({
        title: `+${action.xp} XP Earned!`,
        description: action.label,
      });
    } catch {
      toast({ title: "Error", description: "Failed to record XP." });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="neu-border neu-shadow bg-card max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-extrabold text-xl uppercase flex items-center gap-2">
            <Zap className="h-5 w-5" /> {stageConfig.title}
          </DialogTitle>
          <DialogDescription className="font-mono text-sm">
            {stageConfig.description}
          </DialogDescription>
        </DialogHeader>

        {/* XP Progress */}
        <div className="neu-border p-3 bg-secondary">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-wider font-bold">Stage XP</span>
            <span className="font-heading font-extrabold text-lg">
              {earnedXP} / {stageConfig.totalXP}
            </span>
          </div>
          <div className="h-3 neu-border overflow-hidden bg-muted">
            <div
              className="h-full bg-foreground transition-all duration-700"
              style={{
                width: stageConfig.totalXP > 0 ? `${(earnedXP / stageConfig.totalXP) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {stageConfig.actions.map((action) => {
            const Icon = iconMap[action.icon];
            const done = completedActions.has(action.id);
            const isLoading = loading === action.id;
            const isDonate = action.icon === "donate";
            const platformClass = action.platform ? platformColors[action.platform] : "";

            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                disabled={done || isLoading}
                className={`w-full text-left neu-border p-4 transition-all ${
                  done
                    ? "bg-secondary opacity-70"
                    : isDonate
                    ? "bg-mission-green/10 hover:bg-mission-green/20 hover:scale-[1.01] cursor-pointer ring-2 ring-mission-green/40"
                    : "bg-card hover:bg-secondary hover:scale-[1.01] cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`shrink-0 w-10 h-10 neu-border flex items-center justify-center ${
                      isDonate ? "bg-mission-green text-white" : platformClass || "bg-muted"
                    } ${platformClass && !isDonate ? "text-white" : ""}`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-mission-green" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm uppercase font-heading flex items-center gap-2">
                      {action.label}
                      {(action.shareUrl || action.externalUrl) && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {action.description}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {done ? (
                      <Badge className="neu-border bg-mission-green/20 text-mission-green font-mono text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Done
                      </Badge>
                    ) : (
                      <Badge className="neu-border bg-secondary font-mono text-xs font-bold">
                        <Zap className="h-3 w-3 mr-1" /> +{action.xp} XP
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

          {stageConfig.actions.length === 0 && (
            <div className="neu-border p-6 bg-muted text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="font-mono text-sm text-muted-foreground">
                This stage unlocks when previous stages are complete.
              </div>
            </div>
          )}
        </div>

        {!user && (
          <div className="neu-border p-3 bg-muted text-center">
            <span className="font-mono text-xs text-muted-foreground">
              ⚡ Sign in to track your XP and earn rewards
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
