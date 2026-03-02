import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MazeGame } from "@/components/MazeGame";
import { useAuth } from "@/hooks/useAuth";
import { questComplete } from "@/lib/retroSfx";

const MazeQuest = () => {
  const navigate = useNavigate();
  const { user, addXP, profile } = useAuth();
  const charId = profile?.selected_character || localStorage.getItem("selectedCharacter");
  const [completed, setCompleted] = useState(false);

  // Gate: no character → redirect
  useEffect(() => {
    if (!charId) navigate("/select-character");
  }, [charId, navigate]);

  const handleComplete = async () => {
    setCompleted(true);
    if (user) {
      await addXP("maze_quest_water", "water", 200);
    }
    setTimeout(() => {
      window.open("https://petitions.ourcommons.ca", "_blank");
      navigate("/quest?mission=water");
    }, 2000);
  };

  if (!charId) return null;

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background scanline-overlay">
        <div className="ff-panel p-8 text-center max-w-md animate-fade-in">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="font-heading text-sm uppercase text-accent mb-2">Quest Complete!</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">
            You navigated the forest of bureaucracy and found the key!
            Signing the petition to help First Nations communities get clean water...
          </p>
          <div className="ff-panel px-4 py-2 inline-flex items-center gap-2 text-accent animate-pulse-gold">
            <span className="font-heading text-sm">+200 XP</span>
          </div>
        </div>
      </div>
    );
  }

  return <MazeGame characterId={charId} onComplete={handleComplete} />;
};

export default MazeQuest;
