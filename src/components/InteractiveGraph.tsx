import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import * as d3 from "d3";
import { Search, RotateCcw, Layers, ChevronDown, Database } from "lucide-react";
import graphData from "@/data/fmcg-context-graph.json";

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = "supplier" | "ingredient" | "product" | "plant" | "channel" | "store";

interface RawNode { id: string; type: NodeType; label: string; description?: string; }
interface RawEdge { source: string; target: string; relation: string; }

interface SimNode extends RawNode {
  x?: number; y?: number;
  vx?: number; vy?: number;
  fx?: number | null; fy?: number | null;
}

interface DataLinkage {
  metric_category: string;
  description: string;
  source_system: string;
  object_type: string;
  object_name: string;
  join_key: string;
  refresh_frequency: string;
  example_fields: string[];
}

const CAT_COLOR: Record<string, string> = {
  cost:        "#f59e0b",
  volume:      "#60a5fa",
  inventory:   "#22c55e",
  performance: "#c084fc",
  demand:      "#fb923c",
  financial:   "#34d399",
  logistics:   "#22d3ee",
  risk:        "#f87171",
  quality:     "#818cf8",
  compliance:  "#94a3b8",
};

// ─── Theme palettes ───────────────────────────────────────────────────────────

const DARK_T = {
  bg:          "#0a0e1a",
  chrome:      "#111827",
  panel:       "#0d1117",
  border:      "#1f2937",
  borderAlt:   "#374151",
  textPri:     "#d1d5db",
  textSec:     "#9ca3af",
  textMut:     "#6b7280",
  inputBg:     "#1f2937",
  chipBg:      "#1f2937",
  fieldBg:     "#111827",
  fieldBorder: "#374151",
};

const LIGHT_T = {
  bg:          "#f1f5f9",
  chrome:      "#ffffff",
  panel:       "#f8fafc",
  border:      "#e2e8f0",
  borderAlt:   "#cbd5e1",
  textPri:     "#1e293b",
  textSec:     "#475569",
  textMut:     "#94a3b8",
  inputBg:     "#ffffff",
  chipBg:      "#f1f5f9",
  fieldBg:     "#ffffff",
  fieldBorder: "#e2e8f0",
};

// ─── Config ───────────────────────────────────────────────────────────────────

const NODE_CFG: Record<string, { color: string; dim: string; size: number; label: string; emoji: string }> = {
  supplier:   { color: "#f59e0b", dim: "#78350f", size: 18, label: "Supplier",   emoji: "🏭" },
  ingredient: { color: "#22c55e", dim: "#14532d", size: 13, label: "Ingredient", emoji: "🌿" },
  product:    { color: "#60a5fa", dim: "#1e3a5f", size: 22, label: "Product",    emoji: "📦" },
  plant:      { color: "#c084fc", dim: "#3b0764", size: 20, label: "Plant",      emoji: "🏗️" },
  channel:    { color: "#fb923c", dim: "#7c2d12", size: 18, label: "Channel",    emoji: "🔄" },
  store:      { color: "#f87171", dim: "#7f1d1d", size: 16, label: "Store",      emoji: "🛒" },
};

const DEFAULT_NODE_CFG = { color: "#9ca3af", dim: "#4b5563", size: 14, label: "Unknown", emoji: "◯" };

const REL_COLOR: Record<string, string> = {
  SUPPLIES:        "#f59e0b",
  USED_IN:         "#22c55e",
  MANUFACTURED_AT: "#a855f7",
  SOLD_THROUGH:    "#f97316",
  AVAILABLE_AT:    "#ef4444",
};

// ─── Dummy data source mappings ──────────────────────────────────────────────

const DUMMY_DATA_SOURCES: Record<string, DataLinkage[]> = {
  product: [
    { metric_category: "cost", description: "Product unit cost and margin data", source_system: "BigQuery", object_type: "table", object_name: "analytics.products.cost_margins", join_key: "product_id", refresh_frequency: "daily", example_fields: ["unit_cost", "margin_pct", "cogs"] },
    { metric_category: "volume", description: "Sales volume by SKU", source_system: "BigQuery", object_type: "view", object_name: "analytics.sales.volume_by_sku", join_key: "sku_id", refresh_frequency: "daily", example_fields: ["units_sold", "revenue", "period"] },
  ],
  ingredient: [
    { metric_category: "inventory", description: "Raw material stock levels", source_system: "BigQuery", object_type: "table", object_name: "analytics.inventory.raw_materials", join_key: "material_id", refresh_frequency: "hourly", example_fields: ["qty_on_hand", "reorder_point", "lead_time_days"] },
  ],
  supplier: [
    { metric_category: "performance", description: "Supplier delivery performance", source_system: "Snowflake", object_type: "view", object_name: "ops.suppliers.delivery_kpi", join_key: "supplier_id", refresh_frequency: "weekly", example_fields: ["on_time_pct", "defect_rate", "avg_lead_time"] },
    { metric_category: "risk", description: "Supplier risk scoring", source_system: "BigQuery", object_type: "table", object_name: "analytics.risk.supplier_scores", join_key: "supplier_id", refresh_frequency: "monthly", example_fields: ["risk_score", "financial_health", "geo_risk"] },
  ],
  plant: [
    { metric_category: "performance", description: "Plant utilization and throughput", source_system: "BigQuery", object_type: "table", object_name: "analytics.plants.utilization", join_key: "plant_id", refresh_frequency: "daily", example_fields: ["utilization_pct", "throughput", "downtime_hrs"] },
  ],
  channel: [
    { metric_category: "demand", description: "Channel demand forecasts", source_system: "BigQuery", object_type: "view", object_name: "analytics.demand.channel_forecast", join_key: "channel_id", refresh_frequency: "weekly", example_fields: ["forecast_units", "confidence", "trend"] },
  ],
  store: [
    { metric_category: "volume", description: "Store-level sales data", source_system: "Snowflake", object_type: "table", object_name: "retail.stores.daily_sales", join_key: "store_id", refresh_frequency: "daily", example_fields: ["units_sold", "revenue", "foot_traffic"] },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getNodeCfg(type: string) {
  return NODE_CFG[type] ?? DEFAULT_NODE_CFG;
}

function getNeighborIds(nodeId: string, edges: RawEdge[], depth: number): Set<string> {
  const visited = new Set<string>([nodeId]);
  let frontier = [nodeId];
  for (let d = 0; d < depth; d++) {
    const next: string[] = [];
    for (const fId of frontier) {
      for (const e of edges) {
        if (e.source === fId && !visited.has(e.target)) { visited.add(e.target); next.push(e.target); }
        if (e.target === fId && !visited.has(e.source)) { visited.add(e.source); next.push(e.source); }
      }
    }
    frontier = next;
    if (next.length === 0) break;
  }
  return visited;
}

function getNeighborsByRelation(nodeId: string, edges: RawEdge[]) {
  const out: Record<string, string[]> = {};
  const inn: Record<string, string[]> = {};
  for (const e of edges) {
    if (e.source === nodeId) { (out[e.relation] ||= []).push(e.target); }
    if (e.target === nodeId) { (inn[e.relation] ||= []).push(e.source); }
  }
  return { outgoing: out, incoming: inn };
}

// ─── Load static data ────────────────────────────────────────────────────────

const STATIC_NODES: RawNode[] = graphData.nodes.map(n => ({
  id: n.id,
  type: n.type.toLowerCase() as NodeType,
  label: n.label,
  description: n.description,
}));

const STATIC_EDGES: RawEdge[] = graphData.edges.map(e => ({
  source: e.source,
  target: e.target,
  relation: e.relationship,
}));

// ─── Public types for external graph data ────────────────────────────────────

export interface GraphNode { id: string; label: string; type: string; description?: string; }
export interface GraphEdge { source: string; target: string; relationship: string; }
export interface GraphData { nodes: GraphNode[]; edges: GraphEdge[]; }

interface InteractiveGraphProps {
  data?: GraphData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveGraph({ data }: InteractiveGraphProps = {}) {
  const svgRef      = useRef<SVGSVGElement>(null);
  const containerRef= useRef<HTMLDivElement>(null);
  const simRef      = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const zoomRef     = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const nodes: RawNode[] = useMemo(() => {
    if (!data) return STATIC_NODES;
    return data.nodes.map(n => ({ id: n.id, type: n.type.toLowerCase() as NodeType, label: n.label, description: n.description }));
  }, [data]);

  const edges: RawEdge[] = useMemo(() => {
    if (!data) return STATIC_EDGES;
    return data.edges.map(e => ({ source: e.source, target: e.target, relation: e.relationship }));
  }, [data]);

  // UI state
  const [focusedId,   setFocusedId]   = useState<string | null>(null);
  const [depth,       setDepth]       = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleTypes,setVisibleTypes]= useState<Set<string>>(new Set(Object.keys(NODE_CFG)));
  const [contextMenu,      setContextMenu]      = useState<{ x: number; y: number; nodeId: string } | null>(null);
  const [expandedLinkage,  setExpandedLinkage]  = useState<string | null>(null);

  const { theme } = useTheme();
  const T = theme === "dark" ? DARK_T : LIGHT_T;

  // ── Derived data ───────────────────────────────────────────────────────────

  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

  const allEntityTypes = [...new Set(nodes.map(n => n.type))];
  const ALL_TYPES = allEntityTypes.length > 0 ? allEntityTypes : Object.keys(NODE_CFG);

  const visibleNodes = nodes.filter(n => visibleTypes.has(n.type));
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));

  const highlightedIds = focusedId ? getNeighborIds(focusedId, visibleEdges, depth) : null;

  const focusedNode  = focusedId ? nodeMap.get(focusedId) ?? null : null;
  const focusedConns = focusedId ? getNeighborsByRelation(focusedId, visibleEdges) : null;

  // ── Main D3 effect ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || nodes.length === 0) return;

    const el   = svgRef.current;
    const W    = el.clientWidth  || 900;
    const H    = el.clientHeight || 580;
    const svg  = d3.select(el);

    svg.selectAll("*").remove();

    // ── Defs ──────────────────────────────────────────────────────────────────
    const defs = svg.append("defs");

    // Arrow marker per relationship
    Object.entries(REL_COLOR).forEach(([rel, color]) => {
      defs.append("marker")
        .attr("id", `arr-${rel}`)
        .attr("viewBox", "0 -4 8 8")
        .attr("refX", 8).attr("refY", 0)
        .attr("markerWidth", 5).attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4").attr("fill", color).attr("fill-opacity", 0.75);
    });

    // Also add markers for any relationship types not in REL_COLOR
    const allRelTypes = new Set(edges.map(e => e.relation));
    allRelTypes.forEach(rel => {
      if (!REL_COLOR[rel]) {
        defs.append("marker")
          .attr("id", `arr-${rel}`)
          .attr("viewBox", "0 -4 8 8")
          .attr("refX", 8).attr("refY", 0)
          .attr("markerWidth", 5).attr("markerHeight", 5)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M0,-4L8,0L0,4").attr("fill", "#4B5563").attr("fill-opacity", 0.75);
      }
    });

    // Glow filter
    const glowFilter = defs.append("filter").attr("id", "glow-sel");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "blur");
    const merge = glowFilter.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // ── Zoom ──────────────────────────────────────────────────────────────────
    const g = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 5])
      .on("zoom", ev => g.attr("transform", ev.transform.toString()));
    svg.call(zoom).on("click.dismiss", () => {
      setContextMenu(null);
      setFocusedId(null);
    });
    zoomRef.current = zoom;

    // ── Build simulation nodes/edges (copies so D3 can mutate) ───────────────
    const simNodes: SimNode[] = nodes.map(n => ({ ...n, x: W/2 + (Math.random()-0.5)*80, y: H/2 + (Math.random()-0.5)*80 }));
    const simNodeMap = new Map(simNodes.map(n => [n.id, n]));

    interface SimEdge extends d3.SimulationLinkDatum<SimNode> {
      id: string; relation: string;
      source: SimNode; target: SimNode;
    }
    const simEdges: SimEdge[] = edges
      .map((e, i) => ({
        id: `${e.source}-${e.target}-${i}`,
        relation: e.relation,
        source: simNodeMap.get(e.source)!,
        target: simNodeMap.get(e.target)!,
      }))
      .filter(e => e.source && e.target);

    // ── Simulation ────────────────────────────────────────────────────────────
    const sim = d3.forceSimulation<SimNode>(simNodes)
      .force("link",
        d3.forceLink<SimNode, SimEdge>(simEdges)
          .id(d => d.id)
          .distance(d => d.relation === "USED_IN" ? 110 : d.relation === "SUPPLIES" ? 130 : 90)
          .strength(0.4)
      )
      .force("charge", d3.forceManyBody<SimNode>().strength(d => d.type === "ingredient" ? -130 : -260))
      .force("center", d3.forceCenter(W/2, H/2).strength(0.05))
      .force("collide", d3.forceCollide<SimNode>(d => getNodeCfg(d.type).size * 3));

    simRef.current = sim;

    // ── Draw edges ────────────────────────────────────────────────────────────
    const linkGroup = g.append("g").attr("class", "links");
    const linkSel = linkGroup.selectAll<SVGPathElement, SimEdge>("path")
      .data(simEdges, d => d.id)
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", d => REL_COLOR[d.relation] ?? "#4B5563")
      .attr("stroke-width", 1.2)
      .attr("stroke-opacity", 0.45)
      .attr("marker-end", d => `url(#arr-${d.relation})`);

    linkSel.append("title").text(d => d.relation);

    // ── Draw nodes ────────────────────────────────────────────────────────────
    const nodeGroup = g.append("g").attr("class", "nodes");
    const nodeSel = nodeGroup.selectAll<SVGGElement, SimNode>("g.node")
      .data(simNodes, d => d.id)
      .enter().append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on("start", (ev, d) => { if (!ev.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on("drag",  (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
          .on("end",   (ev, d) => {
            if (!ev.active) sim.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    // Outer glow ring
    nodeSel.append("circle")
      .attr("class", "glow-ring")
      .attr("r", d => getNodeCfg(d.type).size + 6)
      .attr("fill", d => getNodeCfg(d.type).color)
      .attr("fill-opacity", 0)
      .attr("stroke", "none");

    // Main circle
    nodeSel.append("circle")
      .attr("class", "main-circle")
      .attr("r", d => getNodeCfg(d.type).size)
      .attr("fill", d => getNodeCfg(d.type).color)
      .attr("fill-opacity", 0.18)
      .attr("stroke", d => getNodeCfg(d.type).color)
      .attr("stroke-width", 1.5);

    // Emoji icon
    nodeSel.append("text")
      .attr("class", "icon-text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", d => getNodeCfg(d.type).size * 0.95)
      .style("pointer-events", "none")
      .text(d => getNodeCfg(d.type).emoji);

    // Label
    nodeSel.append("text")
      .attr("class", "label-text")
      .attr("text-anchor", "middle")
      .attr("dy", d => getNodeCfg(d.type).size + 11)
      .attr("font-size", "9px")
      .attr("fill", d => getNodeCfg(d.type).color)
      .attr("font-family", "'JetBrains Mono', 'Courier New', monospace")
      .style("pointer-events", "none")
      .text(d => d.label.length > 16 ? d.label.slice(0, 15) + "…" : d.label);

    nodeSel.append("title").text(d => `${d.type.toUpperCase()}: ${d.label}`);

    // Click
    nodeSel.on("click.focus", function(ev, d) {
      ev.stopPropagation();
      setContextMenu(null);
      setFocusedId(prev => prev === d.id ? null : d.id);
    });

    // Right-click context menu
    nodeSel.on("contextmenu", function(ev, d) {
      ev.preventDefault(); ev.stopPropagation();
      const rect = svgRef.current!.getBoundingClientRect();
      setContextMenu({ x: ev.clientX - rect.left, y: ev.clientY - rect.top, nodeId: d.id });
    });

    // Hover
    nodeSel.on("mouseenter.hover", function(_, d) {
      d3.select(this).select(".main-circle").attr("fill-opacity", 0.38).attr("r", getNodeCfg(d.type).size + 2);
    }).on("mouseleave.hover", function(_, d) {
      d3.select(this).select(".main-circle").attr("fill-opacity", 0.18).attr("r", getNodeCfg(d.type).size);
    });

    // ── Tick ──────────────────────────────────────────────────────────────────
    sim.on("tick", () => {
      linkSel.attr("d", (d: SimEdge) => {
        const sx = (d.source as SimNode).x ?? 0, sy = (d.source as SimNode).y ?? 0;
        const tx = (d.target as SimNode).x ?? 0, ty = (d.target as SimNode).y ?? 0;
        const tSize = getNodeCfg((d.target as SimNode).type).size + 8;
        const dx = tx - sx, dy = ty - sy, len = Math.sqrt(dx*dx + dy*dy) || 1;
        const ex = tx - (dx/len)*tSize, ey = ty - (dy/len)*tSize;
        const dr = len * 0.6;
        return `M${sx},${sy} A${dr},${dr} 0 0,1 ${ex},${ey}`;
      });
      nodeSel.attr("transform", (d: SimNode) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // ── Auto-fit after stabilisation ─────────────────────────────────────────
    const fitTimer = setTimeout(() => {
      const gbbox = (g.node() as SVGGElement | null)?.getBBox();
      if (gbbox && gbbox.width > 0) {
        const pad = 40;
        const scale = Math.min((W - pad*2) / gbbox.width, (H - pad*2) / gbbox.height, 1.5) * 0.85;
        const tx = W/2 - (gbbox.x + gbbox.width/2)  * scale;
        const ty = H/2 - (gbbox.y + gbbox.height/2) * scale;
        svg.transition().duration(800).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
      }
    }, 2200);

    return () => {
      clearTimeout(fitTimer);
      sim.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  // ── Highlight effect ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const sq  = searchQuery.trim().toLowerCase();

    svg.selectAll<SVGGElement, SimNode>(".node").each(function(d) {
      const sel = d3.select(this);
      const isFocused     = d.id === focusedId;
      const isTypeVisible = visibleTypes.has(d.type);
      const isHighlighted = highlightedIds ? highlightedIds.has(d.id) : true;
      const isSearch      = sq ? d.label.toLowerCase().includes(sq) : true;
      const visible       = isTypeVisible && isHighlighted && isSearch;

      sel.attr("opacity", visible ? 1 : isTypeVisible ? 0.1 : 0.04);
      sel.select(".main-circle")
        .attr("stroke-width", isFocused ? 3 : 1.5)
        .attr("filter", isFocused ? "url(#glow-sel)" : null);
      sel.select(".glow-ring")
        .attr("fill-opacity", isFocused ? 0.14 : 0);
    });

    svg.selectAll<SVGPathElement, { source: SimNode; target: SimNode; relation: string }>(".links path")
      .attr("stroke-opacity", function(d) {
        const sId = d.source?.id, tId = d.target?.id;
        if (!sId || !tId) return 0;
        const sNode = nodeMap.get(sId);
        const tNode = nodeMap.get(tId);
        if (!sNode || !tNode || !visibleTypes.has(sNode.type) || !visibleTypes.has(tNode.type)) return 0;
        if (highlightedIds) {
          return (highlightedIds.has(sId) && highlightedIds.has(tId)) ? 0.75 : 0.04;
        }
        if (sq) {
          const sLabel = sNode.label.toLowerCase();
          const tLabel = tNode.label.toLowerCase();
          return (sLabel.includes(sq) || tLabel.includes(sq)) ? 0.75 : 0.08;
        }
        return 0.45;
      });
  }, [focusedId, depth, searchQuery, highlightedIds, visibleTypes, nodeMap]);

  // ── Controls ───────────────────────────────────────────────────────────────

  const resetView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition().duration(600)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  }, []);

  const toggleType = (type: string) => {
    setVisibleTypes(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const handleContextAction = (action: string) => {
    if (!contextMenu) return;
    const { nodeId } = contextMenu;
    if (action === "expand") {
      setFocusedId(nodeId); setDepth(prev => Math.min(prev + 1, 3));
    } else if (action === "copy") {
      navigator.clipboard.writeText(nodeMap.get(nodeId)?.label ?? nodeId);
    }
    setContextMenu(null);
  };

  if (nodes.length === 0) {
    return (
      <div style={{ background: T.bg, borderRadius: 16 }} className="border border-slate-200 dark:border-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 py-20">
          <Database className="h-6 w-6" style={{ color: T.textMut }} />
          <p className="text-sm" style={{ color: T.textMut }}>No entities found.</p>
        </div>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const dataSources = focusedNode ? (DUMMY_DATA_SOURCES[focusedNode.type] || []) : [];

  return (
    <div style={{ background: T.bg, borderRadius: 16, overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }} className="border border-slate-200 dark:border-slate-800">

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div style={{ background: T.chrome, borderBottom: `1px solid ${T.border}` }} className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: T.textMut }} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search nodes…"
              style={{ background: T.inputBg, border: `1px solid ${T.borderAlt}`, color: T.textPri, fontFamily: "'JetBrains Mono', monospace", outline: "none" }}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5" style={{ color: T.textSec }}>
            <span className="text-xs">Depth:</span>
            {[1,2,3].map(d => (
              <button
                key={d}
                onClick={() => setDepth(d)}
                style={{
                  background: depth === d ? "#3b82f6" : T.chipBg,
                  border: `1px solid ${depth === d ? "#3b82f6" : T.borderAlt}`,
                  color: depth === d ? "#fff" : T.textSec,
                }}
                className="w-7 h-7 rounded text-xs font-mono transition-colors"
              >
                {d}
              </button>
            ))}
          </div>

          <button
            onClick={resetView}
            style={{ background: T.chipBg, border: `1px solid ${T.borderAlt}`, color: T.textSec }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:border-slate-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>

          {focusedId && (
            <button
              onClick={() => setFocusedId(null)}
              style={{ background: T.chipBg, border: `1px solid ${T.borderAlt}`, color: "#f87171" }}
              className="px-3 py-1.5 rounded-lg text-xs hover:border-red-400 transition-colors"
            >
              Clear focus
            </button>
          )}
        </div>
      </div>

      {/* ── Main layout ──────────────────────────────────────────────────────── */}
      <div className="flex" style={{ height: 580 }}>

        {/* ── Left sidebar: Layer toggles ───────────────────────────────────── */}
        <div style={{ background: T.panel, borderRight: `1px solid ${T.border}`, width: 148, flexShrink: 0 }} className="py-3 px-3 flex flex-col gap-2">
          <p style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }} className="text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Layers className="h-3 w-3" /> Layers
          </p>
          {ALL_TYPES.map(type => {
            const cfg = getNodeCfg(type);
            const active = visibleTypes.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="flex items-center gap-2 text-left w-full rounded px-2 py-1.5 transition-colors"
                style={{ background: active ? `${cfg.color}18` : "transparent", border: `1px solid ${active ? cfg.color + "60" : T.border}` }}
              >
                <span className="text-sm">{cfg.emoji}</span>
                <span className="text-xs" style={{ color: active ? cfg.color : T.textMut, fontFamily: "'JetBrains Mono', monospace" }}>
                  {cfg.label}
                </span>
              </button>
            );
          })}

          <div style={{ borderTop: `1px solid ${T.border}` }} className="mt-2 pt-2">
            <p style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }} className="text-xs uppercase tracking-widest mb-2">Legend</p>
            {Object.entries(REL_COLOR).map(([rel, color]) => (
              <div key={rel} className="flex items-center gap-1.5 mb-1">
                <div className="h-0.5 w-4 rounded" style={{ background: color }} />
                <span style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }} className="text-[9px]">{rel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Graph canvas ─────────────────────────────────────────────────── */}
        <div ref={containerRef} className="flex-1 relative" onClick={() => setContextMenu(null)}>
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{ background: T.bg }}
          />

          {/* Node count overlay */}
          <div className="absolute bottom-3 left-3 flex gap-3">
            <span style={{ background: T.chrome + "cc", border: `1px solid ${T.border}`, color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }}
              className="text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
              {visibleNodes.length} nodes · {visibleEdges.length} edges
            </span>
            {focusedId && highlightedIds && (
              <span style={{ background: "#1e3a5faa", border: "1px solid #3b82f680", color: "#93c5fd", fontFamily: "'JetBrains Mono', monospace" }}
                className="text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                Focus: {highlightedIds.size} related nodes
              </span>
            )}
          </div>

          {/* Context menu */}
          {contextMenu && (
            <div
              onClick={e => e.stopPropagation()}
              className="absolute z-50 rounded-xl overflow-hidden shadow-2xl"
              style={{ left: contextMenu.x, top: contextMenu.y, background: T.chrome, border: `1px solid ${T.borderAlt}`, minWidth: 180 }}
            >
              <div style={{ borderBottom: `1px solid ${T.borderAlt}`, color: T.textSec }} className="px-3 py-2 text-xs font-mono">
                {nodeMap.get(contextMenu.nodeId)?.label}
              </div>
              {[
                { action: "expand", label: "Expand neighbors", color: "#60a5fa" },
                { action: "copy",   label: "Copy node info",   color: T.textSec },
              ].map(item => (
                <button
                  key={item.action}
                  onClick={() => handleContextAction(item.action)}
                  className="block w-full text-left px-3 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: item.color, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right panel: node details ────────────────────────────────────── */}
        {focusedNode && focusedConns && (
          <div
            style={{ width: 260, background: T.panel, borderLeft: `1px solid ${T.border}`, overflowY: "auto" }}
            className="py-4 px-4 flex flex-col gap-4 flex-shrink-0"
          >
            {/* Node header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getNodeCfg(focusedNode.type).emoji}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: getNodeCfg(focusedNode.type).color }}>
                    {focusedNode.label}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: getNodeCfg(focusedNode.type).color + "25", color: getNodeCfg(focusedNode.type).color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {getNodeCfg(focusedNode.type).label}
                  </span>
                </div>
              </div>
              {focusedNode.description && (
                <p className="text-xs mt-1" style={{ color: T.textSec }}>{focusedNode.description}</p>
              )}
              <div style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] mt-1">
                ID: {focusedNode.id}
              </div>
            </div>

            {/* Outgoing connections */}
            {Object.entries(focusedConns.outgoing).map(([rel, ids]) => (
              <div key={`out-${rel}`}>
                <p className="text-xs mb-1.5" style={{ color: REL_COLOR[rel] ?? T.textSec, fontFamily: "'JetBrains Mono', monospace" }}>
                  → {rel}
                </p>
                <div className="flex flex-wrap gap-1">
                  {ids.map(id => {
                    const n = nodeMap.get(id);
                    if (!n) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => setFocusedId(id)}
                        className="text-xs px-2 py-0.5 rounded-full transition-colors"
                        style={{
                          background: getNodeCfg(n.type).color + "20",
                          border: `1px solid ${getNodeCfg(n.type).color}50`,
                          color: getNodeCfg(n.type).color,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {n.label.length > 14 ? n.label.slice(0, 13) + "…" : n.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Incoming connections */}
            {Object.entries(focusedConns.incoming).map(([rel, ids]) => (
              <div key={`in-${rel}`}>
                <p className="text-xs mb-1.5" style={{ color: REL_COLOR[rel] ?? T.textSec, fontFamily: "'JetBrains Mono', monospace" }}>
                  ← {rel}
                </p>
                <div className="flex flex-wrap gap-1">
                  {ids.map(id => {
                    const n = nodeMap.get(id);
                    if (!n) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => setFocusedId(id)}
                        className="text-xs px-2 py-0.5 rounded-full transition-colors"
                        style={{
                          background: getNodeCfg(n.type).color + "20",
                          border: `1px solid ${getNodeCfg(n.type).color}50`,
                          color: getNodeCfg(n.type).color,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {n.label.length > 14 ? n.label.slice(0, 13) + "…" : n.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(focusedConns.outgoing).length === 0 && Object.keys(focusedConns.incoming).length === 0 && (
              <p style={{ color: T.textMut }} className="text-xs">No visible connections with current layer filters.</p>
            )}

            {/* Data Sources */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs flex items-center gap-1.5" style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  <Database className="h-3 w-3" /> Data Sources
                </p>
              </div>
              {dataSources.length === 0 ? (
                <p className="text-xs" style={{ color: T.textMut }}>No data sources configured.</p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {dataSources.map((lnk, idx) => {
                    const key = `${focusedNode.type}-${idx}`;
                    const isOpen = expandedLinkage === key;
                    const catColor = CAT_COLOR[lnk.metric_category] ?? "#9ca3af";
                    return (
                      <div key={key} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${catColor}30`, background: `${catColor}08` }}>
                        <button
                          onClick={() => setExpandedLinkage(isOpen ? null : key)}
                          className="w-full text-left px-2.5 py-1.5 flex items-start gap-2"
                        >
                          <span className="h-2 w-2 rounded-full shrink-0 mt-1" style={{ background: catColor }} />
                          <span className="text-xs flex-1 leading-snug" style={{ color: T.textPri }}>{lnk.description}</span>
                          <ChevronDown className="h-3 w-3 shrink-0 mt-0.5 transition-transform" style={{ color: T.textMut, transform: isOpen ? "rotate(180deg)" : "none" }} />
                        </button>
                        {isOpen && (
                          <div className="px-2.5 pb-2.5 space-y-1.5">
                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: catColor + "22", color: catColor, fontFamily: "'JetBrains Mono', monospace" }}>{lnk.metric_category}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: T.chipBg, color: T.textSec, fontFamily: "'JetBrains Mono', monospace" }}>{lnk.source_system}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: T.chipBg, color: "#16a34a", fontFamily: "'JetBrains Mono', monospace" }}>{lnk.refresh_frequency}</span>
                            </div>
                            <p className="text-[9px] break-all" style={{ color: "#2563eb", fontFamily: "'JetBrains Mono', monospace" }}>{lnk.object_name}</p>
                            <p className="text-[9px]" style={{ color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }}>join: {lnk.join_key}</p>
                            <div className="flex flex-wrap gap-1">
                              {lnk.example_fields.map(f => (
                                <span key={f} className="text-[8px] px-1 py-0.5 rounded" style={{ background: T.fieldBg, border: `1px solid ${T.fieldBorder}`, color: T.textMut, fontFamily: "'JetBrains Mono', monospace" }}>{f}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
