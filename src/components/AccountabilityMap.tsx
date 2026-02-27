import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { accountabilityNodes, accountabilityEdges } from "@/data/accountabilityData";
import { ExternalLink, AlertTriangle, Building2, Landmark, FileText, Users } from "lucide-react";

const nodeTypeIcons = {
  government: Landmark,
  instrument: FileText,
  corporation: Building2,
  lobbyist: Users,
};

const nodeTypeColors = {
  government: { bg: "hsl(220 12% 16%)", border: "hsl(210 80% 55%)", text: "hsl(0 0% 95%)" },
  instrument: { bg: "hsl(220 12% 14%)", border: "hsl(38 92% 50%)", text: "hsl(0 0% 90%)" },
  corporation: { bg: "hsl(220 12% 12%)", border: "hsl(142 70% 45%)", text: "hsl(0 0% 95%)" },
  lobbyist: { bg: "hsl(220 12% 10%)", border: "hsl(220 10% 55%)", text: "hsl(0 0% 80%)" },
};

function CustomNode({ data }: { data: any }) {
  const Icon = nodeTypeIcons[data.nodeType as keyof typeof nodeTypeIcons] || Building2;
  const colors = nodeTypeColors[data.nodeType as keyof typeof nodeTypeColors] || nodeTypeColors.corporation;
  const isAlert = data.alertRed;

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 min-w-[200px] max-w-[260px] font-mono text-xs ${isAlert ? "animate-pulse-red" : ""}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: isAlert ? "hsl(0 85% 55%)" : colors.border,
        color: colors.text,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: isAlert ? "hsl(0 85% 55%)" : colors.border }} />
        <span className="font-semibold text-[11px] uppercase tracking-wider truncate">{data.label}</span>
        {isAlert && <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: "hsl(0 85% 55%)" }} />}
      </div>
      {data.detail && <p className="opacity-60 leading-tight text-[10px]">{data.detail}</p>}
      {data.amount && (
        <div className="mt-1.5 font-bold text-sm" style={{ color: isAlert ? "hsl(0 85% 65%)" : "hsl(142 70% 55%)" }}>
          {data.amount}
        </div>
      )}
      {data.sourceUrl && (
        <a
          href={data.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-[10px] opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "hsl(142 70% 55%)" }}
        >
          <ExternalLink className="h-2.5 w-2.5" /> Verify Source
        </a>
      )}
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

// Layout positions
const tierPositions: Record<string, { x: number; y: number }> = {
  goc: { x: 400, y: 0 },
  isc: { x: 100, y: 0 },
  ised: { x: 700, y: 0 },
  eipa: { x: 200, y: 180 },
  sif: { x: 500, y: 180 },
  "water-infra": { x: 0, y: 180 },
  "comp-bureau": { x: 780, y: 180 },
  gdls: { x: 200, y: 380 },
  elbit: { x: 460, y: 380 },
  "us-dod": { x: 200, y: 560 },
  loblaws: { x: 700, y: 380 },
  metro: { x: 920, y: 380 },
  "lob-gdls": { x: 80, y: 560 },
  "lob-loblaws": { x: 700, y: 560 },
  "lob-elbit": { x: 460, y: 560 },
};

export const AccountabilityMap = () => {
  const nodes: Node[] = useMemo(
    () =>
      accountabilityNodes.map((n) => ({
        id: n.id,
        type: "custom",
        position: tierPositions[n.id] || { x: 0, y: 0 },
        data: { ...n, nodeType: n.type },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      accountabilityEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: "smoothstep",
        animated: accountabilityNodes.find((n) => n.id === e.target)?.alertRed,
        markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 45%)" },
        style: {
          stroke: accountabilityNodes.find((n) => n.id === e.target)?.alertRed
            ? "hsl(0 85% 55%)"
            : "hsl(142 70% 45% / 0.4)",
          strokeWidth: 2,
        },
        labelStyle: { fill: "hsl(0 0% 60%)", fontSize: 10, fontFamily: "JetBrains Mono" },
        labelBgStyle: { fill: "hsl(220 15% 8%)", fillOpacity: 0.9 },
      })),
    []
  );

  return (
    <section id="family-tree" className="py-16 md:py-24">
      <div className="container mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            // Accountability Map
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
          The Family Tree
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm">
          Interactive map connecting your tax dollars to government instruments, corporate entities,
          and verified lobbyist communications. <span className="text-accent font-semibold">Red nodes</span> indicate
          grants &gt;$1M during active humanitarian crises.
        </p>
      </div>
      <div className="container">
        <div className="rounded-lg border border-border overflow-hidden" style={{ height: 700 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background color="hsl(220 10% 15%)" gap={24} size={1} />
            <Controls
              style={{ background: "hsl(220 12% 14%)", borderColor: "hsl(220 12% 22%)" }}
            />
          </ReactFlow>
        </div>
        <div className="flex flex-wrap gap-6 mt-4 justify-center text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(210 80% 55%)" }} /> Government</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(38 92% 50%)" }} /> Legislative Instrument</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(142 70% 45%)" }} /> Corporation</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(220 10% 55%)" }} /> Lobbyist</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm animate-pulse-red" style={{ background: "hsl(0 85% 55%)" }} /> Crisis Alert</span>
        </div>
      </div>
    </section>
  );
};
