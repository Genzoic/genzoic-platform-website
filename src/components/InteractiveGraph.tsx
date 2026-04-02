import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import * as d3 from "d3";
import { Search, RotateCcw, Layers, ChevronDown, Database, HelpCircle, X, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import graphData from "@/data/fmcg-context-graph.json";

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = "supplier" | "ingredient" | "product" | "plant" | "channel" | "store" | "allergen" | "recipe" | "certification" | "cleaning_protocol" | "label_claim" | "lot" | "process" | "skill" | "people" | "department";

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
  supplier:          { color: "#f59e0b", dim: "#78350f", size: 18, label: "Supplier",          emoji: "🏭" },
  ingredient:        { color: "#22c55e", dim: "#14532d", size: 13, label: "Ingredient",        emoji: "🌿" },
  product:           { color: "#60a5fa", dim: "#1e3a5f", size: 22, label: "Product",           emoji: "📦" },
  plant:             { color: "#c084fc", dim: "#3b0764", size: 20, label: "Plant",             emoji: "🏗️" },
  channel:           { color: "#fb923c", dim: "#7c2d12", size: 18, label: "Channel",           emoji: "🔄" },
  store:             { color: "#f87171", dim: "#7f1d1d", size: 16, label: "Store",             emoji: "🛒" },
  allergen:          { color: "#ef4444", dim: "#7f1d1d", size: 17, label: "Allergen",          emoji: "⚠️" },
  recipe:            { color: "#8b5cf6", dim: "#4c1d95", size: 16, label: "Recipe",            emoji: "📋" },
  certification:     { color: "#14b8a6", dim: "#134e4a", size: 15, label: "Certification",     emoji: "✅" },
  cleaning_protocol: { color: "#06b6d4", dim: "#164e63", size: 14, label: "Cleaning Protocol", emoji: "🧹" },
  label_claim:       { color: "#eab308", dim: "#713f12", size: 14, label: "Label Claim",       emoji: "🏷️" },
  lot:               { color: "#ec4899", dim: "#831843", size: 15, label: "Lot",               emoji: "📊" },
  process:           { color: "#7c3aed", dim: "#4c1d95", size: 17, label: "Process",           emoji: "⚙️" },
  skill:             { color: "#059669", dim: "#064e3b", size: 16, label: "Skill",             emoji: "✨" },
  people:            { color: "#e11d48", dim: "#881337", size: 17, label: "People",            emoji: "👤" },
  department:        { color: "#d946ef", dim: "#86198f", size: 18, label: "Department",        emoji: "🏢" },
};

const DEFAULT_NODE_CFG = { color: "#9ca3af", dim: "#4b5563", size: 14, label: "Unknown", emoji: "◯" };

const REL_COLOR_STATIC: Record<string, string> = {
  SUPPLIES:                  "#f59e0b",
  USED_IN:                   "#22c55e",
  MANUFACTURED_AT:           "#a855f7",
  SOLD_THROUGH:              "#f97316",
  AVAILABLE_AT:              "#ef4444",
  FEEDS_INTO:                "#60a5fa",
  MANUFACTURED_BY:           "#a855f7",
  CERTIFIES:                 "#34d399",
  DEVELOPS:                  "#fb923c",
  DELIVERS_TO:               "#f43f5e",
  DISTRIBUTES:               "#06b6d4",
  FULFILLS:                  "#84cc16",
  CONTAINS:                  "#ef4444",
  USES:                      "#22c55e",
  PRODUCES:                  "#60a5fa",
  HAS_CERTIFICATION:         "#14b8a6",
  CROSS_CONTAMINATION_RISK:  "#f87171",
  USES_PROTOCOL:             "#06b6d4",
  HAS_LABEL:                 "#eab308",
  PRODUCED_AS:               "#ec4899",
  MADE_AT:                   "#a855f7",
  DISTRIBUTED_TO:            "#f43f5e",
  TRIGGERS:                  "#7c3aed",
  ANCHORED_TO:               "#059669",
  CREATED_BY:                "#e11d48",
  BELONGS_TO:                "#d946ef",
  REPORTS_TO:                "#a855f7",
  RESPONSIBLE_FOR:           "#f59e0b",
};

const REL_PALETTE = [
  "#60a5fa", "#34d399", "#f97316", "#c084fc", "#fb923c",
  "#f43f5e", "#06b6d4", "#84cc16", "#fbbf24", "#a78bfa",
  "#22d3ee", "#e879f9",
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function getRelColor(rel: string): string {
  return REL_COLOR_STATIC[rel] ?? REL_PALETTE[hashStr(rel) % REL_PALETTE.length];
}

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
  allergen: [
    { metric_category: "compliance", description: "Allergen classification and thresholds", source_system: "BigQuery", object_type: "table", object_name: "analytics.compliance.allergen_registry", join_key: "allergen_id", refresh_frequency: "monthly", example_fields: ["allergen_name", "threshold_ppm", "regulation_ref"] },
  ],
  recipe: [
    { metric_category: "quality", description: "Recipe formulation and version history", source_system: "BigQuery", object_type: "table", object_name: "analytics.formulation.recipes", join_key: "recipe_id", refresh_frequency: "daily", example_fields: ["version", "ingredients_list", "yield_pct"] },
  ],
  certification: [
    { metric_category: "compliance", description: "Certification status and expiry tracking", source_system: "Snowflake", object_type: "view", object_name: "ops.compliance.certifications", join_key: "cert_id", refresh_frequency: "weekly", example_fields: ["cert_type", "issued_date", "expiry_date", "status"] },
  ],
  cleaning_protocol: [
    { metric_category: "quality", description: "Cleaning protocol validation records", source_system: "BigQuery", object_type: "table", object_name: "analytics.quality.cleaning_logs", join_key: "protocol_id", refresh_frequency: "daily", example_fields: ["validated", "last_run", "efficacy_pct", "residue_ppm"] },
  ],
  label_claim: [
    { metric_category: "compliance", description: "Label claim verification and audit trail", source_system: "BigQuery", object_type: "table", object_name: "analytics.compliance.label_claims", join_key: "claim_id", refresh_frequency: "weekly", example_fields: ["claim_text", "verified", "audit_date"] },
  ],
  lot: [
    { metric_category: "logistics", description: "Lot traceability and distribution data", source_system: "Snowflake", object_type: "table", object_name: "ops.traceability.lot_tracking", join_key: "lot_id", refresh_frequency: "hourly", example_fields: ["batch_number", "production_date", "distribution_status", "recall_flag"] },
  ],
  process: [
    { metric_category: "performance", description: "Process execution logs and outcomes", source_system: "BigQuery", object_type: "table", object_name: "analytics.workflows.execution_log", join_key: "process_id", refresh_frequency: "daily", example_fields: ["trigger_event", "execution_time", "outcome", "escalated"] },
  ],
  skill: [
    { metric_category: "performance", description: "Skill invocation history and accuracy", source_system: "BigQuery", object_type: "table", object_name: "analytics.skills.invocation_log", join_key: "skill_id", refresh_frequency: "daily", example_fields: ["invocation_count", "override_rate", "accuracy_pct", "last_invoked"] },
  ],
  people: [
    { metric_category: "performance", description: "Employee skill contributions and activity", source_system: "BigQuery", object_type: "view", object_name: "analytics.people.skill_contributions", join_key: "employee_id", refresh_frequency: "weekly", example_fields: ["skills_created", "skills_active", "department", "role_level"] },
  ],
  department: [
    { metric_category: "performance", description: "Department skill coverage and conflict resolution", source_system: "BigQuery", object_type: "view", object_name: "analytics.departments.skill_coverage", join_key: "dept_id", refresh_frequency: "weekly", example_fields: ["total_skills", "conflict_count", "resolution_rate", "coverage_pct"] },
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
export interface GraphData { nodes: GraphNode[]; edges: GraphEdge[]; questions?: PredefinedQuestion[]; }

interface PredefinedQuestion {
  id: string;
  question: string;
  answer: string;
  highlightNodes: string[];
  highlightEdges: string[];
  reasoningSteps: string[];
}

interface InteractiveGraphProps {
  data?: GraphData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveGraph({ data }: InteractiveGraphProps = {}) {
  const svgRef        = useRef<SVGSVGElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const simRef        = useRef<d3.Simulation<SimNode, undefined> | null>(null);
  const zoomRef       = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const simNodeMapRef = useRef<Map<string, SimNode>>(new Map());

  const nodes: RawNode[] = useMemo(() => {
    if (!data) return STATIC_NODES;
    return data.nodes.map(n => ({ id: n.id, type: n.type.toLowerCase() as NodeType, label: n.label, description: n.description }));
  }, [data]);

  const edges: RawEdge[] = useMemo(() => {
    if (!data) return STATIC_EDGES;
    return data.edges.map(e => ({ source: e.source, target: e.target, relation: e.relationship }));
  }, [data]);

  // UI state
  const [focusedId,       setFocusedId]       = useState<string | null>(null);
  const [depth,           setDepth]           = useState(1);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [visibleTypes,    setVisibleTypes]    = useState<Set<string>>(() => new Set(Object.keys(NODE_CFG)));
  const [contextMenu,     setContextMenu]     = useState<{ x: number; y: number; nodeId: string } | null>(null);
  const [expandedLinkage, setExpandedLinkage] = useState<string | null>(null);
  const [activeQuestion,  setActiveQuestion]  = useState<PredefinedQuestion | null>(null);
  const [isFullscreen,    setIsFullscreen]    = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const questions: PredefinedQuestion[] = data?.questions ?? (!data ? (graphData as { nodes: unknown[]; edges: unknown[]; questions: PredefinedQuestion[] }).questions ?? [] : []);

  const { theme } = useTheme();
  const T = theme === "dark" ? DARK_T : LIGHT_T;

  // ── Derived data ───────────────────────────────────────────────────────────

  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

  const ALL_TYPES = useMemo(() => [...new Set(nodes.map(n => n.type))], [nodes]);

  // Sync visible types to only types present in the current graph
  useEffect(() => {
    setVisibleTypes(new Set(ALL_TYPES));
  }, [ALL_TYPES]);

  const visibleNodes = nodes.filter(n => visibleTypes.has(n.type));
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));

  const highlightedIds = useMemo(() => {
    if (focusedId) return getNeighborIds(focusedId, visibleEdges, depth);
    if (activeQuestion) return new Set(activeQuestion.highlightNodes);
    return null;
  }, [focusedId, visibleEdges, depth, activeQuestion]);

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

    // Arrow marker for every unique relationship in this dataset
    const allRelTypes = new Set(edges.map(e => e.relation));
    allRelTypes.forEach(rel => {
      defs.append("marker")
        .attr("id", `arr-${rel}`)
        .attr("viewBox", "0 -4 8 8")
        .attr("refX", 8).attr("refY", 0)
        .attr("markerWidth", 5).attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4").attr("fill", getRelColor(rel)).attr("fill-opacity", 0.75);
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
    simNodeMapRef.current = simNodeMap;

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
      .attr("stroke", d => getRelColor(d.relation))
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
      .attr("font-family", "'Inter', sans-serif")
      .style("pointer-events", "none")
      .text(d => d.label.length > 16 ? d.label.slice(0, 15) + "…" : d.label);

    nodeSel.append("title").text(d => `${d.type.toUpperCase()}: ${d.label}`);

    // Click
    nodeSel.on("click.focus", function(ev, d) {
      ev.stopPropagation();
      setContextMenu(null);
      setActiveQuestion(null);
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
    const doFit = (animated = true) => {
      const cw = el.clientWidth  || W;
      const ch = el.clientHeight || H;
      const gbbox = (g.node() as SVGGElement | null)?.getBBox();
      if (!gbbox || gbbox.width === 0) return;
      const pad = 40;
      const scale = Math.min((cw - pad*2) / gbbox.width, (ch - pad*2) / gbbox.height, 1.5) * 0.85;
      const tx = cw/2 - (gbbox.x + gbbox.width/2)  * scale;
      const ty = ch/2 - (gbbox.y + gbbox.height/2) * scale;
      const t = d3.zoomIdentity.translate(tx, ty).scale(scale);
      if (animated) svg.transition().duration(800).call(zoom.transform, t);
      else svg.call(zoom.transform, t);
    };

    const fitTimer = setTimeout(() => doFit(true), 2200);

    // Re-fit whenever the container is resized (e.g. orientation change, panel open)
    const ro = new ResizeObserver(() => doFit(false));
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      clearTimeout(fitTimer);
      ro.disconnect();
      sim.stop();
    };
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

  // ── Zoom-to-node on focus ─────────────────────────────────────────────────

  useEffect(() => {
    if (!focusedId || !svgRef.current || !zoomRef.current) return;
    const simNode = simNodeMapRef.current.get(focusedId);
    if (!simNode || simNode.x == null || simNode.y == null) return;
    const el = svgRef.current;
    const W = el.clientWidth || 900;
    const H = el.clientHeight || 580;
    const scale = 1.8;
    const tx = W / 2 - simNode.x * scale;
    const ty = H / 2 - simNode.y * scale;
    const t = d3.zoomIdentity.translate(tx, ty).scale(scale);
    d3.select(el).transition().duration(600).call(zoomRef.current.transform, t);
  }, [focusedId]);

  // ── Controls ───────────────────────────────────────────────────────────────

  const resetView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition().duration(600)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  }, []);

  const zoomIn = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.4);
  }, []);

  const zoomOut = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1 / 1.4);
  }, []);

  const toggleType = (type: string) => {
    setVisibleTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  const handleQuestionClick = (q: PredefinedQuestion) => {
    if (activeQuestion?.id === q.id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(q);
      setFocusedId(null);
    }
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
    <div
      style={{ background: T.bg, fontFamily: "'Inter', sans-serif" }}
      className={`border border-slate-200 dark:border-slate-800 ${isFullscreen ? "fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col m-0" : "rounded-2xl overflow-hidden flex flex-col w-full"}`}
    >

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div style={{ background: T.chrome, borderBottom: `1px solid ${T.border}` }} className="px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-2">
        {/* Row 1: Search (hidden on lg, shown inline) */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: T.textMut }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search nodes…"
            style={{ background: T.inputBg, border: `1px solid ${T.borderAlt}`, color: T.textPri, fontFamily: "'Inter', sans-serif", outline: "none" }}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Row 2: Depth + Reset + Zoom + Clear focus */}
        <div className="flex items-center gap-2 flex-wrap lg:mx-auto">
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

          <div className="flex items-center" style={{ border: `1px solid ${T.borderAlt}`, borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={zoomOut}
              style={{ background: T.chipBg, color: T.textSec, borderRight: `1px solid ${T.borderAlt}` }}
              className="flex items-center justify-center w-7 h-7 text-xs hover:border-slate-400 transition-colors"
              aria-label="Zoom out"
            >
              <Minus className="h-3 w-3" />
            </button>
            <button
              onClick={zoomIn}
              style={{ background: T.chipBg, color: T.textSec }}
              className="flex items-center justify-center w-7 h-7 text-xs hover:border-slate-400 transition-colors"
              aria-label="Zoom in"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

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

        <button
          onClick={() => setIsFullscreen(prev => !prev)}
          style={{ background: T.chipBg, border: `1px solid ${T.borderAlt}`, color: T.textSec }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:border-slate-400 transition-colors shrink-0 self-start lg:self-auto"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Expand"}</span>
        </button>
      </div>

      {/* ── Main layout ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:h-[580px]">

        {/* ── Left sidebar / top strip: Layer toggles + Legend ─────────────── */}
        {/* Mobile: two stacked rows (layers scroll row + legend scroll row); Desktop: vertical sidebar */}
        <div
          style={{ background: T.panel }}
          className="border-b border-slate-200 dark:border-slate-800 md:border-b-0 md:border-r md:w-[148px] md:flex-shrink-0 flex flex-col md:py-3 md:px-3 md:gap-2 md:overflow-y-auto"
        >
          {/* Desktop heading */}
          <p style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="hidden md:flex text-xs uppercase tracking-widest mb-1 items-center gap-1.5">
            <Layers className="h-3 w-3" /> Layers
          </p>

          {/* Layer toggle buttons - grouped */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto px-3 py-2 md:p-0 md:overflow-x-visible">
            {(() => {
              const INTELLIGENCE_TYPES = new Set(["process", "skill", "people", "department"]);
              const entityTypes = ALL_TYPES.filter(t => !INTELLIGENCE_TYPES.has(t));
              const intelTypes  = ALL_TYPES.filter(t => INTELLIGENCE_TYPES.has(t));
              const renderBtn = (type: string) => {
                const cfg = getNodeCfg(type);
                const active = visibleTypes.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 md:w-full rounded px-2 py-1.5 transition-colors"
                    style={{ background: active ? `${cfg.color}18` : "transparent", border: `1px solid ${active ? cfg.color + "60" : T.border}` }}
                  >
                    <span className="text-sm">{cfg.emoji}</span>
                    <span className="text-xs" style={{ color: active ? cfg.color : T.textMut, fontFamily: "'Inter', sans-serif" }}>
                      {cfg.label}
                    </span>
                  </button>
                );
              };
              return (
                <>
                  {entityTypes.length > 0 && (
                    <>
                      <p style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="hidden md:block text-[9px] uppercase tracking-widest mt-1">Entities</p>
                      {entityTypes.map(renderBtn)}
                    </>
                  )}
                  {intelTypes.length > 0 && (
                    <>
                      <p style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="hidden md:block text-[9px] uppercase tracking-widest mt-2">Intelligence</p>
                      {intelTypes.map(renderBtn)}
                    </>
                  )}
                </>
              );
            })()}
          </div>

          {/* Legend - desktop: vertical block; mobile: separate scrollable row */}
          <div style={{ borderTop: `1px solid ${T.border}` }} className="hidden md:block mt-2 pt-2">
            <p style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="text-xs uppercase tracking-widest mb-2">Legend</p>
            {[...new Set(edges.map(e => e.relation))].map(rel => (
              <div key={rel} className="flex items-center gap-1.5 mb-1">
                <div className="h-0.5 w-4 rounded" style={{ background: getRelColor(rel) }} />
                <span style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="text-[9px]">{rel}</span>
              </div>
            ))}
          </div>
          <div
            style={{ borderTop: `1px solid ${T.border}` }}
            className="md:hidden flex flex-row gap-x-4 gap-y-1 overflow-x-auto px-3 py-1.5 items-center"
          >
            {[...new Set(edges.map(e => e.relation))].map(rel => (
              <div key={rel} className="flex items-center gap-1 shrink-0">
                <div className="h-0.5 w-3 rounded" style={{ background: getRelColor(rel) }} />
                <span style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="text-[9px] whitespace-nowrap">{rel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Graph canvas ─────────────────────────────────────────────────── */}
        <div ref={containerRef} className="flex-1 relative h-[500px] md:h-auto min-h-0" onClick={() => setContextMenu(null)}>
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{ background: T.bg }}
          />

          {/* Node count overlay */}
          <div className="absolute bottom-3 left-3 flex gap-3">
            <span style={{ background: T.chrome + "cc", border: `1px solid ${T.border}`, color: T.textMut, fontFamily: "'Inter', sans-serif" }}
              className="text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
              {visibleNodes.length} nodes · {visibleEdges.length} edges
            </span>
            {focusedId && highlightedIds && (
              <span style={{ background: "#1e3a5faa", border: "1px solid #3b82f680", color: "#93c5fd", fontFamily: "'Inter', sans-serif" }}
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
                  style={{ color: item.color, fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right panel / bottom panel: node details ─────────────────────── */}
        {focusedNode && focusedConns && (
          <div
            style={{ background: T.panel }}
            className="border-t border-slate-200 dark:border-slate-800 md:border-t-0 md:border-l w-full md:w-[260px] md:flex-shrink-0 overflow-y-auto max-h-[260px] md:max-h-none py-4 px-4 flex flex-col gap-4"
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
                    style={{ background: getNodeCfg(focusedNode.type).color + "25", color: getNodeCfg(focusedNode.type).color, fontFamily: "'Inter', sans-serif" }}
                  >
                    {getNodeCfg(focusedNode.type).label}
                  </span>
                </div>
              </div>
              {focusedNode.description && (
                <p className="text-xs mt-1" style={{ color: T.textSec }}>{focusedNode.description}</p>
              )}
              <div style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="text-[10px] mt-1">
                ID: {focusedNode.id}
              </div>
            </div>

            {/* Outgoing connections */}
            {Object.entries(focusedConns.outgoing).map(([rel, ids]) => (
              <div key={`out-${rel}`}>
                <p className="text-xs mb-1.5" style={{ color: getRelColor(rel), fontFamily: "'Inter', sans-serif" }}>
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
                          fontFamily: "'Inter', sans-serif",
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
                <p className="text-xs mb-1.5" style={{ color: getRelColor(rel), fontFamily: "'Inter', sans-serif" }}>
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
                          fontFamily: "'Inter', sans-serif",
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
                <p className="text-xs flex items-center gap-1.5" style={{ color: T.textMut, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>
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
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: catColor + "22", color: catColor, fontFamily: "'Inter', sans-serif" }}>{lnk.metric_category}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: T.chipBg, color: T.textSec, fontFamily: "'Inter', sans-serif" }}>{lnk.source_system}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: T.chipBg, color: "#16a34a", fontFamily: "'Inter', sans-serif" }}>{lnk.refresh_frequency}</span>
                            </div>
                            <p className="text-[9px] break-all" style={{ color: "#2563eb", fontFamily: "'Inter', sans-serif" }}>{lnk.object_name}</p>
                            <p className="text-[9px]" style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }}>join: {lnk.join_key}</p>
                            <div className="flex flex-wrap gap-1">
                              {lnk.example_fields.map(f => (
                                <span key={f} className="text-[8px] px-1 py-0.5 rounded" style={{ background: T.fieldBg, border: `1px solid ${T.fieldBorder}`, color: T.textMut, fontFamily: "'Inter', sans-serif" }}>{f}</span>
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

      {/* ── Questions panel ──────────────────────────────────────────────────── */}
      {questions.length > 0 && (
        <div style={{ borderTop: `1px solid ${T.border}`, background: T.panel }} className="px-4 py-4">
          <p style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }} className="text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" /> Ask the Context Graph
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {questions.map(q => (
              <button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                className="text-left px-3 py-2.5 rounded-xl transition-colors"
                style={{
                  border: activeQuestion?.id === q.id ? "1px solid #3b82f6" : `1px solid ${T.borderAlt}`,
                  background: activeQuestion?.id === q.id ? "#3b82f615" : T.chrome,
                }}
              >
                <div className="flex items-start gap-2">
                  <HelpCircle
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: activeQuestion?.id === q.id ? "#3b82f6" : T.textMut }}
                  />
                  <span className="text-xs leading-snug" style={{ color: T.textPri }}>{q.question}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Answer + reasoning panel ─────────────────────────────────────────── */}
      {activeQuestion && (
        <div style={{ borderTop: `1px solid ${T.border}`, background: T.chrome }} className="px-5 py-5">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-sm font-semibold pr-4" style={{ color: T.textPri }}>{activeQuestion.question}</h4>
            <button onClick={() => setActiveQuestion(null)} style={{ color: T.textMut }} className="shrink-0 hover:opacity-70 transition-opacity">
              <X className="h-4 w-4" />
            </button>
          </div>

          <ol className="space-y-2 mb-4">
            {activeQuestion.reasoningSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-xs">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5" style={{ background: "#3b82f6" }}>
                  {i + 1}
                </span>
                <span style={{ color: T.textSec }}>{step}</span>
              </li>
            ))}
          </ol>

          <div className="rounded-lg p-3.5" style={{ borderLeft: "3px solid #3b82f6", background: T.panel }}>
            <p className="text-xs leading-relaxed" style={{ color: T.textPri }}>{activeQuestion.answer}</p>
          </div>

          <p className="mt-2.5 text-[10px]" style={{ color: T.textMut, fontFamily: "'Inter', sans-serif" }}>
            Generated by AI reasoning over the Context Graph
          </p>
        </div>
      )}
    </div>
  );
}
