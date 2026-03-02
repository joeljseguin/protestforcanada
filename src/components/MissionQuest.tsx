import { useState } from "react";
import { missions, calendarEvents, threatColors } from "@/data/gameData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Phone, Pen, Calendar, MapPin, Users, AlertTriangle, CheckCircle2, Circle, FileText, Clock } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ActionCenter } from "./ActionCenter";
import { ProtestMap } from "./ProtestMap";
import { StageActionDialog } from "./StageActionDialog";
import { getStageActions } from "@/data/stageActions";
import type { StageConfig } from "@/data/stageActions";

export const MissionQuest = () => {
  const [searchParams] = useSearchParams();
  const activeMissionId = searchParams.get("mission") || missions[0].id;
  const [expandedMission, setExpandedMission] = useState<string | null>(activeMissionId);
  const [activeTab, setActiveTab] = useState<"overview" | "truth">("overview");
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [activeStageConfig, setActiveStageConfig] = useState<StageConfig | null>(null);

  const mission = missions.find((m) => m.id === expandedMission) || missions[0];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2">
          Mission Quest
        </h2>
        <p className="text-muted-foreground font-mono text-sm mb-10 max-w-2xl">
          Select a mission. See the human cost. Read the truth. Take action. Earn XP.
        </p>

        {/* Mission Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {missions.slice(0, 5).map((m) => (
            <button
              key={m.id}
              onClick={() => { setExpandedMission(m.id); setActiveTab("overview"); }}
              className={`neu-border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                expandedMission === m.id ? "bg-foreground text-background" : "bg-card hover:bg-secondary"
              }`}
            >
              #{m.rank} {m.name}
            </button>
          ))}
        </div>

        {mission && (
          <div className="space-y-8 animate-fade-in">
            {/* Mission Header */}
            <div className="neu-border neu-shadow p-6 bg-card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${threatColors[mission.threatLevel]} neu-border text-xs font-mono`}>
                      {mission.threatLevel}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">RANK #{mission.rank}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl uppercase">{mission.name}</h3>
                  <p className="font-mono text-sm text-muted-foreground mt-1">{mission.subtitle}</p>
                </div>
                <div className="neu-border px-4 py-3 bg-secondary text-center">
                  <div className="font-extrabold text-2xl font-heading">+{mission.xpBounty}</div>
                  <div className="font-mono text-xs uppercase">XP Bounty</div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  {mission.stages.map((stage, i) => {
                    const stageActions = getStageActions(mission.id, stage.label);
                    const isClickable = !!stageActions && stageActions.actions.length > 0;
                    return (
                      <div key={stage.label} className="flex items-center flex-1">
                        <button
                          onClick={() => {
                            if (isClickable && stageActions) {
                              setActiveStageConfig(stageActions);
                              setStageDialogOpen(true);
                            }
                          }}
                          className={`flex items-center gap-1.5 flex-1 ${isClickable ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}`}
                        >
                          {stage.complete ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />}
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${stage.complete ? "text-foreground font-bold" : "text-muted-foreground"} ${isClickable ? "underline decoration-dotted underline-offset-2" : ""}`}>
                            {stage.label}
                          </span>
                          {isClickable && <Zap className="h-2.5 w-2.5 text-muted-foreground" />}
                        </button>
                        {i < mission.stages.length - 1 && <div className="h-px w-4 mx-1 bg-foreground/30" />}
                      </div>
                    );
                  })}
                </div>
                <div className="h-5 neu-border overflow-hidden bg-muted">
                  <div className="h-full bg-foreground transition-all duration-1000" style={{ width: `${mission.progress}%` }} />
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{mission.progress}% complete</div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`neu-border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${activeTab === "overview" ? "bg-foreground text-background" : "bg-card hover:bg-secondary"}`}
              >
                <AlertTriangle className="h-3 w-3 inline mr-1.5" /> Overview & Action
              </button>
              {mission.truthTab && (
                <button
                  onClick={() => setActiveTab("truth")}
                  className={`neu-border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${activeTab === "truth" ? "bg-foreground text-background" : "bg-card hover:bg-secondary"}`}
                >
                  <FileText className="h-3 w-3 inline mr-1.5" /> The Truth
                </button>
              )}
            </div>

            {activeTab === "overview" ? (
              <>
                {/* The Human Cost */}
                <div className="neu-border neu-shadow p-6 bg-card">
                  <h4 className="font-heading font-extrabold text-xl uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> The Human Cost
                  </h4>
                  <ul className="space-y-3">
                    {mission.humanCost.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 font-mono text-sm">
                        <span className="shrink-0 w-6 h-6 neu-border flex items-center justify-center text-xs font-bold bg-secondary">{i + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mission.stats.map((stat) => (
                    <div key={stat.label} className="neu-border neu-shadow p-4 bg-card">
                      <div className="text-3xl font-extrabold font-heading">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</div>
                      <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-[10px] font-mono text-muted-foreground hover:text-foreground neu-border px-2 py-0.5">
                        <ExternalLink className="h-2.5 w-2.5" /> {stat.source}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Action Center — Surgical Strike */}
                <div className="neu-border neu-shadow p-6 bg-card">
                  <h4 className="font-heading font-extrabold text-xl uppercase mb-6">Surgical Strike — Take Action</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mission.id === "tax" ? (
                      <a href="https://petitions.ourcommons.ca" target="_blank" rel="noopener noreferrer" className="md:col-span-3 block">
                        <div className="neu-border p-6 bg-secondary animate-pulse-gold text-center cursor-pointer hover:scale-[1.02] transition-transform">
                          <Pen className="h-8 w-8 mx-auto mb-2" />
                          <div className="font-heading font-extrabold text-xl uppercase">Sign Petition e-6806</div>
                          <div className="font-mono text-sm text-muted-foreground mt-1">Tax the Rich — 1% Wealth Tax</div>
                          <div className="mt-3 inline-flex items-center gap-2 neu-border px-4 py-2 bg-foreground text-background font-mono text-sm font-bold">
                            <Zap className="h-4 w-4" /> +500 XP
                          </div>
                        </div>
                      </a>
                    ) : (
                      <>
                        <a href="https://petitions.ourcommons.ca" target="_blank" rel="noopener noreferrer" className="neu-border p-4 bg-card text-center hover:bg-secondary transition-colors">
                          <Pen className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-bold text-sm uppercase font-heading">Link to Petition</div>
                          <div className="text-xs text-muted-foreground font-mono mt-1">ourcommons.ca</div>
                          <div className="mt-2 font-mono text-xs font-bold flex items-center justify-center gap-1"><Zap className="h-3 w-3" /> +500 XP</div>
                        </a>
                        <div className="neu-border p-4 bg-card text-center">
                          <Phone className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-bold text-sm uppercase font-heading">Send Dossier to MP</div>
                          <div className="text-xs text-muted-foreground font-mono mt-1">Use Action Center below</div>
                          <div className="mt-2 font-mono text-xs font-bold flex items-center justify-center gap-1"><Zap className="h-3 w-3" /> +100 XP</div>
                        </div>
                        <div className="neu-border p-4 bg-card text-center">
                          <Users className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-bold text-sm uppercase font-heading">Join Protest</div>
                          <div className="text-xs text-muted-foreground font-mono mt-1">See calendar below</div>
                          <div className="mt-2 font-mono text-xs font-bold flex items-center justify-center gap-1"><Zap className="h-3 w-3" /> +200 XP</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Calendar + Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div className="neu-border neu-shadow p-6 bg-card">
                    <h4 className="font-heading font-extrabold text-xl uppercase mb-6 flex items-center gap-2">
                      <Calendar className="h-5 w-5" /> Protest Calendar
                    </h4>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {calendarEvents.map((event) => (
                        <div key={event.id} className="neu-border p-4 flex items-center gap-4 bg-card hover:bg-secondary transition-colors">
                          <div className="shrink-0 text-center neu-border px-3 py-2 bg-muted">
                            <div className="font-mono text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString("en-CA", { month: "short" })}</div>
                            <div className="font-extrabold text-lg font-heading">{new Date(event.date).getDate()}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm uppercase font-heading truncate">{event.title}</div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-1 flex-wrap">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                              <span>{event.time}</span>
                            </div>
                            {event.verified && (
                              <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-green-600">
                                <CheckCircle2 className="h-2.5 w-2.5" /> Verified · {event.source}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 flex flex-col items-end gap-1">
                            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {event.attendees.toLocaleString()}</span>
                            <div className="neu-border px-2 py-1 bg-secondary font-mono text-xs font-bold flex items-center gap-1"><Zap className="h-3 w-3" /> +{event.xpReward}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 neu-border font-mono uppercase tracking-wider text-xs">
                      + Propose New Event
                    </Button>
                  </div>

                  {/* Map */}
                  <ProtestMap />
                </div>

                {/* Source Links */}
                {mission.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {mission.links.map((link) => (
                      <Button key={link.url} variant="outline" size="sm" asChild className="neu-border font-mono text-xs uppercase tracking-wider">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1.5" /> {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : mission.truthTab ? (
              /* THE TRUTH TAB */
              <div className="space-y-6 animate-fade-in">
                <div className="neu-border neu-shadow p-6 bg-card">
                  <h4 className="font-heading font-extrabold text-xl uppercase mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" /> {mission.truthTab.title}
                  </h4>

                  {/* Timeline */}
                  {mission.truthTab.timeline && (
                    <div className="mb-6">
                      <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 font-bold">Timeline of Events</h5>
                      <div className="space-y-2">
                        {mission.truthTab.timeline.map((item, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="shrink-0 w-16 neu-border px-2 py-1 text-center bg-secondary">
                              <span className="font-mono text-xs font-bold">{item.year}</span>
                            </div>
                            <div className="flex-1 neu-border p-2 text-xs font-mono">
                              {item.event}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dense Details */}
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 font-bold">Key Findings</h5>
                    <ul className="space-y-2">
                      {mission.truthTab.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 font-mono text-sm neu-border p-3 bg-muted">
                          <span className="shrink-0 w-5 h-5 neu-border flex items-center justify-center text-[10px] font-bold bg-background">{i + 1}</span>
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
    </div>
  );
};
