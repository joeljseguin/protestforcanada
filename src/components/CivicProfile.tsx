import { useAuth } from "@/hooks/useAuth";
import { Shield, Zap, Target, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CivicProfile = () => {
  const { profile, signOut } = useAuth();

  if (!profile) return null;

  return (
    <div className="neu-border neu-shadow p-6 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-extrabold text-lg uppercase flex items-center gap-2">
          <Shield className="h-5 w-5" /> Civic Profile
        </h3>
        <Button variant="outline" size="sm" onClick={signOut} className="neu-border font-mono text-xs uppercase gap-1">
          <LogOut className="h-3 w-3" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="neu-border p-3 bg-secondary text-center">
          <div className="text-2xl font-extrabold font-heading flex items-center justify-center gap-1">
            <Zap className="h-5 w-5" /> {profile.total_xp}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Total XP</div>
        </div>
        <div className="neu-border p-3 bg-secondary text-center">
          <div className="text-2xl font-extrabold font-heading flex items-center justify-center gap-1">
            <Target className="h-5 w-5" /> {profile.impact_score}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Impact Score</div>
        </div>
        <div className="neu-border p-3 bg-secondary text-center">
          <div className="text-2xl font-extrabold font-heading flex items-center justify-center gap-1">
            <MapPin className="h-5 w-5" /> {profile.postal_code || "—"}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Postal Code</div>
        </div>
      </div>

      <div className="mt-3 text-xs font-mono text-muted-foreground">
        {profile.email} · {profile.missions_completed} missions completed
      </div>
    </div>
  );
};
