import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Target } from "lucide-react";

/**
 * Petition signature targets based on House of Commons rules & public data:
 * - e-petitions need 500 signatures minimum to be tabled
 * - Government must respond to petitions with 500+ signatures within 45 days
 * - 10,000+ triggers committee consideration
 * - 100,000+ triggers Parliamentary debate consideration
 *
 * Source: https://petitions.ourcommons.ca/en/Home/AboutContent
 */
const PETITION_TARGETS: Record<string, { target: number; label: string }> = {
  water: { target: 10000, label: "to trigger committee review" },
  tax: { target: 500000, label: "to trigger Parliamentary debate" },
  gaza: { target: 10000, label: "to trigger committee review" },
  food: { target: 10000, label: "to trigger committee review" },
  housing: { target: 10000, label: "to trigger committee review" },
  healthcare: { target: 10000, label: "to trigger committee review" },
  phoenix: { target: 10000, label: "to trigger committee review" },
  climate: { target: 10000, label: "to trigger committee review" },
};

interface PetitionTickerProps {
  missionId: string;
}

export const PetitionTicker = ({ missionId }: PetitionTickerProps) => {
  const [count, setCount] = useState(0);
  const target = PETITION_TARGETS[missionId] || { target: 10000, label: "to trigger committee review" };

  // Fetch initial count
  useEffect(() => {
    const fetchCount = async () => {
      const { count: total } = await supabase
        .from("petition_signatures")
        .select("*", { count: "exact", head: true })
        .eq("mission_id", missionId);
      setCount(total ?? 0);
    };
    fetchCount();

    // Subscribe to realtime inserts
    const channel = supabase
      .channel(`petition-${missionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "petition_signatures",
          filter: `mission_id=eq.${missionId}`,
        },
        () => setCount((c) => c + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [missionId]);

  const pct = Math.min(100, (count / target.target) * 100);

  return (
    <div className="ff-panel p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-accent" />
          <span className="font-heading text-[9px] uppercase text-foreground">Heroes Signed</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-3 w-3 text-muted-foreground" />
          <span className="font-body text-[10px] text-muted-foreground uppercase">
            Goal: {target.target.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-4 bg-muted rounded-sm overflow-hidden mb-2">
        <div
          className="h-full xp-bar rounded-sm transition-all duration-1000"
          style={{ width: `${Math.max(1, pct)}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="font-heading text-sm text-accent">
          {count.toLocaleString()} <span className="text-[9px] text-muted-foreground font-body uppercase">heroes</span>
        </div>
        <div className="font-body text-[10px] text-muted-foreground">
          {(target.target - count).toLocaleString()} more {target.label}
        </div>
      </div>

      {/* Source badge */}
      <div className="mt-2 font-body text-[8px] text-muted-foreground uppercase">
        Source: House of Commons Standing Orders · petitions.ourcommons.ca
      </div>
    </div>
  );
};
