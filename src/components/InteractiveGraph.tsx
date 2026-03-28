import { useRef, useState, useCallback, useEffect, lazy, Suspense } from "react";
import { HelpCircle, ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import graphData from "@/data/fmcg-context-graph.json";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

interface GraphNode {
  id: string;
  label: string;
  type: string;
  description?: string;
  x?: number;
  y?: number;
}

interface PredefinedQuestion {
  id: string;
  question: string;
  answer: string;
  highlightNodes: string[];
  highlightEdges: string[];
  reasoningSteps: string[];
}

const NODE_COLORS: Record<string, { light: string; dark: string }> = {
  Product: { light: "#b45309", dark: "#f59e0b" },
  Ingredient: { light: "#15803d", dark: "#4ade80" },
  Supplier: { light: "#c2410c", dark: "#fb923c" },
  Plant: { light: "#1d4ed8", dark: "#60a5fa" },
  Channel: { light: "#7c3aed", dark: "#a78bfa" },
  Store: { light: "#be185d", dark: "#f472b6" },
};

const NODE_TYPES = ["Product", "Ingredient", "Supplier", "Plant", "Channel", "Store"];

function getEdgeKey(source: string, target: string) {
  return `${source}->${target}`;
}

function getNodeId(node: string | GraphNode): string {
  return typeof node === "string" ? node : node.id;
}

export default function InteractiveGraph() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [activeQuestion, setActiveQuestion] = useState<PredefinedQuestion | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const questions = graphData.questions as PredefinedQuestion[];

  const highlightNodeSet = new Set(activeQuestion?.highlightNodes ?? []);
  const highlightEdgeSet = new Set(activeQuestion?.highlightEdges ?? []);

  // Track container width for responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stop simulation after layout stabilizes
  useEffect(() => {
    const timer = setTimeout(() => {
      graphRef.current?.d3ReheatSimulation();
      setTimeout(() => {
        graphRef.current?.pauseAnimation();
        graphRef.current?.resumeAnimation();
      }, 3000);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const graphHeight = containerWidth < 640 ? 300 : containerWidth < 768 ? 400 : 500;

  const nodeColor = useCallback(
    (node: GraphNode) => {
      const colors = NODE_COLORS[node.type];
      if (!colors) return isDark ? "#94a3b8" : "#64748b";
      return isDark ? colors.dark : colors.light;
    },
    [isDark]
  );

  const isNodeHighlighted = useCallback(
    (nodeId: string) => {
      if (!activeQuestion) return true;
      return highlightNodeSet.has(nodeId);
    },
    [activeQuestion, highlightNodeSet]
  );

  const isEdgeHighlighted = useCallback(
    (source: string, target: string) => {
      if (!activeQuestion) return true;
      return highlightEdgeSet.has(getEdgeKey(source, target));
    },
    [activeQuestion, highlightEdgeSet]
  );

  const getConnectedNodes = useCallback(
    (nodeId: string) => {
      const connections: { node: GraphNode; relationship: string; direction: string }[] = [];
      for (const edge of graphData.edges) {
        const sourceId = typeof edge.source === "string" ? edge.source : (edge.source as GraphNode).id;
        const targetId = typeof edge.target === "string" ? edge.target : (edge.target as GraphNode).id;
        if (sourceId === nodeId) {
          const targetNode = graphData.nodes.find((n) => n.id === targetId);
          if (targetNode) connections.push({ node: targetNode as GraphNode, relationship: edge.relationship, direction: "out" });
        }
        if (targetId === nodeId) {
          const sourceNode = graphData.nodes.find((n) => n.id === sourceId);
          if (sourceNode) connections.push({ node: sourceNode as GraphNode, relationship: edge.relationship, direction: "in" });
        }
      }
      return connections;
    },
    []
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setSelectedNode(node);
    },
    []
  );

  const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.4, 300);
  const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() / 1.4, 300);
  const handleReset = () => {
    graphRef.current?.zoomToFit(400, 40);
    setActiveQuestion(null);
    setSelectedNode(null);
  };

  const handleQuestionClick = (q: PredefinedQuestion) => {
    if (activeQuestion?.id === q.id) {
      setActiveQuestion(null);
      return;
    }
    setActiveQuestion(q);
    setSelectedNode(null);
  };

  return (
    <div className="space-y-6">
      {/* Graph container */}
      <div
        ref={containerRef}
        className="relative bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
      >
        {/* Legend overlay */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs space-y-1.5">
          {NODE_TYPES.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: isDark ? NODE_COLORS[type].dark : NODE_COLORS[type].light }}
              />
              <span className="text-slate-600 dark:text-slate-300">{type}</span>
            </div>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Reset view"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Selected node detail popover */}
        {selectedNode && (
          <div className="absolute bottom-3 right-3 z-10 w-72 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isDark ? `${NODE_COLORS[selectedNode.type]?.dark}20` : `${NODE_COLORS[selectedNode.type]?.light}15`,
                    color: isDark ? NODE_COLORS[selectedNode.type]?.dark : NODE_COLORS[selectedNode.type]?.light,
                  }}
                >
                  {selectedNode.type}
                </span>
                <h4 className="mt-1.5 font-bold text-slate-900 dark:text-white">
                  {selectedNode.label}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            </div>
            {selectedNode.description && (
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                {selectedNode.description}
              </p>
            )}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {getConnectedNodes(selectedNode.id).length} connected nodes
            </div>
          </div>
        )}

        {/* Force graph */}
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center text-slate-500 dark:text-slate-400"
              style={{ height: graphHeight }}
            >
              Loading graph...
            </div>
          }
        >
          <ForceGraph2D
            ref={graphRef}
            graphData={{
              nodes: graphData.nodes.map((n) => ({ ...n })),
              links: graphData.edges.map((e) => ({ ...e })),
            }}
            width={containerWidth}
            height={graphHeight}
            backgroundColor="rgba(0,0,0,0)"
            nodeRelSize={6}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodeVal={(node: any) => {
              if (node.type === "Product") return 3;
              if (node.type === "Plant") return 2.5;
              return 2;
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodeColor={(node: any) => {
              const base = nodeColor(node);
              if (!isNodeHighlighted(node.id)) return isDark ? "#334155" : "#e2e8f0";
              if (hoveredNode === node.id) return base;
              return base;
            }}
            nodeCanvasObjectMode={() => "after"}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              const fontSize = Math.max(10 / globalScale, 1.5);
              if (globalScale < 1.2 && !hoveredNode && !selectedNode && !activeQuestion) return;
              const showLabel =
                globalScale >= 1.2 ||
                hoveredNode === node.id ||
                selectedNode?.id === node.id ||
                (activeQuestion && highlightNodeSet.has(node.id));
              if (!showLabel) return;

              const label = node.label;
              ctx.font = `${fontSize}px Inter, sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              const highlighted = isNodeHighlighted(node.id);
              const alpha = highlighted ? 1 : 0.2;
              if (isDark) {
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
              } else {
                ctx.fillStyle = `rgba(15,23,42,${alpha})`;
              }
              ctx.fillText(label, node.x!, node.y! + 10 / globalScale);
            }}
            nodeLabel=""
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            linkColor={(link: any) => {
              const sourceId = getNodeId(link.source);
              const targetId = getNodeId(link.target);
              if (!isEdgeHighlighted(sourceId, targetId)) {
                return isDark ? "rgba(51,65,85,0.2)" : "rgba(226,232,240,0.5)";
              }
              return isDark ? "rgba(148,163,184,0.5)" : "rgba(100,116,139,0.35)";
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            linkWidth={(link: any) => {
              const sourceId = getNodeId(link.source);
              const targetId = getNodeId(link.target);
              return isEdgeHighlighted(sourceId, targetId) ? 1.5 : 0.5;
            }}
            linkDirectionalArrowLength={3}
            linkDirectionalArrowRelPos={0.85}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            linkDirectionalArrowColor={(link: any) => {
              const sourceId = getNodeId(link.source);
              const targetId = getNodeId(link.target);
              if (!isEdgeHighlighted(sourceId, targetId)) {
                return isDark ? "rgba(51,65,85,0.2)" : "rgba(226,232,240,0.5)";
              }
              return isDark ? "rgba(148,163,184,0.5)" : "rgba(100,116,139,0.35)";
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onNodeClick={(node: any) => handleNodeClick(node)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onNodeHover={(node: any) => setHoveredNode(node?.id ?? null)}
            onBackgroundClick={() => setSelectedNode(null)}
            cooldownTicks={100}
            onEngineStop={() => graphRef.current?.zoomToFit(400, 40)}
            d3AlphaDecay={0.04}
            d3VelocityDecay={0.3}
          />
        </Suspense>
      </div>

      {/* Questions panel */}
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
          Ask the Context Graph
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleQuestionClick(q)}
              className={`text-left p-4 rounded-xl border transition-colors ${
                activeQuestion?.id === q.id
                  ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              <div className="flex items-start gap-3">
                <HelpCircle
                  size={18}
                  className={`shrink-0 mt-0.5 ${
                    activeQuestion?.id === q.id
                      ? "text-blue-800 dark:text-blue-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                />
                <span className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">
                  {q.question}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reasoning + Answer panel */}
      {activeQuestion && (
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">
              {activeQuestion.question}
            </h4>
            <button
              onClick={() => setActiveQuestion(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 ml-4"
            >
              <X size={18} />
            </button>
          </div>

          {/* Reasoning steps */}
          <ol className="space-y-2 mb-6">
            {activeQuestion.reasoningSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-800 dark:bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-600 dark:text-slate-300">{step}</span>
              </li>
            ))}
          </ol>

          {/* Answer */}
          <div className="border-l-4 border-l-blue-800 dark:border-l-blue-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg p-4">
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              {activeQuestion.answer}
            </p>
          </div>

          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            This answer was generated by AI reasoning over the Context Graph
          </p>
        </div>
      )}
    </div>
  );
}
