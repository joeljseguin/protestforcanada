import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mpDatabase, emailTemplates } from "@/data/accountabilityData";
import { missions } from "@/data/gameData";
import { Mail, Copy, Check, MapPin, User, Search, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ActionCenter = () => {
  const [postalCode, setPostalCode] = useState("");
  const [selectedMission, setSelectedMission] = useState("gaza");
  const [foundMP, setFoundMP] = useState<{ name: string; party: string; riding: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const lookupMP = () => {
    const prefix = postalCode.trim().toUpperCase().slice(0, 3);
    const mp = mpDatabase[prefix];
    if (mp) {
      setFoundMP(mp);
    } else {
      setFoundMP({
        name: "Your Local MP",
        party: "—",
        riding: "Your Riding",
        email: "mp@parl.gc.ca",
      });
      toast({
        title: "Demo Mode",
        description: "Using placeholder MP. In production, this queries the Parliament API.",
      });
    }
  };

  const getScript = () => {
    if (!foundMP) return "";
    return (emailTemplates[selectedMission] || emailTemplates.gaza)
      .replace("[MP_NAME]", foundMP.name)
      .replace("[RIDING]", foundMP.riding)
      .replace("[YOUR_NAME]", "[Your Name]");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getScript());
    setCopied(true);
    toast({ title: "Copied!", description: "Email script copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="action" className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-center mb-2">
          Email Your MP
        </h2>
        <p className="text-center text-muted-foreground font-mono text-sm mb-10">
          Enter postal code → Find MP → Get verified email script → <span className="font-bold">+100 XP</span>
        </p>

        <div className="neu-border neu-shadow p-6 bg-card">
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter postal code (e.g. K1A, M5V)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && lookupMP()}
                className="pl-10 font-mono neu-border h-12"
                maxLength={7}
              />
            </div>
            <Button onClick={lookupMP} className="font-mono gap-2 neu-border neu-shadow-sm uppercase tracking-wider">
              <Search className="h-4 w-4" /> Find MP
            </Button>
          </div>

          {foundMP && (
            <div className="animate-fade-in">
              <div className="neu-border p-4 mb-6 flex items-center gap-4 bg-secondary">
                <div className="h-12 w-12 neu-border rounded-full flex items-center justify-center bg-foreground text-background">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold font-heading uppercase">{foundMP.name}</div>
                  <div className="text-sm text-muted-foreground font-mono">{foundMP.riding} · {foundMP.party}</div>
                  <div className="text-xs font-mono text-muted-foreground">{foundMP.email}</div>
                </div>
                <div className="ml-auto neu-border px-3 py-1.5 bg-card font-mono text-xs font-bold flex items-center gap-1">
                  <Zap className="h-3 w-3" /> +100 XP
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {["gaza", "water", "food"].map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMission(id)}
                    className={`px-3 py-1.5 neu-border text-xs font-mono uppercase tracking-wider transition-all ${
                      selectedMission === id
                        ? "bg-foreground text-background"
                        : "bg-card hover:bg-secondary"
                    }`}
                  >
                    {id === "gaza" ? "🇵🇸 Gaza" : id === "water" ? "💧 Water" : "🍞 Food"}
                  </button>
                ))}
              </div>

              <div className="relative">
                <pre className="neu-border p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto bg-muted">
                  {getScript()}
                </pre>
                <div className="absolute top-3 right-3">
                  <Badge className="text-[9px] font-mono neu-border bg-secondary text-foreground">
                    Sources: Verified ✓
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button onClick={copyToClipboard} className="font-mono gap-2 flex-1 neu-border neu-shadow-sm uppercase tracking-wider">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
                <Button variant="outline" asChild className="font-mono gap-2 neu-border">
                  <a href={`mailto:${foundMP.email}?subject=Constituent Concern&body=${encodeURIComponent(getScript())}`}>
                    <Mail className="h-4 w-4" /> Open Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
