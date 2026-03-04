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

interface MissionStepperProps {
  mission: Mission;
  activeQuestId?: string;
  onQuestChange: (questId: string) => void;
  onMarkComplete: (questId: string) => void;
}

export function MissionStepper({
  mission,
  activeQuestId,
  onQuestChange,
  onMarkComplete,
}: MissionStepperProps) {
  const quests = mission.quests.sort((a, b) => a.index - b.index);
  const activeQuest =
    quests.find((q) => q.id === activeQuestId) ?? quests[0];

  const completedCount = quests.filter((q) => q.completed).length;
  const total = quests.length;
  const progress = (completedCount / total) * 100;

  const currentIndex = quests.findIndex((q) => q.id === activeQuest.id);

  const goPrev = () => {
    if (currentIndex > 0) onQuestChange(quests[currentIndex - 1].id);
  };

  const goNext = () => {
    if (currentIndex < quests.length - 1)
      onQuestChange(quests[currentIndex + 1].id);
  };

  return (
    <section className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Mission {mission.index}
        </p>
        <h2 className="text-xl font-bold">{mission.title}</h2>
        {mission.subtitle && (
          <p className="text-sm text-muted-foreground">{mission.subtitle}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            {completedCount}/{total} quests complete
          </p>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-yellow-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <ol className="flex items-center justify-between gap-2">
        {quests.map((quest) => {
          const isActive = quest.id === activeQuest.id;
          const isCompleted = quest.completed;
          return (
            <li
              key={quest.id}
              className="flex flex-1 flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => onQuestChange(quest.id)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isCompleted && "border-green-500 bg-green-50 text-green-700",
                  isActive && "border-yellow-500 bg-yellow-100 text-yellow-900",
                  !isCompleted && !isActive && "border-muted-foreground/30"
                )}
              >
                {quest.index}
              </button>
              <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                {quest.title}
              </p>
            </li>
          );
        })}
      </ol>

      <article className="space-y-3 rounded-lg border bg-background p-4">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Quest {activeQuest.index}
        </p>
        <h3 className="text-base font-semibold">{activeQuest.title}</h3>
        <p className="text-sm text-muted-foreground">
          {activeQuest.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-medium text-muted-foreground">
            {activeQuest.completed
              ? "Completed • XP awarded"
              : "Complete this quest to earn +50 XP"}
          </p>
          <div className="flex gap-2">
            {!activeQuest.completed && (
              <Button
                size="sm"
                variant="mission"
                onClick={() => onMarkComplete(activeQuest.id)}
              >
                Mark Quest Complete
              </Button>
            )}
          </div>
        </div>
      </article>

      <footer className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentIndex === 0}
          onClick={goPrev}
        >
          Previous Quest
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={currentIndex === quests.length - 1}
          onClick={goNext}
        >
          Next Quest
        </Button>
      </footer>
    </section>
  );
}
