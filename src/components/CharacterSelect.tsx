import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sword, Wand2, Target, Rocket, Shield, Zap, Heart, Star } from "lucide-react";
import { characterMap } from "@/data/characters";
import { useAuth } from "@/hooks/useAuth";

import charSwordsmaster from "@/assets/char-swordsmaster.png";
import charWizard from "@/assets/char-wizard.png";
import charArcher from "@/assets/char-archer.png";
import charAstronaut from "@/assets/char-astronaut.png";

interface FullCharacter {
  id: string;
  name: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  stats: { label: string; value: number; icon: React.ReactNode }[];
  ability: string;
}

const characters: FullCharacter[] = [
  {
    id: "swordsmaster",
    name: "Cedric",
    title: "Swordsmaster",
    image: charSwordsmaster,
    icon: <Sword className="h-5 w-5" />,
    description: "A fearless knight who cuts through corruption with the blade of truth. Bonus XP on petition actions.",
    stats: [
      { label: "STR", value: 9, icon: <Sword className="h-3 w-3" /> },
      { label: "DEF", value: 8, icon: <Shield className="h-3 w-3" /> },
      { label: "SPD", value: 5, icon: <Zap className="h-3 w-3" /> },
      { label: "LCK", value: 4, icon: <Star className="h-3 w-3" /> },
    ],
    ability: "Petition Strike — +50% XP on signed petitions",
  },
  {
    id: "wizard",
    name: "Thalwyn",
    title: "Wizard",
    image: charWizard,
    icon: <Wand2 className="h-5 w-5" />,
    description: "An ancient sage who wields knowledge as power. Bonus XP on research and truth-finding quests.",
    stats: [
      { label: "INT", value: 10, icon: <Wand2 className="h-3 w-3" /> },
      { label: "WIS", value: 8, icon: <Star className="h-3 w-3" /> },
      { label: "SPD", value: 4, icon: <Zap className="h-3 w-3" /> },
      { label: "HP", value: 5, icon: <Heart className="h-3 w-3" /> },
    ],
    ability: "Truth Spell — +50% XP on research actions",
  },
  {
    id: "archer",
    name: "Sylva",
    title: "Archer",
    image: charArcher,
    icon: <Target className="h-5 w-5" />,
    description: "A swift ranger who never misses a target. Bonus XP on social sharing and spreading awareness.",
    stats: [
      { label: "DEX", value: 9, icon: <Target className="h-3 w-3" /> },
      { label: "SPD", value: 9, icon: <Zap className="h-3 w-3" /> },
      { label: "STR", value: 5, icon: <Sword className="h-3 w-3" /> },
      { label: "LCK", value: 6, icon: <Star className="h-3 w-3" /> },
    ],
    ability: "Spread Shot — +50% XP on social shares",
  },
  {
    id: "astronaut",
    name: "Nova",
    title: "Astronaut",
    image: charAstronaut,
    icon: <Rocket className="h-5 w-5" />,
    description: "A cosmic explorer who sees the big picture. Bonus XP on attending protests and community events.",
    stats: [
      { label: "END", value: 8, icon: <Shield className="h-3 w-3" /> },
      { label: "INT", value: 7, icon: <Wand2 className="h-3 w-3" /> },
      { label: "CHA", value: 9, icon: <Heart className="h-3 w-3" /> },
      { label: "LCK", value: 7, icon: <Star className="h-3 w-3" /> },
    ],
    ability: "Rally Boost — +50% XP on protest attendance",
  },
];

export const CharacterSelect = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const { user, setCharacter } = useAuth();

  const selected = characters.find((c) => c.id === selectedId);

  const handleConfirm = async () => {
    if (!selectedId) return;
    setConfirmed(true);
    // Persist to DB if logged in, otherwise just localStorage
    if (user) {
      await setCharacter(selectedId);
    } else {
      localStorage.setItem("selectedCharacter", selectedId);
    }
    setTimeout(() => navigate("/quest"), 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
      <div className="container max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="font-heading text-base md:text-lg uppercase tracking-tight text-accent mb-2">
            ▶ Choose Your Character
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Each hero brings unique strengths to the fight for democracy.
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {characters.map((char, i) => (
            <button
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`ff-panel p-4 text-center transition-all duration-300 animate-fade-in group ${
                selectedId === char.id
                  ? "border-accent scale-[1.03] shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
                  : "hover:border-primary/50 hover:scale-[1.01]"
              }`}
              style={{
                animationDelay: `${i * 100}ms`,
                borderColor: selectedId === char.id ? "hsl(var(--accent))" : undefined,
              }}
            >
              <div className={`font-heading text-xs text-accent mb-2 h-4 transition-opacity ${selectedId === char.id ? "opacity-100" : "opacity-0"}`}>
                ▶
              </div>
              <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-3">
                <img
                  src={char.image}
                  alt={char.title}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    selectedId === char.id ? "drop-shadow-[0_0_12px_hsl(var(--accent)/0.6)]" : "grayscale-[30%] group-hover:grayscale-0"
                  }`}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div className="font-heading text-[8px] md:text-[9px] uppercase text-foreground mb-0.5">
                {char.name}
              </div>
              <div className="flex items-center justify-center gap-1 text-primary">
                {char.icon}
                <span className="font-body text-xs uppercase">{char.title}</span>
              </div>
              <div className="mt-3 space-y-1">
                {char.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <span className="font-body text-[9px] text-muted-foreground w-7 text-right">{stat.label}</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-sm overflow-hidden">
                      <div
                        className="h-full hp-bar rounded-sm transition-all duration-700"
                        style={{ width: `${stat.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Character Detail */}
        {selected && (
          <div className="ff-panel p-6 animate-fade-in max-w-2xl mx-auto">
            <div className="flex items-start gap-5">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-20 h-20 object-contain shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading text-[9px] uppercase text-foreground">{selected.name}</span>
                  <span className="font-body text-xs text-primary">— {selected.title}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground mb-3">{selected.description}</p>
                <div className="ff-panel px-3 py-2 inline-flex items-center gap-2">
                  <Zap className="h-3 w-3 text-accent" />
                  <span className="font-body text-[10px] uppercase text-accent">{selected.ability}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={confirmed}
              className={`w-full mt-6 ff-panel px-6 py-3 font-heading text-[10px] uppercase tracking-wider transition-all ${
                confirmed
                  ? "text-accent animate-pulse border-accent"
                  : "text-foreground hover:text-accent hover:border-accent"
              }`}
              style={confirmed ? { borderColor: "hsl(var(--accent))" } : {}}
            >
              {confirmed ? "▶ Loading Quest..." : `▶ Select ${selected.name} & Begin`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
