import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MissionHub } from "@/components/MissionHub";
import { CivicProfile } from "@/components/CivicProfile";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {user && (
          <section className="py-8">
            <div className="container">
              <CivicProfile />
            </div>
          </section>
        )}
        <MissionHub />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
