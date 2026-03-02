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

// Wider layout for all tiers including factories, intermediaries, and solution pathway
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

  // TIER 4: Factories & Intermediaries (y=1020)
  "gdls-factory": { x: -100, y: 1040 },
  "elbit-factory": { x: 140, y: 1040 },
  ccc: { x: 420, y: 1040 },
  "gac-export": { x: 680, y: 1040 },
  "us-dod": { x: 940, y: 1040 },
  "conflict-zone": { x: 1200, y: 1040 },

  // TIER 5: Solution Pathway (y=1260)
  "sol-petition": { x: 200, y: 1260 },
  "sol-committee": { x: 460, y: 1260 },
  "sol-house": { x: 720, y: 1260 },
  "sol-senate": { x: 980, y: 1260 },
  "sol-revoke": { x: 1240, y: 1260 },
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
        const isSolution = e.source.startsWith("sol-") || e.target.startsWith("sol-");
        const isFactory = e.target.endsWith("-factory") || e.source.endsWith("-factory");
        const isPipeline = ["e-gdls-ccc", "e-elbit-ccc", "e-ccc-usdod", "e-usdod-conflict", "e-anand-ccc", "e-blair-ccc", "e-gac-ccc", "e-anand-gac"].includes(e.id);

        let strokeColor = "hsl(0 0% 65%)";
        let strokeWidth = 2;
        let animated = false;
        let dashArray: string | undefined;

        if (isSolution) {
          strokeColor = "hsl(220 80% 50%)";
          strokeWidth = 3;
          animated = true;
          if (e.target === "sol-revoke") {
            strokeColor = "hsl(142 60% 38%)";
          }
        } else if (isPipeline) {
          strokeColor = "hsl(0 84% 50%)";
          strokeWidth = 3;
          animated = true;
        } else if (isFactory) {
          strokeColor = "hsl(0 84% 50%)";
          strokeWidth = 2.5;
        } else if (isCrisis) {
          strokeColor = "hsl(0 84% 50%)";
          strokeWidth = 3;
          animated = true;
        } else if (isLobbyUp) {
          strokeColor = "hsl(38 92% 45%)";
          strokeWidth = 2.5;
          animated = true;
          dashArray = "6 3";
        }

        return {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          type: "smoothstep",
          animated,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: strokeColor,
          },
          style: {
            stroke: strokeColor,
            strokeWidth,
            strokeDasharray: dashArray,
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
            stroke: strokeColor,
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
          Who Has the Power? Follow the Arms Pipeline.
        </h2>
        <p className="text-muted-foreground font-mono text-sm max-w-3xl mb-4">
          Power flows from the <span className="font-bold text-foreground">PMO</span> through <span className="font-bold text-foreground">Ministers</span> to <span className="font-bold text-foreground">Corporations</span>.
          <span className="font-bold" style={{ color: "hsl(38 92% 45%)" }}> Gold dashed lines</span> = lobbyist influence pushing UP.
          <span className="font-bold" style={{ color: "hsl(0 84% 50%)" }}> Red animated lines</span> = the arms pipeline from factory → conflict zone.
          <span className="font-bold" style={{ color: "hsl(220 80% 50%)" }}> Blue lines</span> = YOUR solution pathway.
          <span className="font-bold text-foreground"> Click any node</span> for full dossier + XP actions.
        </p>
        <div className="neu-border p-3 bg-secondary font-mono text-xs max-w-3xl" style={{ borderLeft: "6px solid hsl(0 84% 50%)" }}>
          <span className="font-extrabold uppercase text-[11px] tracking-wider" style={{ color: "hsl(0 84% 50%)" }}>
            ⚠ THE ARMS PIPELINE:
          </span>{" "}
          Anita Anand (Foreign Affairs) + Bill Blair (Defence) authorize export permits → GDLS London & Elbit Kanata factories produce weapons →
          Canadian Commercial Corporation ships to US DoD → US re-exports to conflict zones. <strong>438 shipments. $18.9M. Zero end-use tracking.</strong>
        </div>
      </div>
      <div className="container">
        <div className="neu-border overflow-hidden bg-background relative" style={{ height: 1550 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.08 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.1}
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
            <span className="font-extrabold uppercase text-xs tracking-wider">Intel: </span>
            {edgeInfo.lobbying}
            {edgeInfo.grant && (
              <span className="ml-3 neu-border px-2 py-0.5 bg-muted text-xs font-bold">
                {edgeInfo.grant}
              </span>
            )}
          </div>
        )}
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 text-xs font-mono font-bold">
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
            <span className="w-4 h-4 neu-border" style={{ background: "hsl(0 60% 97%)", borderColor: "hsl(0 84% 50%)" }} /> Factory
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 neu-border" style={{ background: "hsl(220 60% 95%)" }} /> Intermediary
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="w-4 h-4 neu-border" style={{ background: "hsl(220 80% 97%)", borderColor: "hsl(220 80% 50%)" }} /> Solution Path
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="inline-block" style={{ width: 20, height: 3, background: "hsl(0 84% 50%)" }} /> Arms Pipeline
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="inline-block" style={{ width: 20, height: 2, background: "hsl(38 92% 45%)", borderTop: "2px dashed hsl(38 92% 45%)" }} /> Lobbyist → Minister
          </span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5">
            <span className="inline-block" style={{ width: 20, height: 3, background: "hsl(220 80% 50%)" }} /> Solution Path
          </span>
        </div>
        {/* Call to Action */}
        <div className="mt-6 neu-border p-4 font-mono text-sm" style={{ borderLeft: "6px solid hsl(220 80% 50%)", background: "hsl(220 80% 97%)" }}>
          <span className="font-extrabold uppercase text-[11px] tracking-wider" style={{ color: "hsl(220 80% 50%)" }}>
            🗳️ HOW TO STOP THE CRISIS:
          </span>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-xs">
            <li><strong>Sign an e-petition</strong> on ourcommons.ca — 500 signatures forces tabling in Parliament</li>
            <li><strong>2,500+ signatures</strong> triggers Standing Committee on Foreign Affairs (FAAE) review</li>
            <li><strong>FAAE Committee</strong> can subpoena Minister Anand, GDLS CEO, and CCC officials</li>
            <li><strong>House of Commons</strong> — your MP can introduce a Private Member's Bill to revoke legacy permits</li>
            <li><strong>Senate</strong> — final review. Senator McPhedran has been vocal on arms control</li>
            <li><strong>Royal Assent</strong> → ALL 12 legacy permits revoked → arms pipeline shut down</li>
          </ol>
        </div>
      </div>
    </section>
  );
};
