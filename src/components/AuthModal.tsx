import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { X, Swords, Zap, MapPin, Mail, Lock, AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp, signIn } = useAuth();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      if (!postalCode.trim()) {
        setError("Postal code is required to map your MP.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, postalCode.toUpperCase());
      if (error) {
        setError(error);
      } else {
        setSuccess(true);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 p-4">
      <div className="relative w-full max-w-md neu-border neu-shadow-lg bg-background p-8 animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 neu-border p-1.5 hover:bg-secondary transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 neu-border flex items-center justify-center bg-foreground">
            <Swords className="h-5 w-5 text-background" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl uppercase">
              {mode === "signup" ? "Join the Resistance" : "Welcome Back"}
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              {mode === "signup" ? "Create your civic profile" : "Sign in to continue"}
            </p>
          </div>
        </div>

        {success ? (
          <div className="neu-border p-6 bg-secondary text-center">
            <Mail className="h-8 w-8 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg uppercase mb-2">Check Your Email</h3>
            <p className="text-sm font-mono text-muted-foreground">
              We sent a verification link. Click it to activate your civic profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@resistance.ca"
                  className="pl-10 font-mono neu-border h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">Password</label>
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

            {mode === "signup" && (
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1 block">
                  Postal Code <span className="text-threat-red">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                    placeholder="K1A 0A6"
                    className="pl-10 font-mono neu-border h-12"
                    maxLength={7}
                    required
                  />
                </div>
                <p className="text-[10px] font-mono text-muted-foreground mt-1">Used to map your nearest MP</p>
              </div>
            )}

            {error && (
              <div className="neu-border p-3 bg-destructive/10 flex items-center gap-2 text-sm font-mono">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-mono uppercase tracking-wider text-sm neu-border neu-shadow-sm"
            >
              {loading ? "Processing..." : mode === "signup" ? (
                <><Zap className="h-4 w-4 mr-2" /> Join & Earn 100 XP</>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); }}
                className="text-xs font-mono text-muted-foreground hover:text-foreground underline"
              >
                {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Join the Resistance"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
