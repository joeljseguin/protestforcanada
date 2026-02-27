import { flaggedSpending } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicOversight = () => {
  return (
    <section id="oversight" className="py-16 bg-secondary/50">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Public Oversight</h2>
          <p className="text-muted-foreground text-lg">
            Community-flagged spending. Verified users surface what matters.
            <span className="text-sm ml-2 opacity-70">Source: GC InfoBase</span>
          </p>
        </div>
        <div className="space-y-4">
          {flaggedSpending.map((item, i) => (
            <div
              key={item.id}
              className="bg-card rounded-lg border p-5 card-hover animate-fade-in civic-border-l"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-civic-amber" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary">{item.department}</Badge>
                    <span className="font-mono font-bold text-civic-red">{item.amount}</span>
                    <span className="text-xs text-muted-foreground">
                      Flagged by <span className="font-medium">{item.flaggedBy}</span> · {item.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="flex md:flex-col items-center gap-3 md:gap-2 shrink-0">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="font-mono text-sm">{item.upvotes.toLocaleString()}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="font-mono text-sm">{item.downvotes.toLocaleString()}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-mono text-sm">{item.comments}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
