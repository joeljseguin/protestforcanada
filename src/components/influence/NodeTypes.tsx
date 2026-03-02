import { AlertTriangle, Crown, Briefcase, Landmark, Users, Building2, Factory, ArrowRightLeft, CheckCircle2, FileSignature } from "lucide-react";

const cardBase =
  "cursor-pointer font-mono transition-shadow hover:shadow-[6px_6px_0_hsl(0_0%_0%)]";

function CrisisBadges({ crisisLinks }: { crisisLinks?: string[] }) {
  if (!crisisLinks?.length) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {crisisLinks.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
          style={{
            background: "hsl(0 84% 50%)",
            color: "white",
            border: "2px solid hsl(0 0% 0%)",
          }}
        >
          <AlertTriangle className="h-2.5 w-2.5" />
          {c}
        </span>
      ))}
    </div>
  );
}

export function PMONode({ data }: { data: any }) {
  return (
    <div
      className={`${cardBase} w-[200px] p-4 bg-background`}
      style={{ border: "4px solid hsl(0 0% 0%)", boxShadow: "4px 4px 0 hsl(0 84% 50% / 0.4)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Crown className="h-5 w-5 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />
        <span className="font-extrabold text-sm uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.role && (
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          {data.role}
        </div>
      )}
    </div>
  );
}

export function MinisterNode({ data }: { data: any }) {
  const hasCrisis = data.crisisLinks?.length > 0;
  return (
    <div
      className={`${cardBase} w-[200px] p-3`}
      style={{
        border: `4px solid ${hasCrisis ? "hsl(0 84% 50%)" : "hsl(0 0% 0%)"}`,
        background: hasCrisis ? "hsl(0 84% 97%)" : "hsl(0 0% 100%)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Landmark className="h-4 w-4 shrink-0" style={{ color: hasCrisis ? "hsl(0 84% 50%)" : "hsl(220 80% 50%)" }} />
        <span className="font-extrabold text-[13px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.role && (
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          {data.role}
        </div>
      )}
      <CrisisBadges crisisLinks={data.crisisLinks} />
    </div>
  );
}

export function CorporationNode({ data }: { data: any }) {
  const isAlert = data.alertRed;
  return (
    <div
      className={`${cardBase} w-[200px] p-3 ${isAlert ? "animate-pulse-red" : ""}`}
      style={{
        border: `4px solid ${isAlert ? "hsl(0 84% 50%)" : "hsl(0 0% 0%)"}`,
        background: isAlert ? "hsl(0 84% 95%)" : "hsl(0 0% 100%)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Building2 className="h-4 w-4 shrink-0" style={{ color: isAlert ? "hsl(0 84% 50%)" : "hsl(142 60% 38%)" }} />
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
        {isAlert && <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />}
      </div>
      {data.detail && (
        <p className="text-[11px] font-bold text-muted-foreground leading-tight">{data.detail}</p>
      )}
    </div>
  );
}

export function BankNode({ data }: { data: any }) {
  return (
    <div
      className={`${cardBase} w-[200px] p-3`}
      style={{ border: "4px solid hsl(0 0% 0%)", background: "hsl(45 100% 95%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Briefcase className="h-4 w-4 shrink-0" style={{ color: "hsl(38 92% 40%)" }} />
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[11px] font-bold text-muted-foreground leading-tight">{data.detail}</p>
      )}
    </div>
  );
}

export function LobbyistNode({ data }: { data: any }) {
  return (
    <div
      className={`${cardBase} w-[200px] p-3 bg-secondary`}
      style={{ border: "4px solid hsl(0 0% 0%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-4 w-4 shrink-0" style={{ color: "hsl(220 10% 45%)" }} />
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[11px] font-bold text-muted-foreground leading-tight">{data.detail}</p>
      )}
    </div>
  );
}

export function FactoryNode({ data }: { data: any }) {
  return (
    <div
      className={`${cardBase} w-[200px] p-3`}
      style={{
        border: "4px solid hsl(0 84% 50%)",
        background: "hsl(0 60% 97%)",
        boxShadow: "4px 4px 0 hsl(0 84% 50% / 0.3)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Factory className="h-4 w-4 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[10px] font-bold text-muted-foreground leading-tight">{data.detail}</p>
      )}
      {data.location && (
        <p className="text-[9px] font-extrabold mt-1 uppercase tracking-wider" style={{ color: "hsl(0 84% 50%)" }}>
          📍 {data.location}
        </p>
      )}
    </div>
  );
}

export function IntermediaryNode({ data }: { data: any }) {
  const isConflict = data.id === "conflict-zone";
  const isUsDod = data.id === "us-dod";
  return (
    <div
      className={`${cardBase} w-[200px] p-3 ${isConflict ? "animate-pulse-red" : ""}`}
      style={{
        border: `4px solid ${isConflict ? "hsl(0 84% 50%)" : "hsl(0 0% 0%)"}`,
        background: isConflict
          ? "hsl(0 84% 50%)"
          : isUsDod
          ? "hsl(220 60% 95%)"
          : "hsl(0 0% 97%)",
        color: isConflict ? "white" : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <ArrowRightLeft className="h-4 w-4 shrink-0" style={{ color: isConflict ? "white" : "hsl(220 60% 45%)" }} />
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className={`text-[10px] font-bold leading-tight ${isConflict ? "text-white/90" : "text-muted-foreground"}`}>
          {data.detail}
        </p>
      )}
    </div>
  );
}

export function SolutionNode({ data }: { data: any }) {
  const isRevoke = data.solutionType === "action";
  return (
    <div
      className={`${cardBase} w-[200px] p-3`}
      style={{
        border: `4px solid ${isRevoke ? "hsl(142 60% 38%)" : "hsl(220 80% 50%)"}`,
        background: isRevoke ? "hsl(142 60% 95%)" : "hsl(220 80% 97%)",
        boxShadow: isRevoke ? "4px 4px 0 hsl(142 60% 38% / 0.4)" : "4px 4px 0 hsl(220 80% 50% / 0.3)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {isRevoke ? (
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "hsl(142 60% 38%)" }} />
        ) : (
          <FileSignature className="h-4 w-4 shrink-0" style={{ color: "hsl(220 80% 50%)" }} />
        )}
        <span className="font-extrabold text-[12px] uppercase tracking-tight leading-tight">
          {data.label}
        </span>
      </div>
      {data.detail && (
        <p className="text-[10px] font-bold text-muted-foreground leading-tight">{data.detail}</p>
      )}
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
