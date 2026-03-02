import { useState } from "react";
import { dossierEntries } from "@/data/gameData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, Building2, Sparkles, User, Phone, Mail, Globe } from "lucide-react";

const categoryConfig: Record<string, { label: string; icon: any; bg: string }> = {
  terminology: { label: "Terminology", icon: BookOpen, bg: "bg-muted" },
  organization: { label: "Organization", icon: Building2, bg: "bg-secondary" },
  person: { label: "Person", icon: User, bg: "bg-muted" },
  special: { label: "Special", icon: Sparkles, bg: "bg-secondary" },
};

export const TruthVault = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = dossierEntries.filter((entry) => {
    const matchesSearch = !search || entry.term.toLowerCase().includes(search.toLowerCase()) || entry.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2">
          The Truth Vault
        </h2>
        <p className="text-muted-foreground font-mono text-sm mb-8 max-w-2xl">
          Searchable dossiers on people, terminology, organizations, and how this platform was built. Includes phone numbers, emails, and chain of command.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dossiers... (e.g. Per Bank, LTDWA, Anand)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 font-mono neu-border h-12"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`neu-border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${!activeCategory ? "bg-foreground text-background" : "bg-card"}`}
            >
              All
            </button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`neu-border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${activeCategory === key ? "bg-foreground text-background" : "bg-card"}`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {filtered.map((entry, i) => {
            const config = categoryConfig[entry.category];
            const Icon = config.icon;
            return (
              <div
                key={entry.id}
                className="neu-border p-6 bg-card animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 neu-border flex items-center justify-center ${config.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-heading font-extrabold text-lg uppercase">{entry.term}</h3>
                      <Badge className="neu-border text-[10px] font-mono uppercase tracking-wider bg-muted text-foreground">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{entry.definition}</p>
                    {entry.details && (
                      <p className="text-sm text-muted-foreground font-mono mt-2 neu-border p-3 bg-muted">
                        {entry.details}
                      </p>
                    )}

                    {/* Contact Info */}
                    {entry.contactInfo && (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entry.contactInfo.phone && (
                          <a href={`tel:${entry.contactInfo.phone}`} className="flex items-center gap-2 neu-border px-3 py-2 text-xs font-mono hover:bg-secondary transition-colors">
                            <Phone className="h-3 w-3 shrink-0" /> {entry.contactInfo.phone}
                          </a>
                        )}
                        {entry.contactInfo.email && (
                          <a href={`mailto:${entry.contactInfo.email}`} className="flex items-center gap-2 neu-border px-3 py-2 text-xs font-mono hover:bg-secondary transition-colors">
                            <Mail className="h-3 w-3 shrink-0" /> {entry.contactInfo.email}
                          </a>
                        )}
                        {entry.contactInfo.website && (
                          <a href={entry.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 neu-border px-3 py-2 text-xs font-mono hover:bg-secondary transition-colors">
                            <Globe className="h-3 w-3 shrink-0" /> Website
                          </a>
                        )}
                        {entry.contactInfo.assistant && (
                          <div className="flex items-center gap-2 neu-border px-3 py-2 text-xs font-mono bg-muted">
                            <User className="h-3 w-3 shrink-0" /> {entry.contactInfo.assistant}
                          </div>
                        )}
                        {entry.contactInfo.reportsTo && (
                          <div className="flex items-center gap-2 neu-border px-3 py-2 text-xs font-mono bg-muted md:col-span-2">
                            ↑ Reports to: {entry.contactInfo.reportsTo}
                          </div>
                        )}
                      </div>
                    )}

                    {entry.sourceUrl && (
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-muted-foreground hover:text-foreground neu-border px-2 py-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Verify Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="neu-border p-12 text-center bg-card">
              <p className="text-muted-foreground font-mono">No dossiers match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
