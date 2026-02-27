import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mpDatabase, emailTemplates, missions } from "@/data/accountabilityData";
import { Mail, Copy, Check, MapPin, User, Search } from "lucide-react";
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
      // Fallback demo MP
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
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            // Take Action
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
          One-Click Action Center
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto text-sm mb-10">
          Enter your postal code to find your MP. Choose a mission. Get a ready-to-send email with verified sources.
        </p>

        {/* Postal Code Lookup */}
        <div className="rounded-lg border border-border p-6" style={{ background: "hsl(220 15% 10%)" }}>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter postal code (e.g. K1A, M5V)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && lookupMP()}
                className="pl-10 font-mono bg-background border-border"
                maxLength={7}
              />
            </div>
            <Button onClick={lookupMP} className="font-mono gap-2">
              <Search className="h-4 w-4" /> Find MP
            </Button>
          </div>

          {foundMP && (
            <div className="animate-fade-in">
              {/* MP Card */}
              <div className="rounded-md border border-border p-4 mb-6 flex items-center gap-4" style={{ background: "hsl(220 12% 8%)" }}>
                <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "hsl(220 12% 16%)" }}>
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold">{foundMP.name}</div>
                  <div className="text-sm text-muted-foreground">{foundMP.riding} · {foundMP.party}</div>
                  <div className="text-xs font-mono text-muted-foreground">{foundMP.email}</div>
                </div>
              </div>

              {/* Mission selector */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {missions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMission(m.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all border ${
                      selectedMission === m.id
                        ? "border-foreground/40 bg-secondary text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/20"
                    }`}
                  >
                    {m.id === "gaza" ? "🇵🇸 Gaza" : m.id === "water" ? "💧 Water" : "🍞 Food"}
                  </button>
                ))}
              </div>

              {/* Generated script */}
              <div className="relative">
                <pre
                  className="rounded-md border border-border p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto"
                  style={{ background: "hsl(220 12% 6%)", color: "hsl(0 0% 80%)" }}
                >
                  {getScript()}
                </pre>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant="outline" className="text-[9px] font-mono border-[hsl(142_70%_45%/0.4)] text-[hsl(142_70%_55%)]">
                    Sources: Verified ✓
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button onClick={copyToClipboard} className="font-mono gap-2 flex-1">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
                <Button variant="outline" asChild className="font-mono gap-2">
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
