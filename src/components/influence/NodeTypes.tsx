import { AlertTriangle, Crown, Briefcase, Landmark, Users, Building2, Factory, ArrowRightLeft, CheckCircle2, FileSignature, MapPin } from "lucide-react";

const cardBase =
  "cursor-pointer font-body transition-all hover:shadow-[0_0_12px_hsl(210_60%_50%/0.4)]";

function CrisisBadges({ crisisLinks }: { crisisLinks?: string[] }) {
  if (!crisisLinks?.length) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {crisisLinks.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-sm"
          style={{
            background: "hsl(0 72% 50%)",
            color: "white",
            border: "1px solid hsl(0 72% 65%)",
          }}
        >
          <AlertTriangle className="h-2.5 w-2.5" />
          {c}
        </span>
      ))}
    </div>
  );
}

function LocationBadge({ location }: { location?: string }) {
  if (!location) return null;
  return (
    <div className="flex items-center gap-1 mt-1">
      <MapPin className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{location}</span>
    </div>
  );
}

/* All nodes styled as FF4 world map location markers */
const ffNode = "ff-panel w-[200px] p-3";

export function PMONode({ data }: { data: any }) {
  return (
    <div className={`${cardBase} ${ffNode}`} style={{ borderColor: "hsl(45 100% 60%)" }}>
      <div className="flex items-center gap-2 mb-1">
        <Crown className="h-5 w-5 shrink-0 text-accent" />
        <span className="font-bold text-xs uppercase tracking-tight leading-tight text-accent">
          {data.label}
        </span>
      </div>
      {data.role && (
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {data.role}
        </div>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export function MinisterNode({ data }: { data: any }) {
  const hasCrisis = data.crisisLinks?.length > 0;
  return (
    <div
      className={`${cardBase} ${ffNode}`}
      style={{ borderColor: hasCrisis ? "hsl(0 72% 50%)" : "hsl(210 60% 50%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Landmark className="h-4 w-4 shrink-0" style={{ color: hasCrisis ? "hsl(0 72% 60%)" : "hsl(210 100% 65%)" }} />
        <span className="font-bold text-[11px] uppercase tracking-tight leading-tight text-foreground">
          {data.label}
        </span>
      </div>
      {data.role && (
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {data.role}
        </div>
      )}
      <LocationBadge location={data.location} />
      <CrisisBadges crisisLinks={data.crisisLinks} />
    </div>
  );
}

export function CorporationNode({ data }: { data: any }) {
  const isAlert = data.alertRed;
  return (
    <div
      className={`${cardBase} ${ffNode} ${isAlert ? "animate-pulse-red" : ""}`}
      style={{ borderColor: isAlert ? "hsl(0 72% 50%)" : "hsl(210 60% 50%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Building2 className="h-4 w-4 shrink-0" style={{ color: isAlert ? "hsl(0 72% 60%)" : "hsl(140 55% 50%)" }} />
        <span className="font-bold text-[11px] uppercase tracking-tight leading-tight text-foreground">
          {data.label}
        </span>
        {isAlert && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive" />}
      </div>
      {data.detail && (
        <p className="text-[10px] text-muted-foreground leading-tight">{data.detail}</p>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export function BankNode({ data }: { data: any }) {
  return (
    <div className={`${cardBase} ${ffNode}`} style={{ borderColor: "hsl(45 90% 55%)" }}>
      <div className="flex items-center gap-2 mb-1">
        <Briefcase className="h-4 w-4 shrink-0 text-accent" />
        <span className="font-bold text-[11px] uppercase tracking-tight leading-tight text-accent">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[10px] text-muted-foreground leading-tight">{data.detail}</p>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export function LobbyistNode({ data }: { data: any }) {
  return (
    <div className={`${cardBase} ${ffNode}`} style={{ borderColor: "hsl(270 50% 50%)" }}>
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-4 w-4 shrink-0" style={{ color: "hsl(270 50% 65%)" }} />
        <span className="font-bold text-[11px] uppercase tracking-tight leading-tight text-foreground">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[10px] text-muted-foreground leading-tight">{data.detail}</p>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export function FactoryNode({ data }: { data: any }) {
  return (
    <div
      className={`${cardBase} ${ffNode}`}
      style={{ borderColor: "hsl(0 72% 50%)", boxShadow: "0 0 8px hsl(0 72% 50% / 0.3)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Factory className="h-4 w-4 shrink-0 text-destructive" />
        <span className="font-bold text-[11px] uppercase tracking-tight leading-tight text-foreground">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[9px] text-muted-foreground leading-tight">{data.detail}</p>
      )}
      {data.location && (
        <p className="text-[9px] font-bold mt-1 uppercase tracking-wider text-destructive">
          📍 {data.location}
        </p>
      )}
    </div>
  );
}

export function IntermediaryNode({ data }: { data: any }) {
  const isConflict = data.id === "conflict-zone";
  return (
    <div
      className={`${cardBase} ${ffNode} ${isConflict ? "animate-pulse-red" : ""}`}
      style={{
        borderColor: isConflict ? "hsl(0 72% 50%)" : "hsl(210 60% 50%)",
        background: isConflict ? "hsl(0 72% 30%)" : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <ArrowRightLeft className="h-4 w-4 shrink-0" style={{ color: isConflict ? "hsl(0 72% 70%)" : "hsl(210 60% 65%)" }} />
        <span className={`font-bold text-[11px] uppercase tracking-tight leading-tight ${isConflict ? "text-destructive-foreground" : "text-foreground"}`}>
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className={`text-[9px] leading-tight ${isConflict ? "text-destructive-foreground/80" : "text-muted-foreground"}`}>
          {data.detail}
        </p>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export function SolutionNode({ data }: { data: any }) {
  const isRevoke = data.solutionType === "action";
  return (
    <div
      className={`${cardBase} ${ffNode}`}
      style={{
        borderColor: isRevoke ? "hsl(140 55% 45%)" : "hsl(210 100% 65%)",
        boxShadow: isRevoke ? "0 0 10px hsl(140 55% 45% / 0.4)" : "0 0 8px hsl(210 100% 65% / 0.3)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {isRevoke ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-mission-green" />
        ) : (
          <FileSignature className="h-4 w-4 shrink-0 text-primary" />
        )}
        <span className={`font-bold text-[11px] uppercase tracking-tight leading-tight ${isRevoke ? "text-mission-green" : "text-primary"}`}>
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[9px] text-muted-foreground leading-tight">{data.detail}</p>
      )}
      <LocationBadge location={data.location} />
    </div>
  );
}

export const nodeTypes = {
  pmo: PMONode,
  minister: MinisterNode,
  corporation: CorporationNode,
  lobbyist: LobbyistNode,
  bank: BankNode,
  factory: FactoryNode,
  intermediary: IntermediaryNode,
  solution: SolutionNode,
};
