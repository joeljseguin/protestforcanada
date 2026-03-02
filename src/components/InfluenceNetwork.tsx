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

// Wider layout for uniform 200px cards with breathing room
const tierPositions: Record<string, { x: number; y: number }> = {
  // TIER 0: Executive (y=0)
  pmo: { x: 550, y: 0 },
  treasury: { x: 900, y: 0 },

  // TIER 1: Ministers (y=220)
  anand: { x: -30, y: 220 },
  hajdu: { x: 210, y: 220 },
  champagne: { x: 450, y: 220 },
  freeland: { x: 690, y: 220 },
  miller: { x: 930, y: 220 },
  leblanc: { x: 1170, y: 220 },
  blair: { x: 1410, y: 220 },

  // TIER 2: Corporations & Banks (y=480)
  gdls: { x: -60, y: 480 },
  elbit: { x: 160, y: 480 },
  "water-backlog": { x: 360, y: 480 },
  loblaws: { x: 560, y: 480 },
  metro: { x: 760, y: 480 },
  empire: { x: 960, y: 480 },
  snc: { x: 1160, y: 480 },
  irving: { x: 1360, y: 480 },
  "td-bank": { x: 460, y: 630 },
  rbc: { x: 660, y: 630 },
  cibc: { x: 860, y: 630 },
  bmo: { x: 1060, y: 630 },

  // TIER 3: Lobbyists (y=820)
  "lob-gdls": { x: -60, y: 820 },
  "lob-elbit": { x: 160, y: 820 },
  "lob-loblaws": { x: 360, y: 820 },
  "lob-fleishman": { x: 560, y: 820 },
  "lob-banks": { x: 760, y: 820 },
  "lob-mcmillan": { x: 960, y: 820 },
  "lob-prospectus": { x: 1160, y: 820 },
  "lob-earnscliffe": { x: 1360, y: 820 },
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
        const isLobbyUp = e.id.startsWith("e-lob-");
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          type: "smoothstep",
          animated: isCrisis || isLobbyUp,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCrisis
              ? "hsl(0 84% 50%)"
              : isLobbyUp
              ? "hsl(38 92% 45%)"
              : "hsl(0 0% 50%)",
          },
          style: {
            stroke: isCrisis
              ? "hsl(0 84% 50%)"
              : isLobbyUp
              ? "hsl(38 92% 45%)"
              : "hsl(0 0% 65%)",
            strokeWidth: isCrisis ? 3 : isLobbyUp ? 2.5 : 2,
            strokeDasharray: isLobbyUp ? "6 3" : undefined,
          },
          labelStyle: {
            fill: "hsl(0 0% 0%)",
            fontSize: 9,
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
          },
          labelBgStyle: {
            fill: "hsl(0 0% 100%)",
            fillOpacity: 1,
            stroke: isCrisis ? "hsl(0 84% 50%)" : isLobbyUp ? "hsl(38 92% 45%)" : "hsl(0 0% 0%)",
            strokeWidth: 2,
          },
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
        <p className="text-muted-foreground font-mono text-sm max-w-3xl">
          Power flows down from the PMO through Ministers to Corporations.
          <span className="font-bold text-foreground"> Lobbyists push influence back UP</span> (dashed gold lines).
          <span className="font-bold" style={{ color: "hsl(0 84% 50%)" }}> Red lines</span> = crisis-linked money.
          <span className="font-bold text-foreground"> Click any node</span> for dossier + XP actions.
          <span className="font-bold" style={{ color: "hsl(0 84% 50%)" }}> Red badges</span> on MPs show crisis accountability.
        </p>
      </div>
      <div className="container">
        <div className="neu-border overflow-hidden bg-background relative" style={{ height: 1050 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.15}
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
            <span className="font-extrabold uppercase text-xs tracking-wider">Lobbying Intel: </span>
            {edgeInfo.lobbying}
            {edgeInfo.grant && (
              <span className="ml-3 neu-border px-2 py-0.5 bg-muted text-xs font-bold">
                Grant/Revenue: {edgeInfo.grant}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono font-bold">
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 rounded bg-background neu-border" /> PMO / Minister
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 bg-background neu-border" /> Corporation
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 bg-secondary neu-border" /> Lobbyist
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 neu-border" style={{ background: "hsl(45 100% 95%)" }} /> Bank
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-0.5 inline-block" style={{ width: 20, background: "hsl(0 84% 50%)" }} /> Crisis Link
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span
              className="inline-block"
              style={{ width: 20, height: 2, background: "hsl(38 92% 45%)", borderTop: "2px dashed hsl(38 92% 45%)" }}
            />{" "}
            Lobbyist → Minister
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-0.5 inline-block" style={{ width: 20, background: "hsl(0 0% 65%)" }} /> Standard Link
          </span>
        </div>
      </div>
    </section>
  );
};
