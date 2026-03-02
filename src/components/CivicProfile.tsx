import { useAuth } from "@/hooks/useAuth";
import { Shield, Zap, Target, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CivicProfile = () => {
  const { profile, signOut } = useAuth();

  if (!profile) return null;

  const level = Math.floor(profile.total_xp / 100) + 1;
  const xpInLevel = profile.total_xp % 100;

  return (
    <div className="ff-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[9px] uppercase flex items-center gap-2 text-primary">
          <Shield className="h-4 w-4" /> Party Status
        </h3>
        <Button variant="outline" size="sm" onClick={signOut} className="font-body text-xs uppercase gap-1">
          <LogOut className="h-3 w-3" /> Escape
        </Button>
      </div>

      {/* Character stats — FF4 style */}
      <div className="mb-4 ff-panel p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-sm text-foreground">{profile.display_name || profile.email}</span>
          <span className="font-body text-sm text-accent">LV. {level}</span>
        </div>
        {/* HP bar = Impact */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-body text-xs text-hp-green w-8">HP</span>
          <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
            <div className="h-full hp-bar rounded-sm" style={{ width: `${Math.min(100, profile.impact_score)}%` }} />
          </div>
          <span className="font-mono text-xs text-foreground w-16 text-right">{profile.impact_score}/100</span>
        </div>
        {/* MP bar = Missions */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-body text-xs text-mp-blue w-8">MP</span>
          <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
            <div className="h-full mp-bar rounded-sm" style={{ width: `${Math.min(100, profile.missions_completed * 10)}%` }} />
          </div>
          <span className="font-mono text-xs text-foreground w-16 text-right">{profile.missions_completed}/10</span>
        </div>
        {/* XP bar */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-accent w-8">EXP</span>
          <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
            <div className="h-full xp-bar rounded-sm" style={{ width: `${xpInLevel}%` }} />
          </div>
          <span className="font-mono text-xs text-accent w-16 text-right">{profile.total_xp}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-body text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.postal_code || "—"}</span>
        <span>{profile.email}</span>
      </div>
    </div>
  );
};
