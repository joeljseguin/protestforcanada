import { Header } from "@/components/Header";
import { MissionQuest } from "@/components/MissionQuest";
import { Footer } from "@/components/Footer";

const Quest = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <MissionQuest />
      <Footer />
    </div>
  );
};

export default Quest;
