import { Header } from "@/components/Header";
import { TruthVault } from "@/components/TruthVault";
import { Footer } from "@/components/Footer";

const TruthVaultPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TruthVault />
      </main>
      <Footer />
    </div>
  );
};

export default TruthVaultPage;
