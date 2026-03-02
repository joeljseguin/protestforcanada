import charSwordsmaster from "@/assets/char-swordsmaster.png";
import charWizard from "@/assets/char-wizard.png";
import charArcher from "@/assets/char-archer.png";
import charAstronaut from "@/assets/char-astronaut.png";

export interface CharacterData {
  id: string;
  name: string;
  title: string;
  image: string;
}

export const characterMap: Record<string, CharacterData> = {
  swordsmaster: { id: "swordsmaster", name: "Cedric", title: "Swordsmaster", image: charSwordsmaster },
  wizard: { id: "wizard", name: "Thalwyn", title: "Wizard", image: charWizard },
  archer: { id: "archer", name: "Sylva", title: "Archer", image: charArcher },
  astronaut: { id: "astronaut", name: "Nova", title: "Astronaut", image: charAstronaut },
};

export const getSelectedCharacter = (): CharacterData | null => {
  const id = localStorage.getItem("selectedCharacter");
  return id ? characterMap[id] ?? null : null;
};
