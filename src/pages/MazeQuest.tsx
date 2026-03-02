import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    // Award XP
    if (user) {
      await addXP("maze_quest_water", "water", 200);
    }
    // Short delay then open petition
    setTimeout(() => {
      window.open("https://petitions.ourcommons.ca", "_blank");
      navigate("/quest?mission=water");
    }, 1500);
  };

  if (!charId) return null;

  return (
    <div className="min-h-screen flex flex-col scanline-overlay">
      <Header />
      <main className="flex-1">
        {completed ? (
          <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
            <div className="ff-panel p-8 text-center max-w-md">
              <div className="text-4xl mb-4">🏆</div>
              <h2 className="font-heading text-xs uppercase text-accent mb-2">Quest Complete!</h2>
              <p className="font-body text-sm text-muted-foreground mb-4">
                You navigated the maze of bureaucracy and found the key!
                Now sign the petition to help First Nations communities get clean water.
              </p>
              <div className="ff-panel px-4 py-2 inline-flex items-center gap-2 text-accent">
                <span className="font-heading text-sm">+200 XP</span>
              </div>
            </div>
          </div>
        ) : (
          <MazeGame characterId={charId} onComplete={handleComplete} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MazeQuest;
