import { Header } from "@/components/Header";
import { InfluenceNetwork } from "@/components/InfluenceNetwork";
import { Footer } from "@/components/Footer";

const PowerMap = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <InfluenceNetwork />
      </main>
      <Footer />
    </div>
  );
};

export default PowerMap;
