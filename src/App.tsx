import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import PowerMap from "./pages/PowerMap";
import Quest from "./pages/Quest";
import TruthVaultPage from "./pages/TruthVaultPage";
import SelectCharacter from "./pages/SelectCharacter";
import MazeQuest from "./pages/MazeQuest";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/power-map" element={<PowerMap />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/truth-vault" element={<TruthVaultPage />} />
            <Route path="/select-character" element={<SelectCharacter />} />
            <Route path="/maze-quest" element={<MazeQuest />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
