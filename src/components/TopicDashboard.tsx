import { topics, topicIcons, type Topic } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const statusColors: Record<Topic["statusType"], string> = {
  critical: "bg-civic-red text-accent-foreground",
  warning: "bg-civic-amber text-foreground",
  stable: "bg-civic-green text-accent-foreground",
};

export const TopicDashboard = () => {
  return (
    <section id="topics" className="py-16">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Topic Dashboard</h2>
          <p className="text-muted-foreground text-lg">Key issues affecting Canadians — tracked in real time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => {
            const Icon = topicIcons[topic.icon];
            return (
              <div
                key={topic.id}
                className="group bg-card rounded-lg border p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{topic.title}</h3>
                  </div>
                  <Badge className={statusColors[topic.statusType]}>{topic.status}</Badge>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">{topic.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold tracking-tight">{topic.keyFigure}</p>
                    <p className="text-sm text-muted-foreground">{topic.keyFigureLabel}</p>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Take Action <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
