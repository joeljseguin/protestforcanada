import { Header } from "@/components/Header";
import { CharacterSelect } from "@/components/CharacterSelect";
import { Footer } from "@/components/Footer";

const SelectCharacter = () => {
  return (
    <div className="min-h-screen flex flex-col scanline-overlay">
      <Header />
      <main className="flex-1">
        <CharacterSelect />
      </main>
      <Footer />
    </div>
  );
};

export default SelectCharacter;
