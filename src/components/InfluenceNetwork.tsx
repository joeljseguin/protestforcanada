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

// Layout positions
const tierPositions: Record<string, { x: number; y: number }> = {
  pmo: { x: 550, y: 0 }, treasury: { x: 900, y: 0 },
  anand: { x: -30, y: 220 }, hajdu: { x: 210, y: 220 }, champagne: { x: 450, y: 220 },
  freeland: { x: 690, y: 220 }, miller: { x: 930, y: 220 }, leblanc: { x: 1170, y: 220 }, blair: { x: 1410, y: 220 },
  gdls: { x: -60, y: 480 }, elbit: { x: 160, y: 480 }, "water-backlog": { x: 360, y: 480 },
  loblaws: { x: 560, y: 480 }, metro: { x: 760, y: 480 }, empire: { x: 960, y: 480 },
  snc: { x: 1160, y: 480 }, irving: { x: 1360, y: 480 },
  "td-bank": { x: 460, y: 630 }, rbc: { x: 660, y: 630 }, cibc: { x: 860, y: 630 }, bmo: { x: 1060, y: 630 },
  "lob-gdls": { x: -60, y: 820 }, "lob-elbit": { x: 160, y: 820 }, "lob-loblaws": { x: 360, y: 820 },
  "lob-fleishman": { x: 560, y: 820 }, "lob-banks": { x: 760, y: 820 }, "lob-mcmillan": { x: 960, y: 820 },
  "lob-prospectus": { x: 1160, y: 820 }, "lob-earnscliffe": { x: 1360, y: 820 },
  "gdls-factory": { x: -100, y: 1040 }, "elbit-factory": { x: 140, y: 1040 },
  ccc: { x: 420, y: 1040 }, "gac-export": { x: 680, y: 1040 },
  "us-dod": { x: 940, y: 1040 }, "conflict-zone": { x: 1200, y: 1040 },
  "sol-petition": { x: 200, y: 1260 }, "sol-committee": { x: 460, y: 1260 },
  "sol-house": { x: 720, y: 1260 }, "sol-senate": { x: 980, y: 1260 }, "sol-revoke": { x: 1240, y: 1260 },
};

export const InfluenceNetwork = () => {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodes: Node[] = useMemo(
    () => influenceNodes.map((n) => ({
      id: n.id, type: n.type,
      position: tierPositions[n.id] || { x: 0, y: 0 },
      data: { ...n },
      sourcePosition: Position.Bottom, targetPosition: Position.Top,
    })),
    []
  );

  const edges: Edge[] = useMemo(
    () => influenceEdges.map((e) => {
      const isCrisis = !!e.grantAmount;
      const isLobbyUp = e.id.startsWith("e-lob-");
      const isSolution = e.source.startsWith("sol-") || e.target.startsWith("sol-");
      const isPipeline = ["e-gdls-ccc", "e-elbit-ccc", "e-ccc-usdod", "e-usdod-conflict", "e-anand-ccc", "e-blair-ccc", "e-gac-ccc", "e-anand-gac"].includes(e.id);

      let strokeColor = "hsl(210 30% 40%)";
      let strokeWidth = 2;
      let animated = false;
      let dashArray: string | undefined;

      if (isSolution) {
        strokeColor = "hsl(210 100% 65%)";
        strokeWidth = 3;
        animated = true;
        if (e.target === "sol-revoke") strokeColor = "hsl(140 55% 50%)";
      } else if (isPipeline) {
        strokeColor = "hsl(0 72% 55%)";
        strokeWidth = 3;
        animated = true;
      } else if (isCrisis) {
        strokeColor = "hsl(0 72% 55%)";
        strokeWidth = 3;
        animated = true;
      } else if (isLobbyUp) {
        strokeColor = "hsl(45 100% 60%)";
        strokeWidth = 2.5;
        animated = true;
        dashArray = "6 3";
      }

      return {
        id: e.id, source: e.source, target: e.target, label: e.label,
        type: "smoothstep", animated,
        markerEnd: { type: MarkerType.ArrowClosed, color: strokeColor },
        style: { stroke: strokeColor, strokeWidth, strokeDasharray: dashArray },
        labelStyle: {
          fill: "hsl(210 40% 96%)", fontSize: 9,
          fontFamily: "Silkscreen, cursive", fontWeight: 700,
        },
        labelBgStyle: {
          fill: "hsl(228 35% 16%)", fillOpacity: 0.95,
          stroke: strokeColor, strokeWidth: 1.5,
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
    <section id="power-map" className="py-12 md:py-20">
      <div className="container mb-8">
        <h2 className="font-heading text-sm md:text-base uppercase tracking-tight text-primary mb-3">
          🗺 World Map — Follow the Arms Pipeline
        </h2>
        <p className="text-muted-foreground font-body text-sm max-w-3xl mb-4">
          Power flows from the <span className="text-accent">PMO</span> through <span className="text-primary">Ministers</span> to <span className="text-foreground">Corporations</span>.
          <span className="text-accent"> Gold dashed</span> = lobbyist influence.
          <span className="text-destructive"> Red animated</span> = arms pipeline.
          <span className="text-primary"> Blue</span> = YOUR solution path.
          Click any node for full dossier.
        </p>
        <div className="ff-panel p-3 font-body text-xs max-w-3xl" style={{ borderLeftWidth: 6, borderLeftColor: "hsl(0 72% 50%)" }}>
          <span className="font-bold uppercase text-destructive">⚠ ARMS PIPELINE: </span>
          Anita Anand + Bill Blair authorize exports → GDLS London & Elbit Kanata → CCC ships to US DoD → re-exports to conflict zones.
          <strong className="text-accent"> 438 shipments. $18.9M. Zero tracking.</strong>
        </div>
      </div>
      <div className="container">
        <div className="ff-panel overflow-hidden relative" style={{ height: 1550 }}>
          <ReactFlow
            nodes={nodes} edges={edges} nodeTypes={nodeTypes}
            fitView fitViewOptions={{ padding: 0.08 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.1} maxZoom={1.5}
            onEdgeMouseEnter={(_, edge) => setHoveredEdge(edge.id)}
            onEdgeMouseLeave={() => setHoveredEdge(null)}
            onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          >
            <Background color="hsl(210 30% 20%)" gap={32} size={1} />
            <Controls />
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
          <div className="mt-4 ff-panel p-4 font-body text-sm animate-fade-in">
            <span className="font-bold uppercase text-xs tracking-wider text-primary">Intel: </span>
            {edgeInfo.lobbying}
            {edgeInfo.grant && (
              <span className="ml-3 ff-panel px-2 py-0.5 text-xs font-bold text-accent inline-block">
                {edgeInfo.grant}
              </span>
            )}
          </div>
        )}
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-4 text-xs font-body">
          {[
            { label: "PMO/Minister", color: "hsl(210 100% 65%)" },
            { label: "Corporation", color: "hsl(140 55% 50%)" },
            { label: "Lobbyist", color: "hsl(270 50% 65%)" },
            { label: "Bank", color: "hsl(45 100% 60%)" },
            { label: "Factory", color: "hsl(0 72% 55%)" },
            { label: "Solution", color: "hsl(210 100% 65%)" },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-2 ff-panel px-3 py-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: color }} /> {label}
            </span>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-6 ff-panel p-4 font-body text-sm" style={{ borderLeftWidth: 6, borderLeftColor: "hsl(210 100% 65%)" }}>
          <span className="font-bold uppercase text-primary">🗳️ HOW TO STOP THE CRISIS:</span>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-xs text-muted-foreground">
            <li><strong className="text-foreground">Sign an e-petition</strong> — 500 sigs forces tabling</li>
            <li><strong className="text-foreground">2,500+ sigs</strong> → Standing Committee (FAAE) review</li>
            <li><strong className="text-foreground">FAAE</strong> can subpoena Anand, GDLS CEO, CCC</li>
            <li><strong className="text-foreground">House of Commons</strong> — Private Member's Bill</li>
            <li><strong className="text-foreground">Senate</strong> — final review</li>
            <li><strong className="text-accent">Royal Assent</strong> → ALL permits revoked → pipeline shut down</li>
          </ol>
        </div>
      </div>
    </section>
  );
};
