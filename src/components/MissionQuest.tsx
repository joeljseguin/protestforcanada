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
    <div className="py-12 md:py-20">
      <div className="container">
        <h2 className="font-heading text-sm md:text-base uppercase tracking-tight text-primary mb-2">
          📜 Mission Quest
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-8 max-w-2xl">
          Select a mission. See the human cost. Read the truth. Take action. Earn XP.
        </p>

        {/* Mission Selector — FF4 command menu */}
        <div className="flex flex-wrap gap-2 mb-8">
          {missions.slice(0, 5).map((m) => (
            <button
              key={m.id}
              onClick={() => { setExpandedMission(m.id); setActiveTab("overview"); }}
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

              {/* Progress — HP bar style */}
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
                onClick={() => setActiveTab("overview")}
                className={`ff-panel px-5 py-2.5 font-body text-xs uppercase tracking-wider transition-all ${activeTab === "overview" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                style={activeTab === "overview" ? { borderColor: "hsl(45 100% 60%)" } : {}}
              >
                {activeTab === "overview" && "▶ "}<AlertTriangle className="h-3 w-3 inline mr-1.5" /> Overview
              </button>
              {mission.truthTab && (
                <button
                  onClick={() => setActiveTab("truth")}
                  className={`ff-panel px-5 py-2.5 font-body text-xs uppercase tracking-wider transition-all ${activeTab === "truth" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                  style={activeTab === "truth" ? { borderColor: "hsl(45 100% 60%)" } : {}}
                >
                  {activeTab === "truth" && "▶ "}<FileText className="h-3 w-3 inline mr-1.5" /> The Truth
                </button>
              )}
            </div>

            {activeTab === "overview" ? (
              <>
                {/* Human Cost */}
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-4 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" /> Level Up Your XP
                  </h4>
                  <ul className="space-y-3">
                    {mission.humanCost.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground">
                        <span className="shrink-0 w-6 h-6 ff-panel flex items-center justify-center text-[10px] font-bold text-accent">{i + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mission.stats.map((stat) => (
                    <div key={stat.label} className="ff-panel p-4">
                      <div className="text-xl font-heading text-accent">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-body">{stat.label}</div>
                      <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-[10px] font-body text-muted-foreground hover:text-primary ff-panel px-2 py-0.5">
                        <ExternalLink className="h-2.5 w-2.5" /> {stat.source}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Action Center */}
                <div className="ff-panel p-6">
                  <h4 className="font-heading text-[9px] uppercase mb-6 text-accent">⚔ Surgical Strike — Take Action</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {mission.id === "tax" ? (
                      <a href="https://petitions.ourcommons.ca" target="_blank" rel="noopener noreferrer" className="md:col-span-3 block">
                        <div className="ff-panel p-6 animate-pulse-gold text-center cursor-pointer hover:scale-[1.02] transition-transform" style={{ borderColor: "hsl(45 100% 60%)" }}>
                          <Pen className="h-8 w-8 mx-auto mb-2 text-accent" />
                          <div className="font-heading text-[9px] uppercase text-accent">Sign Petition e-6806</div>
                          <div className="font-body text-sm text-muted-foreground mt-1">Tax the Rich — 1% Wealth Tax</div>
                          <div className="mt-3 inline-flex items-center gap-2 ff-panel px-4 py-2 font-body text-sm font-bold text-accent">
                            <Zap className="h-4 w-4" /> +500 XP
                          </div>
                        </div>
                      </a>
                    ) : (
                      <>
                        <a href="https://petitions.ourcommons.ca" target="_blank" rel="noopener noreferrer" className="ff-panel p-4 text-center hover:border-accent transition-colors">
                          <Pen className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <div className="font-bold text-sm uppercase font-body text-foreground">Link to Petition</div>
                          <div className="text-xs text-muted-foreground font-body mt-1">ourcommons.ca</div>
                          <div className="mt-2 font-body text-xs font-bold flex items-center justify-center gap-1 text-accent"><Zap className="h-3 w-3" /> +500 XP</div>
                        </a>
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

                {/* Calendar + Map */}
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
            ) : mission.truthTab ? (
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
    </div>
  );
};
