import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AccountabilityMap } from "@/components/AccountabilityMap";
import { MissionHub } from "@/components/MissionHub";
import { ActionCenter } from "@/components/ActionCenter";
import { TopicDashboard } from "@/components/TopicDashboard";
import { AccountabilityTracker } from "@/components/AccountabilityTracker";
import { PublicOversight } from "@/components/PublicOversight";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AccountabilityMap />
        <MissionHub />
        <ActionCenter />
        <TopicDashboard />
        <AccountabilityTracker />
        <PublicOversight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
