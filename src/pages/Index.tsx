import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TopicDashboard } from "@/components/TopicDashboard";
import { AccountabilityTracker } from "@/components/AccountabilityTracker";
import { ActionHub } from "@/components/ActionHub";
import { PublicOversight } from "@/components/PublicOversight";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TopicDashboard />
        <AccountabilityTracker />
        <ActionHub />
        <PublicOversight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
