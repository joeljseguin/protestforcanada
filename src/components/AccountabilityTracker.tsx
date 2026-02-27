import { bills, type Bill } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const statusBadge: Record<Bill["status"], string> = {
  Passed: "bg-civic-green text-accent-foreground",
  "In Committee": "bg-civic-amber text-foreground",
  Defeated: "bg-civic-red text-accent-foreground",
};

const partyColor: Record<string, string> = {
  Liberal: "text-civic-red",
  Conservative: "text-blue-600",
  NDP: "text-orange-500",
  "Bloc Québécois": "text-sky-500",
  Green: "text-civic-green",
};

export const AccountabilityTracker = () => {
  const [expandedBill, setExpandedBill] = useState<string | null>(null);

  return (
    <section id="accountability" className="py-16 bg-secondary/50">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Accountability Tracker</h2>
          <p className="text-muted-foreground text-lg">
            Follow the money. See how your representatives voted.
            <span className="text-sm ml-2 opacity-70">Source: LEGISinfo</span>
          </p>
        </div>
        <div className="bg-card rounded-lg border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 bg-primary text-primary-foreground font-semibold text-sm">
            <span>Bill Name</span>
            <span>Total Cost</span>
            <span>Status</span>
            <span className="w-10" />
          </div>
          {/* Rows */}
          {bills.map((bill) => (
            <div key={bill.id} className="border-b last:border-b-0">
              <button
                onClick={() => setExpandedBill(expandedBill === bill.id ? null : bill.id)}
                className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 w-full text-left hover:bg-muted/50 transition-colors items-center"
              >
                <div>
                  <span className="font-semibold">{bill.shortName}</span>
                  <span className="text-muted-foreground ml-2 text-sm">{bill.name}</span>
                </div>
                <span className="font-mono font-semibold">{bill.totalCost}</span>
                <Badge className={statusBadge[bill.status]}>{bill.status}</Badge>
                <span className="w-10 flex justify-center">
                  {expandedBill === bill.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              {expandedBill === bill.id && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                      Who Voted — {bill.votes.length} recorded votes
                    </h4>
                    <div className="space-y-2">
                      {bill.votes.map((v, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{v.mp}</span>
                            <span className={`text-xs font-semibold ${partyColor[v.party] || "text-muted-foreground"}`}>
                              {v.party}
                            </span>
                            <span className="text-muted-foreground text-xs">{v.riding}</span>
                          </div>
                          <Badge variant={v.vote === "Yes" ? "default" : "destructive"} className={v.vote === "Yes" ? "bg-civic-green" : "bg-civic-red"}>
                            {v.vote}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
