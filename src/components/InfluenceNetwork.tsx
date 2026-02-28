import { useCallback, useMemo, useState } from "react";
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
import { influenceNodes, influenceEdges } from "@/data/gameData";
import { ExternalLink, AlertTriangle } from "lucide-react";

function MinisterNode({ data }: { data: any }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${data.alertRed ? "animate-pulse-red" : ""}`}>
      <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-extrabold text-lg" style={{ border: "3px solid hsl(0 0% 0%)" }}>
        {data.avatarInitials || "?"}
      </div>
      <div className="text-center max-w-[160px]">
        <div className="font-heading font-bold text-xs uppercase">{data.label}</div>
        {data.role && <div className="text-[9px] font-mono text-muted-foreground">{data.role}</div>}
      </div>
    </div>
  );
}

function CorporationNode({ data }: { data: any }) {
  const isAlert = data.alertRed;
  return (
    <div
      className={`px-4 py-3 min-w-[160px] max-w-[200px] font-mono text-xs ${isAlert ? "animate-pulse-red" : ""}`}
      style={{ border: "3px solid hsl(0 0% 0%)", background: isAlert ? "hsl(0 84% 95%)" : "hsl(0 0% 100%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-[11px] uppercase tracking-wider">{data.label}</span>
        {isAlert && <AlertTriangle className="h-3 w-3 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />}
      </div>
      {data.detail && <p className="text-muted-foreground text-[10px]">{data.detail}</p>}
      {data.sourceUrl && (
        <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground">
          <ExternalLink className="h-2.5 w-2.5" /> Source
        </a>
      )}
    </div>
  );
}

function LobbyistNode({ data }: { data: any }) {
  return (
    <div className="px-3 py-2 min-w-[140px] font-mono text-xs bg-secondary" style={{ border: "3px solid hsl(0 0% 0%)" }}>
      <div className="font-bold text-[10px] uppercase tracking-wider">{data.label}</div>
      {data.detail && <p className="text-muted-foreground text-[9px] mt-0.5">{data.detail}</p>}
    </div>
  );
}

const nodeTypes = { minister: MinisterNode, corporation: CorporationNode, lobbyist: LobbyistNode };

const tierPositions: Record<string, { x: number; y: number }> = {
  anand: { x: 100, y: 0 },
  "gull-masty": { x: 400, y: 0 },
  champagne: { x: 700, y: 0 },
  gdls: { x: 0, y: 220 },
  elbit: { x: 220, y: 220 },
  "water-backlog": { x: 420, y: 220 },
  loblaws: { x: 660, y: 220 },
  "lob-gdls": { x: 40, y: 420 },
  "lob-loblaws": { x: 640, y: 420 },
};

export const InfluenceNetwork = () => {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  const nodes: Node[] = useMemo(
    () =>
      influenceNodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: tierPositions[n.id] || { x: 0, y: 0 },
        data: { ...n },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      influenceEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: "smoothstep",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(0 84% 50%)" },
        style: {
          stroke: "hsl(0 84% 50%)",
          strokeWidth: 3,
        },
        labelStyle: { fill: "hsl(0 0% 0%)", fontSize: 11, fontFamily: "JetBrains Mono", fontWeight: 600 },
        labelBgStyle: { fill: "hsl(0 0% 100%)", fillOpacity: 1, stroke: "hsl(0 0% 0%)", strokeWidth: 2 },
        labelBgPadding: [6, 4] as [number, number],
      })),
    []
  );

  const lobbyingInfo = useMemo(() => {
    const edge = influenceEdges.find((e) => e.id === hoveredEdge);
    return edge?.lobbyingFrequency || null;
  }, [hoveredEdge]);

  return (
    <section id="power-map" className="py-16 md:py-24">
      <div className="container mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2">
          Who Has the Power?
        </h2>
        <p className="text-muted-foreground font-mono text-sm max-w-2xl">
          Influence Network — connecting Ministers, Corporations, and Lobbyists. 
          <span className="font-bold text-foreground"> Hover over red lines</span> to see lobbying frequency.
        </p>
      </div>
      <div className="container">
        <div className="neu-border overflow-hidden bg-background" style={{ height: 560 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.4}
            maxZoom={1.5}
            onEdgeMouseEnter={(_, edge) => setHoveredEdge(edge.id)}
            onEdgeMouseLeave={() => setHoveredEdge(null)}
          >
            <Background color="hsl(0 0% 90%)" gap={32} size={1} />
            <Controls className="neu-border" />
          </ReactFlow>
        </div>
        {lobbyingInfo && (
          <div className="mt-4 neu-border p-4 bg-secondary font-mono text-sm animate-fade-in">
            <span className="font-bold uppercase text-xs tracking-wider">Lobbying Intel: </span>
            {lobbyingInfo}
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 rounded-full bg-foreground" /> Minister</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-background neu-border" /> Corporation</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-secondary neu-border" /> Lobbyist</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-0.5 bg-threat-red inline-block" style={{ width: 16 }} /> Influence Line</span>
        </div>
      </div>
    </section>
  );
};
