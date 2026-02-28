import { Header } from "@/components/Header";
import { MissionQuest } from "@/components/MissionQuest";
import { Footer } from "@/components/Footer";

const Quest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MissionQuest />
      </main>
      <Footer />
    </div>
  );
};

export default Quest;
