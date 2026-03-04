import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Quest = {
  id: string;
  index: number;
  title: string;
  description: string;
  completed: boolean;
};

type Mission = {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  quests: Quest[];
};

interface MissionCardGridProps {
  mission: Mission;
  onQuestClick: (missionId: string, questId: string) => void;
}

export function MissionCardGrid({ mission, onQuestClick }: MissionCardGridProps) {
  const completedCount = mission.quests.filter((q) => q.completed).length;
  const total = mission.quests.length;
  const progress = (completedCount / total) * 100;

  return (
    <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Mission {mission.index}
          </p>
          <h2 className="text-xl font-bold">{mission.title}</h2>
          {mission.subtitle && (
            <p className="text-sm text-muted-foreground">{mission.subtitle}</p>
          )}
        </div>
        <div className="mt-2 flex flex-col items-start sm:items-end">
          <p className="text-xs font-medium text-muted-foreground">
            {completedCount}/{total} quests complete
          </p>
          <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-yellow-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {mission.quests.map((quest) => {
          const isCompleted = quest.completed;
          return (
            <article
              key={quest.id}
              className={cn(
                "flex flex-col justify-between rounded-lg border bg-background p-4",
                isCompleted && "border-green-500/70 bg-green-50"
              )}
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Quest {quest.index}
                </p>
                <h3 className="text-sm font-semibold">{quest.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {quest.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-[11px] font-medium text-muted-foreground">
                  {isCompleted ? "Completed • XP awarded" : "Incomplete • +50 XP"}
                </p>
                <Button
                  size="sm"
                  variant={isCompleted ? "secondary" : "default"}
                  onClick={() => onQuestClick(mission.id, quest.id)}
                >
                  {isCompleted ? "View Quest" : "Start Quest"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
