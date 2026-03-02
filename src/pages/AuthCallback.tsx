import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase will automatically pick up the tokens from the URL hash
    // via onAuthStateChange. We just need to wait for the session.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/quest", { replace: true });
      } else {
        // Give onAuthStateChange a moment to process the hash
        const timeout = setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === "SIGNED_IN") {
            clearTimeout(timeout);
            navigate("/quest", { replace: true });
          }
        });

        return () => {
          clearTimeout(timeout);
          subscription.unsubscribe();
        };
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background scanline-overlay">
      <div className="ff-panel p-8 text-center animate-pulse">
        <div className="text-3xl mb-3">⚔️</div>
        <h2 className="font-heading text-[10px] uppercase text-accent mb-2">Verifying Identity...</h2>
        <p className="font-body text-xs text-muted-foreground">Joining the Resistance</p>
      </div>
    </div>
  );
};

export default AuthCallback;
