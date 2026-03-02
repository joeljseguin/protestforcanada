import { useState, useEffect } from "react";
import { missions, calendarEvents, threatColors } from "@/data/gameData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Phone, Pen, Calendar, MapPin, Users, AlertTriangle, CheckCircle2, Circle, FileText, Clock, Gamepad2, Mail, Share2, Megaphone, Copy } from "lucide-react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getCharacterSfx, menuSelect } from "@/lib/retroSfx";
import { ActionCenter } from "./ActionCenter";
import { ProtestMap } from "./ProtestMap";
import { StageActionDialog } from "./StageActionDialog";
import { getStageActions } from "@/data/stageActions";
import type { StageConfig } from "@/data/stageActions";
import { useAuth } from "@/hooks/useAuth";
import { characterMap, getSelectedCharacter } from "@/data/characters";
import { PetitionRedirectDialog } from "./PetitionRedirectDialog";
import { PetitionTicker } from "./PetitionTicker";

export const MissionQuest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeMissionId = searchParams.get("mission") || missions[0].id;
  const [expandedMission, setExpandedMission] = useState<string | null>(activeMissionId);
  const [activeTab, setActiveTab] = useState<"overview" | "truth" | "action">("overview");
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [activeStageConfig, setActiveStageConfig] = useState<StageConfig | null>(null);
  const [petitionDialog, setPetitionDialog] = useState<{
    url: string; missionId: string; missionName: string; petitionLabel: string; xp: number;
  } | null>(null);
  const { profile, user, addXP } = useAuth();
  const { toast } = useToast();

  // Resolve character: DB profile > localStorage fallback
  const charId = profile?.selected_character || localStorage.getItem("selectedCharacter");
  const character = charId ? characterMap[charId] ?? null : null;
  const playSfx = getCharacterSfx(charId);

  // Gate: no hero selected → redirect
  useEffect(() => {
    if (!charId) navigate("/select-character");
  }, [charId, navigate]);

  const mission = missions.find((m) => m.id === expandedMission) || missions[0];

  const handleStatXP = async (statLabel: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Join the Resistance to earn XP.", variant: "destructive" });
      return;
    }
    await addXP("view_stat", `stat-${mission.id}-${statLabel}`, 15);
    toast({ title: "+15 XP Earned!", description: `Reviewed: ${statLabel}` });
  };

  if (!charId) return null;

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <h2 className="font-heading text-sm md:text-base uppercase tracking-tight text-primary mb-2">
              📜 Mission Quest
            </h2>
            <p className="text-muted-foreground font-body text-sm max-w-2xl">
              Select a mission. See the human cost. Read the truth. Take action. Earn XP.
            </p>
          </div>
          {character ? (
            <Link to="/select-character" className="ff-panel px-4 py-3 flex items-center gap-3 hover:border-accent transition-colors group">
              <img
                src={character.image}
                alt={character.title}
                className="w-10 h-10 object-contain group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                style={{ imageRendering: "pixelated" }}
              />
              <div>
                <div className="font-heading text-[8px] uppercase text-foreground">{character.name}</div>
                <div className="font-body text-[10px] text-primary uppercase">{character.title}</div>
              </div>
            </Link>
          ) : (
            <Link
              to="/select-character"
              className="ff-panel px-4 py-3 font-heading text-[9px] uppercase text-accent hover:border-accent transition-colors animate-pulse"
            >
              ▶ Choose Hero
            </Link>
          )}
        </div>

        {/* Mission Selector — FF4 command menu */}
        <div className="flex flex-wrap gap-2 mb-8">
          {missions.slice(0, 5).map((m) => (
            <button
              key={m.id}
              onClick={() => { playSfx(); setExpandedMission(m.id); setActiveTab("overview"); }}
              className={`ff-panel px-4 py-2 font-body text-xs uppercase tracking-wider transition-all ${
                expandedMission === m.id ? "text-accent border-accent" : "text-muted-foreground hover:text-foreground"
              }`}
              style={expandedMission === m.id ? { borderColor: "hsl(45 100% 60%)" } : {}}
            >
              {expandedMission === m.id && "▶ "}#{m.rank} {m.name}
            </button>
          ))}
        </div>

        {mission && (
          <div className="space-y-6 animate-fade-in">
            {/* Mission Header */}
            <div className="ff-panel p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${threatColors[mission.threatLevel]} text-[10px] font-body border border-border`}>
                      {mission.threatLevel}
                    </Badge>
                    <span className="font-body text-xs text-muted-foreground">RANK #{mission.rank}</span>
                  </div>
                  <h3 className="font-heading text-[10px] md:text-xs uppercase text-foreground">{mission.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{mission.subtitle}</p>
                </div>
                <div className="ff-panel px-4 py-3 text-center">
                  <div className="font-heading text-sm text-accent">+{mission.xpBounty}</div>
                  <div className="font-body text-xs uppercase text-muted-foreground">XP Bounty</div>
                </div>
              </div>

              {/* Play Quest Button — Water mission */}
              {mission.id === "water" && (
                <div className="mt-4">
                  <Link
                    to="/maze-quest"
                    onClick={() => playSfx()}
                    className="ff-panel px-6 py-4 flex items-center justify-center gap-3 animate-pulse-gold hover:scale-[1.02] transition-transform"
                    style={{ borderColor: "hsl(var(--accent))" }}
                  >
                    <Gamepad2 className="h-5 w-5 text-accent" />
                    <span className="font-heading text-[10px] uppercase text-accent">▶ Play Quest — Navigate the Maze of Bureaucracy</span>
                    <span className="ff-panel px-2 py-1 font-body text-[10px] font-bold text-accent">+200 XP</span>
                  </Link>
                </div>
              )}

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {mission.stages.map((stage, i) => {
                    const stageActions = getStageActions(mission.id, stage.label);
                    const isClickable = !!stageActions && stageActions.actions.length > 0;
                    return (
                      <div key={stage.label} className="flex items-center">
                        <button
                          onClick={() => {
                            if (isClickable && stageActions) {
                              playSfx();
                              setActiveStageConfig(stageActions);
                              setStageDialogOpen(true);
                            }
                          }}
                          className={`flex items-center gap-1.5 ${isClickable ? "cursor-pointer hover:text-accent transition-colors" : "cursor-default"}`}
                        >
                          {stage.complete ? <CheckCircle2 className="h-3.5 w-3.5 text-mission-green" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
                          <span className={`text-[10px] font-body uppercase tracking-wider ${stage.complete ? "text-mission-green" : "text-muted-foreground"}`}>
                            {stage.label}
                          </span>
                        </button>
                        {i < mission.stages.length - 1 && <div className="h-px w-3 mx-1 bg-border/40" />}
                      </div>
                    );
                  })}
                </div>
                <div className="h-4 bg-muted rounded-sm overflow-hidden">
                  <div className="h-full hp-bar rounded-sm transition-all duration-1000" style={{ width: `${mission.progress}%` }} />
                </div>
                <div className="text-xs font-body text-muted-foreground mt-1">{mission.progress}% complete</div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => { playSfx(); setActiveTab("overview"); }}
                className={`ff-panel px-5 py-2.5 font-body text-xs uppercase tracking-wider transition-all ${activeTab === "overview" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                style={activeTab === "overview" ? { borderColor: "hsl(45 100% 60%)" } : {}}
              >
                {activeTab === "overview" && "▶ "}<AlertTriangle className="h-3 w-3 inline mr-1.5" /> Overview
              </button>
              {mission.truthTab && (
                <button
                  onClick={() => { playSfx(); setActiveTab("truth"); }}
                  className={`ff-panel px-5 py-2.5 font-body text-xs uppercase tracking-wider transition-all ${activeTab === "truth" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                  style={activeTab === "truth" ? { borderColor: "hsl(45 100% 60%)" } : {}}
                >
                  {activeTab === "truth" && "▶ "}<FileText className="h-3 w-3 inline mr-1.5" /> The Truth
                </button>
              )}
              <button
                onClick={() => { playSfx(); setActiveTab("action"); }}
                className={`ff-panel px-5 py-2.5 font-body text-xs uppercase tracking-wider transition-all ${activeTab === "action" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                style={activeTab === "action" ? { borderColor: "hsl(45 100% 60%)" } : {}}
              >
                {activeTab === "action" && "▶ "}<Megaphone className="h-3 w-3 inline mr-1.5" /> Add Your Voice
              </button>
            </div>

            {activeTab === "overview" ? (
              <>
                {/* Human Cost */}
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-4 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" /> Level Up Your XP to Complete the Missions
                  </h4>
                  <ul className="space-y-3">
                    {mission.humanCost.map((item, i) => {
                      const link = mission.humanCostLinks?.[i];
                      return (
                        <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground">
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="shrink-0 w-6 h-6 ff-panel flex items-center justify-center text-[10px] font-bold text-accent hover:bg-accent hover:text-background transition-colors" title="Read source article">
                              {i + 1}
                            </a>
                          ) : (
                            <span className="shrink-0 w-6 h-6 ff-panel flex items-center justify-center text-[10px] font-bold text-accent">{i + 1}</span>
                          )}
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline decoration-border hover:decoration-accent">
                              {item}
                            </a>
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mission.stats.map((stat) => (
                    <button
                      key={stat.label}
                      onClick={() => {
                        playSfx();
                        handleStatXP(stat.label);
                      }}
                      className="ff-panel p-4 text-left hover:border-accent transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xl md:text-2xl font-heading text-accent">{stat.value}</div>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          <Zap className="h-3 w-3" />+15 XP
                        </span>
                      </div>
                      <div className="text-xs font-bold text-foreground font-body uppercase mb-1">{stat.label}</div>
                      <p className="text-[11px] text-muted-foreground font-body leading-relaxed">{stat.description}</p>
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-3 text-[10px] font-body text-muted-foreground hover:text-primary ff-panel px-2 py-0.5"
                      >
                        <ExternalLink className="h-2.5 w-2.5" /> {stat.source}
                      </a>
                    </button>
                  ))}
                </div>

                {/* Action Center */}
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-6 text-accent">⚔ Surgical Strike — Take Action</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mission.id === "tax" ? (
                      <button
                        onClick={() => { playSfx(); setPetitionDialog({ url: "https://petitions.ourcommons.ca", missionId: mission.id, missionName: mission.name, petitionLabel: "Petition e-6806 — 1% Wealth Tax", xp: 500 }); }}
                        className="md:col-span-3 block w-full"
                      >
                        <div className="ff-panel p-6 animate-pulse-gold text-center cursor-pointer hover:scale-[1.02] transition-transform" style={{ borderColor: "hsl(45 100% 60%)" }}>
                          <Pen className="h-8 w-8 mx-auto mb-2 text-accent" />
                          <div className="font-heading text-[9px] uppercase text-accent">Sign Petition e-6806</div>
                          <div className="font-body text-sm text-muted-foreground mt-1">Tax the Rich — 1% Wealth Tax</div>
                          <div className="mt-3 inline-flex items-center gap-2 ff-panel px-4 py-2 font-body text-sm font-bold text-accent">
                            <Zap className="h-4 w-4" /> +500 XP
                          </div>
                        </div>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => { playSfx(); setPetitionDialog({ url: "https://petitions.ourcommons.ca", missionId: mission.id, missionName: mission.name, petitionLabel: `${mission.name} Petition`, xp: 500 }); }}
                          className="ff-panel p-4 text-center hover:border-accent transition-colors"
                        >
                          <Pen className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <div className="font-bold text-sm uppercase font-body text-foreground">Sign Petition</div>
                          <div className="text-xs text-muted-foreground font-body mt-1">ourcommons.ca</div>
                          <div className="mt-2 font-body text-xs font-bold flex items-center justify-center gap-1 text-accent"><Zap className="h-3 w-3" /> +500 XP</div>
                        </button>
                        <div className="ff-panel p-4 text-center">
                          <Phone className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <div className="font-bold text-sm uppercase font-body text-foreground">Send Dossier to MP</div>
                          <div className="text-xs text-muted-foreground font-body mt-1">Use Action Center</div>
                          <div className="mt-2 font-body text-xs font-bold flex items-center justify-center gap-1 text-accent"><Zap className="h-3 w-3" /> +100 XP</div>
                        </div>
                        <div className="ff-panel p-4 text-center">
                          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <div className="font-bold text-sm uppercase font-body text-foreground">Join Protest</div>
                          <div className="text-xs text-muted-foreground font-body mt-1">See calendar below</div>
                          <div className="mt-2 font-body text-xs font-bold flex items-center justify-center gap-1 text-accent"><Zap className="h-3 w-3" /> +200 XP</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Live Petition Ticker */}
                <PetitionTicker missionId={mission.id} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="ff-panel p-6">
                    <h4 className="font-heading text-[9px] uppercase mb-6 flex items-center gap-2 text-primary">
                      <Calendar className="h-4 w-4" /> Protest Calendar
                    </h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {calendarEvents.map((event) => (
                        <div key={event.id} className="ff-panel p-4 flex items-center gap-4">
                          <div className="shrink-0 text-center ff-panel px-3 py-2">
                            <div className="font-body text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString("en-CA", { month: "short" })}</div>
                            <div className="font-heading text-sm text-accent">{new Date(event.date).getDate()}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm uppercase font-body truncate text-foreground">{event.title}</div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mt-1 flex-wrap">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className="shrink-0 ff-panel px-2 py-1 font-body text-xs font-bold text-accent flex items-center gap-1">
                            <Zap className="h-3 w-3" /> +{event.xpReward}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 font-body uppercase tracking-wider text-xs">
                      + Propose New Event
                    </Button>
                  </div>
                  <ProtestMap />
                </div>

                {/* Source Links */}
                {mission.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {mission.links.map((link) => (
                      <Button key={link.url} variant="outline" size="sm" asChild className="font-body text-xs uppercase tracking-wider">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1.5" /> {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : activeTab === "action" ? (
              <div className="space-y-4 animate-fade-in">
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-2 flex items-center gap-2 text-accent">
                    <Megaphone className="h-4 w-4" /> Make Your Voice Heard — {mission.name}
                  </h4>
                  <p className="font-body text-xs text-muted-foreground mb-6">Every action counts. Pick one (or all) and earn XP for making a difference.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sign Petition */}
                    <button
                      onClick={() => {
                        playSfx();
                        setPetitionDialog({
                          url: "https://petitions.ourcommons.ca",
                          missionId: mission.id,
                          missionName: mission.name,
                          petitionLabel: `${mission.name} Petition`,
                          xp: 500,
                        });
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Pen className="h-6 w-6 text-accent" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+500 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Sign the Petition</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Add your name to the official House of Commons petition and demand Parliamentary action.</p>
                    </button>

                    {/* Call Your MP */}
                    <button
                      onClick={() => {
                        playSfx();
                        window.open("https://www.ourcommons.ca/members/en", "_blank");
                        if (user) {
                          addXP("call_mp", `action-call-${mission.id}`, 100);
                          toast({ title: "+100 XP Earned!", description: "Called your MP's office" });
                        }
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+100 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Call Your MP</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Find your Member of Parliament and call their office. A 2-minute phone call is the most powerful thing you can do.</p>
                    </button>

                    {/* Email Your MP */}
                    <button
                      onClick={() => {
                        playSfx();
                        window.open("https://www.ourcommons.ca/members/en", "_blank");
                        if (user) {
                          addXP("email_mp", `action-email-${mission.id}`, 50);
                          toast({ title: "+50 XP Earned!", description: "Emailed your MP" });
                        }
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Mail className="h-6 w-6 text-primary" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+50 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Email Your MP</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Send a written message to your MP demanding action on {mission.name.toLowerCase()}. Written records create accountability.</p>
                    </button>

                    {/* Share on Social Media */}
                    <button
                      onClick={() => {
                        playSfx();
                        const shareText = `I just took action on ${mission.name} at protestforcanada.lovable.app — join the fight! 🇨🇦`;
                        navigator.clipboard.writeText(shareText);
                        if (user) {
                          addXP("share_social", `action-share-${mission.id}`, 25);
                          toast({ title: "+25 XP Earned!", description: "Message copied — share it everywhere!" });
                        } else {
                          toast({ title: "Copied!", description: "Share message copied to clipboard" });
                        }
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Share2 className="h-6 w-6 text-primary" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+25 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Spread Awareness</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Copy a share message and post it on social media. Awareness is the first step to systemic change.</p>
                    </button>

                    {/* Join a Protest */}
                    <button
                      onClick={() => {
                        playSfx();
                        setActiveTab("overview");
                        setTimeout(() => {
                          document.getElementById("protest-calendar")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-6 w-6 text-primary" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+200 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Join a Protest</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Show up in person. Find upcoming rallies, marches, and community events in the protest calendar.</p>
                    </button>

                    {/* Copy Dossier */}
                    <button
                      onClick={() => {
                        playSfx();
                        const dossierText = `${mission.name}: ${mission.subtitle}\n\n${mission.whatYouNeedToKnow}\n\nStats:\n${mission.stats.map(s => `• ${s.value} — ${s.label}: ${s.description}`).join("\n")}\n\nSource: protestforcanada.lovable.app`;
                        navigator.clipboard.writeText(dossierText);
                        if (user) {
                          addXP("copy_dossier", `action-dossier-${mission.id}`, 30);
                          toast({ title: "+30 XP Earned!", description: "Full dossier copied — send it to everyone!" });
                        } else {
                          toast({ title: "Copied!", description: "Dossier copied to clipboard" });
                        }
                      }}
                      className="ff-panel p-5 text-left hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Copy className="h-6 w-6 text-primary" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-accent"><Zap className="h-3 w-3" />+30 XP</span>
                      </div>
                      <div className="font-body text-sm font-bold uppercase text-foreground mb-1">Copy Full Dossier</div>
                      <p className="font-body text-[11px] text-muted-foreground leading-relaxed">Copy all the facts, stats, and sources for this mission. Send it to friends, family, or your MP directly.</p>
                    </button>
                  </div>
                </div>

                {/* Live Petition Ticker */}
                <PetitionTicker missionId={mission.id} />
              </div>
            ) : activeTab === "truth" && mission.truthTab ? (
              <div className="space-y-6 animate-fade-in">
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-4 flex items-center gap-2 text-primary">
                    <FileText className="h-4 w-4" /> {mission.truthTab.title}
                  </h4>
                  {mission.truthTab.timeline && (
                    <div className="mb-6">
                      <h5 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3 font-bold">Timeline</h5>
                      <div className="space-y-2">
                        {mission.truthTab.timeline.map((item, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="shrink-0 w-16 ff-panel px-2 py-1 text-center">
                              <span className="font-body text-xs font-bold text-accent">{item.year}</span>
                            </div>
                            <div className="flex-1 ff-panel p-2 text-xs font-body text-foreground">{item.event}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h5 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3 font-bold">Key Findings</h5>
                    <ul className="space-y-2">
                      {mission.truthTab.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 font-body text-sm ff-panel p-3 text-foreground">
                          <span className="shrink-0 w-5 h-5 ff-panel flex items-center justify-center text-[10px] font-bold text-accent">{i + 1}</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <ActionCenter />

      {activeStageConfig && (
        <StageActionDialog
          open={stageDialogOpen}
          onOpenChange={setStageDialogOpen}
          stageConfig={activeStageConfig}
          missionId={mission?.id || "water"}
        />
      )}

      {petitionDialog && (
        <PetitionRedirectDialog
          open={!!petitionDialog}
          onOpenChange={(open) => { if (!open) setPetitionDialog(null); }}
          url={petitionDialog.url}
          missionId={petitionDialog.missionId}
          missionName={petitionDialog.missionName}
          petitionLabel={petitionDialog.petitionLabel}
          xp={petitionDialog.xp}
        />
      )}
    </div>
  );
};
