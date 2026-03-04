import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, CheckCircle, AlertTriangle } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasRecoveryToken, setHasRecoveryToken] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event which fires when user clicks the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setHasRecoveryToken(true);
      }
    });

    // Also check the URL hash for type=recovery (in case event already fired)
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setHasRecoveryToken(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/quest", { replace: true }), 2000);
    }
    setLoading(false);
  };

  if (!hasRecoveryToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="neu-border neu-shadow-lg bg-background p-8 max-w-md w-full text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <h2 className="font-heading font-extrabold text-xl uppercase mb-2">Invalid Reset Link</h2>
          <p className="text-sm font-mono text-muted-foreground mb-4">
            This link is expired or invalid. Please request a new password reset.
          </p>
          <Button onClick={() => navigate("/")} className="neu-border neu-shadow-sm font-mono uppercase text-sm">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="neu-border neu-shadow-lg bg-background p-8 max-w-md w-full text-center">
          <CheckCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
          <h2 className="font-heading font-extrabold text-xl uppercase mb-2">Password Updated</h2>
          <p className="text-sm font-mono text-muted-foreground">Redirecting you now…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="neu-border neu-shadow-lg bg-background p-8 max-w-md w-full">
        <h2 className="font-heading font-extrabold text-xl uppercase mb-1">Set New Password</h2>
        <p className="text-xs font-mono text-muted-foreground mb-6">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 font-mono neu-border h-12"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 font-mono neu-border h-12"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="neu-border p-3 bg-destructive/10 flex items-center gap-2 text-sm font-mono">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full h-12 font-mono uppercase tracking-wider text-sm neu-border neu-shadow-sm">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
