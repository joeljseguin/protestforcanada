import { useState } from "react";
import { dossierEntries } from "@/data/gameData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, Building2, Sparkles, User, Phone, Mail, Globe } from "lucide-react";

const categoryConfig: Record<string, { label: string; icon: any; emoji: string }> = {
  terminology: { label: "Terminology", icon: BookOpen, emoji: "📖" },
  organization: { label: "Organization", icon: Building2, emoji: "🏛" },
  person: { label: "Person", icon: User, emoji: "👤" },
  special: { label: "Special", icon: Sparkles, emoji: "✨" },
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
    <div className="py-12 md:py-20">
      <div className="container">
        <h2 className="font-heading text-sm md:text-base uppercase tracking-tight text-primary mb-2">
          📖 The Truth Vault
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-8 max-w-2xl">
          Searchable dossiers on people, terminology, organizations. Includes phone numbers, emails, and chain of command.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dossiers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 font-body ff-panel h-12"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`ff-panel px-4 py-2 font-body text-xs uppercase tracking-wider transition-all ${!activeCategory ? "text-accent" : "text-muted-foreground"}`}
              style={!activeCategory ? { borderColor: "hsl(45 100% 60%)" } : {}}
            >
              {!activeCategory && "▶ "}All
            </button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={`ff-panel px-4 py-2 font-body text-xs uppercase tracking-wider transition-all ${activeCategory === key ? "text-accent" : "text-muted-foreground"}`}
                style={activeCategory === key ? { borderColor: "hsl(45 100% 60%)" } : {}}
              >
                {activeCategory === key && "▶ "}{config.emoji} {config.label}
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
                className="ff-panel p-6 animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 ff-panel flex items-center justify-center text-lg">
                    {config.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-body font-bold text-base uppercase text-foreground">{entry.term}</h3>
                      <Badge className="text-[10px] font-body uppercase tracking-wider border border-border bg-secondary text-foreground">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm font-body text-foreground/80 mb-2">{entry.definition}</p>
                    {entry.details && (
                      <p className="text-sm text-muted-foreground font-body mt-2 ff-panel p-3">
                        {entry.details}
                      </p>
                    )}

                    {entry.contactInfo && (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {entry.contactInfo.phone && (
                          <a href={`tel:${entry.contactInfo.phone}`} className="flex items-center gap-2 ff-panel px-3 py-2 text-xs font-body hover:text-accent transition-colors">
                            <Phone className="h-3 w-3 shrink-0" /> {entry.contactInfo.phone}
                          </a>
                        )}
                        {entry.contactInfo.email && (
                          <a href={`mailto:${entry.contactInfo.email}`} className="flex items-center gap-2 ff-panel px-3 py-2 text-xs font-body hover:text-accent transition-colors">
                            <Mail className="h-3 w-3 shrink-0" /> {entry.contactInfo.email}
                          </a>
                        )}
                        {entry.contactInfo.website && (
                          <a href={entry.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 ff-panel px-3 py-2 text-xs font-body hover:text-accent transition-colors">
                            <Globe className="h-3 w-3 shrink-0" /> Website
                          </a>
                        )}
                        {entry.contactInfo.assistant && (
                          <div className="flex items-center gap-2 ff-panel px-3 py-2 text-xs font-body">
                            <User className="h-3 w-3 shrink-0" /> {entry.contactInfo.assistant}
                          </div>
                        )}
                        {entry.contactInfo.reportsTo && (
                          <div className="flex items-center gap-2 ff-panel px-3 py-2 text-xs font-body md:col-span-2">
                            ↑ Reports to: {entry.contactInfo.reportsTo}
                          </div>
                        )}
                      </div>
                    )}

                    {entry.sourceUrl && (
                      <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs font-body text-muted-foreground hover:text-primary ff-panel px-2 py-1">
                        <ExternalLink className="h-3 w-3" /> Verify Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="ff-panel p-12 text-center">
              <p className="text-muted-foreground font-body">No dossiers found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
