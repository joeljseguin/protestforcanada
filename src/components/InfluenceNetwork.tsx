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
import { influenceNodes, influenceEdges, type PersonDossier } from "@/data/gameData";
import { ExternalLink, AlertTriangle, Phone, Mail, Globe, User, X } from "lucide-react";

// Dossier side panel
function DossierPanel({ dossier, label, onClose }: { dossier: PersonDossier; label: string; onClose: () => void }) {
  return (
    <div className="absolute top-0 right-0 h-full w-80 z-50 neu-border bg-background overflow-y-auto animate-slide-in-right" style={{ borderLeft: "4px solid hsl(0 0% 0%)" }}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-extrabold text-sm uppercase">{label}</h3>
          <button onClick={onClose} className="neu-border p-1 hover:bg-secondary"><X className="h-3 w-3" /></button>
        </div>
        <div className="space-y-3 text-xs font-mono">
          <div className="neu-border p-3 bg-secondary">
            <div className="font-bold uppercase text-[11px] mb-1">{dossier.name}</div>
            <div className="text-muted-foreground">{dossier.title}</div>
          </div>
          {dossier.phone && (
            <a href={`tel:${dossier.phone}`} className="flex items-center gap-2 neu-border p-2 hover:bg-secondary transition-colors">
              <Phone className="h-3 w-3 shrink-0" /> {dossier.phone}
            </a>
          )}
          {dossier.email && (
            <a href={`mailto:${dossier.email}`} className="flex items-center gap-2 neu-border p-2 hover:bg-secondary transition-colors">
              <Mail className="h-3 w-3 shrink-0" /> {dossier.email}
            </a>
          )}
          {dossier.website && (
            <a href={dossier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 neu-border p-2 hover:bg-secondary transition-colors">
              <Globe className="h-3 w-3 shrink-0" /> Website
            </a>
          )}
          {dossier.assistant && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Assistant:</span> {dossier.assistant}</div>
          )}
          {dossier.reportsTo && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Reports to:</span> {dossier.reportsTo}</div>
          )}
          {dossier.salary && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Compensation:</span> {dossier.salary}</div>
          )}
          {dossier.netWorth && (
            <div className="neu-border p-2"><span className="text-muted-foreground">Net Worth:</span> {dossier.netWorth}</div>
          )}
          {dossier.lobbyingActivity && (
            <div className="neu-border p-2 bg-muted">
              <span className="text-muted-foreground block mb-1">Lobbying Activity:</span>
              {dossier.lobbyingActivity}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PMONode({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-extrabold text-sm" style={{ border: "4px solid hsl(0 0% 0%)", boxShadow: "0 0 20px hsl(0 84% 50% / 0.3)" }}>
        {data.avatarInitials || "?"}
      </div>
      <div className="text-center max-w-[180px]">
        <div className="font-heading font-bold text-xs uppercase">{data.label}</div>
        {data.role && <div className="text-[9px] font-mono text-muted-foreground">{data.role}</div>}
      </div>
    </div>
  );
}

function MinisterNode({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-extrabold text-lg" style={{ border: "4px solid hsl(0 0% 0%)" }}>
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
      className={`px-4 py-3 min-w-[160px] max-w-[200px] font-mono text-xs cursor-pointer ${isAlert ? "animate-pulse-red" : ""}`}
      style={{ border: "4px solid hsl(0 0% 0%)", background: isAlert ? "hsl(0 84% 95%)" : "hsl(0 0% 100%)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-[11px] uppercase tracking-wider">{data.label}</span>
        {isAlert && <AlertTriangle className="h-3 w-3 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />}
      </div>
      {data.detail && <p className="text-muted-foreground text-[10px]">{data.detail}</p>}
    </div>
  );
}

function BankNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 min-w-[140px] font-mono text-xs cursor-pointer" style={{ border: "4px solid hsl(0 0% 0%)", background: "hsl(45 100% 95%)" }}>
      <div className="font-bold text-[11px] uppercase tracking-wider">{data.label}</div>
      {data.detail && <p className="text-muted-foreground text-[10px] mt-0.5">{data.detail}</p>}
    </div>
  );
}

function LobbyistNode({ data }: { data: any }) {
  return (
    <div className="px-3 py-2 min-w-[140px] font-mono text-xs bg-secondary cursor-pointer" style={{ border: "4px solid hsl(0 0% 0%)" }}>
      <div className="font-bold text-[10px] uppercase tracking-wider">{data.label}</div>
      {data.detail && <p className="text-muted-foreground text-[9px] mt-0.5">{data.detail}</p>}
    </div>
  );
}

const nodeTypes = { pmo: PMONode, minister: MinisterNode, corporation: CorporationNode, lobbyist: LobbyistNode, bank: BankNode };

// Spider-web layout: PMO center, ministers ring, corps outer, lobbyists furthest
const tierPositions: Record<string, { x: number; y: number }> = {
  // Center
  pmo: { x: 400, y: 20 },
  treasury: { x: 700, y: 20 },
  // Ministers ring
  anand: { x: 100, y: 200 },
  hajdu: { x: 400, y: 200 },
  champagne: { x: 700, y: 200 },
  // Corporations
  gdls: { x: 0, y: 420 },
  elbit: { x: 200, y: 420 },
  "water-backlog": { x: 400, y: 420 },
  loblaws: { x: 650, y: 420 },
  // Banks
  "td-bank": { x: 850, y: 200 },
  rbc: { x: 1000, y: 200 },
  // Lobbyists
  "lob-gdls": { x: 0, y: 600 },
  "lob-elbit": { x: 200, y: 600 },
  "lob-loblaws": { x: 650, y: 600 },
  "lob-banks": { x: 920, y: 420 },
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
      influenceEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        type: "smoothstep",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(0 84% 50%)" },
        style: { stroke: "hsl(0 84% 50%)", strokeWidth: 3 },
        labelStyle: { fill: "hsl(0 0% 0%)", fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 600 },
        labelBgStyle: { fill: "hsl(0 0% 100%)", fillOpacity: 1, stroke: "hsl(0 0% 0%)", strokeWidth: 2 },
        labelBgPadding: [6, 4] as [number, number],
      })),
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
          Spider-Web Influence Network — PMO at center, Ministers, Corporations, Lobbyists, and Banks.
          <span className="font-bold text-foreground"> Click any node</span> to see full dossier with contact info.
          <span className="font-bold text-foreground"> Hover red lines</span> for lobbying frequency.
        </p>
      </div>
      <div className="container">
        <div className="neu-border overflow-hidden bg-background relative" style={{ height: 700 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.3}
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
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 rounded-full bg-foreground" /> PMO / Minister</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-background neu-border" /> Corporation</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 bg-secondary neu-border" /> Lobbyist</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-4 neu-border" style={{ background: "hsl(45 100% 95%)" }} /> Bank</span>
          <span className="flex items-center gap-2 neu-border px-3 py-1.5"><span className="w-4 h-0.5 bg-threat-red inline-block" style={{ width: 16 }} /> Influence Line</span>
        </div>
      </div>
    </section>
  );
};
