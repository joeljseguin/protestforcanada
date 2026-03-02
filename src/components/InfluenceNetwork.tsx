import { useMemo, useState } from "react";
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
import { nodeTypes } from "@/components/influence/NodeTypes";
import { DossierPanel } from "@/components/influence/DossierPanel";

// Hierarchical positions — 4 tiers
const tierPositions: Record<string, { x: number; y: number }> = {
  // TIER 0: Executive (y=0)
  pmo: { x: 500, y: 0 },
  treasury: { x: 800, y: 0 },

  // TIER 1: Ministers (y=200)
  anand: { x: 0, y: 200 },
  hajdu: { x: 200, y: 200 },
  champagne: { x: 400, y: 200 },
  freeland: { x: 600, y: 200 },
  miller: { x: 800, y: 200 },
  leblanc: { x: 1000, y: 200 },
  blair: { x: 1200, y: 200 },

  // TIER 2: Corporations & Banks (y=440)
  gdls: { x: -50, y: 440 },
  elbit: { x: 130, y: 440 },
  "water-backlog": { x: 300, y: 440 },
  loblaws: { x: 460, y: 440 },
  metro: { x: 620, y: 440 },
  empire: { x: 780, y: 440 },
  snc: { x: 940, y: 440 },
  irving: { x: 1100, y: 440 },
  "td-bank": { x: 460, y: 580 },
  rbc: { x: 620, y: 580 },
  cibc: { x: 780, y: 580 },
  bmo: { x: 940, y: 580 },

  // TIER 3: Lobbyists (y=720)
  "lob-gdls": { x: -50, y: 720 },
  "lob-elbit": { x: 130, y: 720 },
  "lob-loblaws": { x: 310, y: 720 },
  "lob-fleishman": { x: 490, y: 720 },
  "lob-banks": { x: 670, y: 720 },
  "lob-mcmillan": { x: 850, y: 720 },
  "lob-prospectus": { x: 1030, y: 720 },
  "lob-earnscliffe": { x: 1200, y: 720 },
};

export const InfluenceNetwork = () => {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

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
      influenceEdges.map((e) => {
        const isCrisis = !!e.grantAmount;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          type: "smoothstep",
          animated: isCrisis,
          markerEnd: { type: MarkerType.ArrowClosed, color: isCrisis ? "hsl(0 84% 50%)" : "hsl(0 0% 60%)" },
          style: {
            stroke: isCrisis ? "hsl(0 84% 50%)" : "hsl(0 0% 70%)",
            strokeWidth: isCrisis ? 3 : 2,
          },
          labelStyle: { fill: "hsl(0 0% 0%)", fontSize: 9, fontFamily: "JetBrains Mono", fontWeight: 600 },
          labelBgStyle: { fill: "hsl(0 0% 100%)", fillOpacity: 1, stroke: "hsl(0 0% 0%)", strokeWidth: 2 },
          labelBgPadding: [6, 4] as [number, number],
        };
      }),
    []
  );

  const edgeInfo = useMemo(() => {
    const edge = influenceEdges.find((e) => e.id === hoveredEdge);
    if (!edge) return null;
    return { lobbying: edge.lobbyingFrequency, grant: edge.grantAmount };
  }, [hoveredEdge]);

  const selectedNode = influenceNodes.find((n) => n.id === selectedNodeId);

  return (
    <section id="power-map" className="py-16 md:py-24">
      <div className="container mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2">
          Who Has the Power?
        </h2>
        <p className="text-muted-foreground font-mono text-sm max-w-2xl">
          Power Hierarchy — PMO at top, Ministers, Corporations, Banks, Lobbyists.
          <span className="font-bold text-foreground"> Click any node</span> for dossier + XP actions.
          <span className="font-bold text-foreground"> Red lines</span> = crisis-linked influence.
        </p>
      </div>
      <div className="container">
        <div className="neu-border overflow-hidden bg-background relative" style={{ height: 900 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.2}
            maxZoom={1.5}
            onEdgeMouseEnter={(_, edge) => setHoveredEdge(edge.id)}
            onEdgeMouseLeave={() => setHoveredEdge(null)}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          >
            <Background color="hsl(0 0% 90%)" gap={32} size={1} />
            <Controls className="neu-border" />
          </ReactFlow>
          {selectedNode?.dossier && (
            <DossierPanel
              dossier={selectedNode.dossier}
              label={selectedNode.label}
              nodeId={selectedNode.id}
              onClose={() => setSelectedNodeId(null)}
            />
          )}
        </div>
        {edgeInfo && (
          <div className="mt-4 neu-border p-4 bg-secondary font-mono text-sm animate-fade-in">
            <span className="font-bold uppercase text-xs tracking-wider">Lobbying Intel: </span>
            {edgeInfo.lobbying}
            {edgeInfo.grant && <span className="ml-3 neu-border px-2 py-0.5 bg-muted text-xs">Grant/Revenue: {edgeInfo.grant}</span>}
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 rounded-full bg-background neu-border" /> PMO / Minister</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-background neu-border" /> Corporation</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-secondary neu-border" /> Lobbyist</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 neu-border" style={{ background: "hsl(45 100% 95%)" }} /> Bank</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-0.5 bg-threat-red inline-block" style={{ width: 16 }} /> Crisis Link</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-0.5 inline-block" style={{ width: 16, background: "hsl(0 0% 70%)" }} /> Standard Link</span>
        </div>
      </div>
    </section>
  );
};
