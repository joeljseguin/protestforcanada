import { AlertTriangle } from "lucide-react";

export function PMONode({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div
        className="w-20 h-20 rounded-full bg-background flex items-center justify-center font-heading font-extrabold text-sm"
        style={{ border: "4px solid hsl(0 0% 0%)", boxShadow: "0 0 20px hsl(0 84% 50% / 0.3)" }}
      >
        {data.avatarInitials || "?"}
      </div>
      <div className="text-center max-w-[180px]">
        <div className="font-heading font-bold text-xs uppercase">{data.label}</div>
        {data.role && <div className="text-[9px] font-mono text-muted-foreground">{data.role}</div>}
      </div>
    </div>
  );
}

export function MinisterNode({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div
        className="w-14 h-14 rounded-full bg-background flex items-center justify-center font-heading font-extrabold text-base"
        style={{ border: "4px solid hsl(0 0% 0%)" }}
      >
        {data.avatarInitials || "?"}
      </div>
      <div className="text-center w-[120px]">
        <div className="font-heading font-bold text-[10px] uppercase leading-tight">{data.label}</div>
        {data.role && <div className="text-[8px] font-mono text-muted-foreground">{data.role}</div>}
      </div>
    </div>
  );
}

export function CorporationNode({ data }: { data: any }) {
  const isAlert = data.alertRed;
  return (
    <div
      className={`px-3 py-2 w-[160px] font-mono text-xs cursor-pointer ${isAlert ? "animate-pulse-red" : ""}`}
      style={{ border: "4px solid hsl(0 0% 0%)", background: isAlert ? "hsl(0 84% 95%)" : "hsl(0 0% 100%)" }}
    >
      <div className="flex items-center gap-1 mb-0.5">
        <span className="font-bold text-[10px] uppercase tracking-wider leading-tight">{data.label}</span>
        {isAlert && <AlertTriangle className="h-3 w-3 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />}
      </div>
      {data.detail && <p className="text-muted-foreground text-[9px]">{data.detail}</p>}
    </div>
  );
}

export function BankNode({ data }: { data: any }) {
  return (
    <div className="px-3 py-2 w-[140px] font-mono text-xs cursor-pointer" style={{ border: "4px solid hsl(0 0% 0%)", background: "hsl(45 100% 95%)" }}>
      <div className="font-bold text-[10px] uppercase tracking-wider">{data.label}</div>
      {data.detail && <p className="text-muted-foreground text-[9px] mt-0.5">{data.detail}</p>}
    </div>
  );
}

export function LobbyistNode({ data }: { data: any }) {
  return (
    <div className="px-3 py-2 w-[150px] font-mono text-xs bg-secondary cursor-pointer" style={{ border: "4px solid hsl(0 0% 0%)" }}>
      <div className="font-bold text-[9px] uppercase tracking-wider leading-tight">{data.label}</div>
      {data.detail && <p className="text-muted-foreground text-[8px] mt-0.5">{data.detail}</p>}
    </div>
  );
}

export const nodeTypes = {
  pmo: PMONode,
  minister: MinisterNode,
  corporation: CorporationNode,
  lobbyist: LobbyistNode,
  bank: BankNode,
};
