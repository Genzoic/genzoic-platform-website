"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  Database,
  Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataLinkage {
  id?: string;
  user_integration_id?: string;
  metric_category: string;
  description: string;
  source_system: string;
  object_type: string;
  object_name: string;
  join_key: string;
  refresh_frequency: string;
  example_fields: string[];
}

interface Integration {
  integration_id: string;
  integration_name: string;
  description?: string;
  icon_url?: string;
  provider?: string;
  user_accounts: {
    user_integration_id: string;
    display_name?: string;
    display_email?: string;
    label?: string;
  }[];
}

interface BrowseItem {
  name: string;
  type?: string;
  kind?: string;
}

interface DataSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: string;
  existingMapping?: DataLinkage;
  onSaved: (mapping: DataLinkage) => void;
}

const METRIC_CATEGORIES = [
  "cost",
  "volume",
  "inventory",
  "performance",
  "demand",
  "financial",
  "logistics",
  "risk",
  "quality",
  "compliance",
];

const REFRESH_FREQUENCIES = [
  "real-time",
  "hourly",
  "daily",
  "weekly",
  "monthly",
];

type WarehouseType = "bigquery" | "snowflake";
type Step = "warehouse" | "browse" | "details";

// ─── Component ────────────────────────────────────────────────────────────────

export default function DataSourceDialog({
  open,
  onOpenChange,
  entityType,
  existingMapping,
  onSaved,
}: DataSourceDialogProps) {
  const isEdit = !!existingMapping;

  // Step state
  const [step, setStep] = useState<Step>(isEdit ? "details" : "warehouse");

  // Warehouse selection
  const [warehouseType, setWarehouseType] = useState<WarehouseType>("bigquery");
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loadingIntegrations, setLoadingIntegrations] = useState(false);
  const [selectedUserIntegrationId, setSelectedUserIntegrationId] =
    useState("");

  // Unified browse state
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [browseError, setBrowseError] = useState("");
  const [databases, setDatabases] = useState<BrowseItem[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [schemas, setSchemas] = useState<BrowseItem[]>([]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [tables, setTables] = useState<BrowseItem[]>([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState<BrowseItem[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Form fields
  const [formEntityType, setFormEntityType] = useState(entityType);
  const [metricCategory, setMetricCategory] = useState(
    existingMapping?.metric_category || ""
  );
  const [description, setDescription] = useState(
    existingMapping?.description || ""
  );
  const [sourceSystem, setSourceSystem] = useState(
    existingMapping?.source_system || ""
  );
  const [objectType, setObjectType] = useState(
    existingMapping?.object_type || ""
  );
  const [objectName, setObjectName] = useState(
    existingMapping?.object_name || ""
  );
  const [joinKey, setJoinKey] = useState(existingMapping?.join_key || "");
  const [refreshFrequency, setRefreshFrequency] = useState(
    existingMapping?.refresh_frequency || "daily"
  );
  const [exampleFields, setExampleFields] = useState<string[]>(
    existingMapping?.example_fields || []
  );
  const [saving, setSaving] = useState(false);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      if (isEdit && existingMapping) {
        setStep("details");
        setFormEntityType(entityType);
        setMetricCategory(existingMapping.metric_category || "");
        setDescription(existingMapping.description || "");
        setSourceSystem(existingMapping.source_system || "");
        setObjectType(existingMapping.object_type || "");
        setObjectName(existingMapping.object_name || "");
        setJoinKey(existingMapping.join_key || "");
        setRefreshFrequency(existingMapping.refresh_frequency || "daily");
        setExampleFields(existingMapping.example_fields || []);
        setSelectedUserIntegrationId(existingMapping.user_integration_id || "");
      } else {
        setStep("warehouse");
        setWarehouseType("bigquery");
        setSelectedUserIntegrationId("");
        setDatabases([]);
        setSelectedDatabase("");
        setSchemas([]);
        setSelectedSchema("");
        setTables([]);
        setSelectedTable("");
        setColumns([]);
        setSelectedColumns([]);
        setFormEntityType(entityType);
        setMetricCategory("");
        setDescription("");
        setSourceSystem("");
        setObjectType("");
        setObjectName("");
        setJoinKey("");
        setRefreshFrequency("daily");
        setExampleFields([]);
      }
      setBrowseError("");
    }
  }, [open, isEdit, entityType, existingMapping]);

  // Fetch integrations when warehouse type changes
  useEffect(() => {
    if (!open || isEdit) return;
    (async () => {
      setLoadingIntegrations(true);
      try {
        const res = await fetch("/api/services/integration/user/for-skill-creation");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const keyword = warehouseType === "bigquery" ? "bigquery" : "snowflake";
        const filtered = (data.integrations || []).filter(
          (i: Integration) =>
            i.integration_name?.toLowerCase().includes(keyword) &&
            i.user_accounts?.length > 0
        );
        setIntegrations(filtered);
        setSelectedUserIntegrationId("");
      } catch {
        setIntegrations([]);
      } finally {
        setLoadingIntegrations(false);
      }
    })();
  }, [open, warehouseType, isEdit]);

  // ─── Unified warehouse browse ─────────────────────────────────────────────

  const browseWarehouse = useCallback(
    async (params: {
      database?: string;
      schema_name?: string;
      table?: string;
    }) => {
      if (!selectedUserIntegrationId) return null;
      setLoadingBrowse(true);
      setBrowseError("");
      try {
        const res = await fetch(
          `/api/services/integration/user/${selectedUserIntegrationId}/execute-metadata`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            (err as { detail?: string }).detail || "Metadata query failed"
          );
        }
        const json = await res.json();
        return json as {
          success: boolean;
          phase: string;
          items: BrowseItem[];
          count: number;
        };
      } catch (e) {
        setBrowseError((e as Error).message);
        return null;
      } finally {
        setLoadingBrowse(false);
      }
    },
    [selectedUserIntegrationId]
  );

  // ─── Phase fetch handlers ─────────────────────────────────────────────────

  const fetchDatabases = useCallback(async () => {
    const result = await browseWarehouse({});
    if (result?.items) {
      setDatabases(result.items);
    }
  }, [browseWarehouse]);

  const fetchSchemaOrTables = useCallback(
    async (database: string) => {
      const result = await browseWarehouse({ database });
      if (!result?.items) return;

      if (result.phase === "schemas") {
        // Snowflake: database → schemas
        setSchemas(result.items);
      } else if (result.phase === "tables") {
        // BigQuery: database → tables directly
        setTables(result.items);
      }
    },
    [browseWarehouse]
  );

  const fetchTables = useCallback(
    async (database: string, schemaName: string) => {
      // Snowflake: database + schema → tables
      const result = await browseWarehouse({
        database,
        schema_name: schemaName,
      });
      if (result?.items) {
        setTables(result.items);
      }
    },
    [browseWarehouse]
  );

  const fetchColumns = useCallback(
    async (database: string, schemaName: string | undefined, table: string) => {
      const result = await browseWarehouse({
        database,
        ...(schemaName ? { schema_name: schemaName } : {}),
        table,
      });
      if (result?.items) {
        setColumns(result.items);
      }
    },
    [browseWarehouse]
  );

  // ─── Step transitions ──────────────────────────────────────────────────────

  const handleStartBrowse = useCallback(() => {
    if (!selectedUserIntegrationId) return;
    setStep("browse");
    setDatabases([]);
    setSelectedDatabase("");
    setSchemas([]);
    setSelectedSchema("");
    setTables([]);
    setSelectedTable("");
    setColumns([]);
    setSelectedColumns([]);
    fetchDatabases();
  }, [selectedUserIntegrationId, fetchDatabases]);

  const handleProceedToDetails = useCallback(() => {
    let objName = objectName;
    let objType = "table";
    const system = warehouseType === "bigquery" ? "BigQuery" : "Snowflake";

    if (warehouseType === "bigquery" && selectedDatabase && selectedTable) {
      objName = `${selectedDatabase}.${selectedTable}`;
      const tableInfo = tables.find((t) => t.name === selectedTable);
      objType =
        tableInfo?.type?.toUpperCase() === "VIEW" ? "view" : "table";
    } else if (
      warehouseType === "snowflake" &&
      selectedDatabase &&
      selectedSchema &&
      selectedTable
    ) {
      objName = `${selectedDatabase}.${selectedSchema}.${selectedTable}`;
      const tableInfo = tables.find((t) => t.name === selectedTable);
      objType =
        tableInfo?.kind?.toUpperCase() === "VIEW" ? "view" : "table";
    }

    setSourceSystem(system);
    setObjectName(objName);
    setObjectType(objType);
    setExampleFields(selectedColumns);
    setStep("details");
  }, [
    warehouseType,
    selectedDatabase,
    selectedTable,
    selectedSchema,
    tables,
    selectedColumns,
    objectName,
  ]);

  // ─── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        entity_type: formEntityType.trim(),
        metric_category: metricCategory,
        description: description.trim(),
        source_system: sourceSystem.trim(),
        object_type: objectType.trim(),
        object_name: objectName.trim(),
        join_key: joinKey.trim(),
        refresh_frequency: refreshFrequency,
        example_fields: exampleFields,
        user_integration_id:
          selectedUserIntegrationId ||
          existingMapping?.user_integration_id ||
          null,
      };

      let res: Response;
      if (isEdit && existingMapping?.id) {
        res = await fetch(
          `/api/services/memory/graph/data-sources/${existingMapping.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
      } else {
        res = await fetch("/api/services/memory/graph/data-sources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { detail?: string }).detail || "Save failed"
        );
      }

      const saved = await res.json();
      onSaved(saved as DataLinkage);
      onOpenChange(false);
    } catch (e) {
      setBrowseError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const canSave =
    formEntityType.trim() &&
    metricCategory &&
    sourceSystem.trim() &&
    objectType.trim() &&
    objectName.trim() &&
    joinKey.trim();

  // Whether Snowflake needs an extra schema step
  const isSF = warehouseType === "snowflake";

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            {isEdit ? "Edit Data Source Mapping" : "Add Data Source Mapping"}
          </DialogTitle>
        </DialogHeader>

        {/* ── Step 1: Warehouse Selection ─────────────────────────────── */}
        {step === "warehouse" && (
          <div className="space-y-4 py-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Warehouse Type</Label>
              <RadioGroup
                value={warehouseType}
                onValueChange={(v) => setWarehouseType(v as WarehouseType)}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="bigquery" id="bq" />
                  <Label htmlFor="bq" className="cursor-pointer">
                    BigQuery
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="snowflake" id="sf" />
                  <Label htmlFor="sf" className="cursor-pointer">
                    Snowflake
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Integration</Label>
              {loadingIntegrations ? (
                <div className="flex items-center gap-2 py-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Loading integrations…
                  </span>
                </div>
              ) : integrations.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No configured{" "}
                  {warehouseType === "bigquery" ? "BigQuery" : "Snowflake"}{" "}
                  integrations found. Please configure one in Integrations
                  settings first.
                </p>
              ) : (
                <div className="space-y-2">
                  {integrations.map((intg) =>
                    intg.user_accounts.map((account) => (
                      <button
                        key={account.user_integration_id}
                        onClick={() => {
                          setSelectedUserIntegrationId(
                            account.user_integration_id
                          );
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedUserIntegrationId ===
                          account.user_integration_id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {account.display_name || intg.integration_name}
                        </div>
                        {account.display_email && (
                          <div className="text-xs text-muted-foreground">
                            {account.display_email}
                          </div>
                        )}
                        {account.label && (
                          <div className="text-xs text-muted-foreground">
                            {account.label}
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Step 2: Browse Warehouse ────────────────────────────────── */}
        {step === "browse" && (
          <div className="space-y-4 py-2">
            {browseError && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-md p-2">
                {browseError}
              </div>
            )}

            {/* Database / Dataset selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {isSF ? "Database" : "Dataset"}
              </Label>
              {loadingBrowse && databases.length === 0 ? (
                <div className="flex items-center gap-2 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Loading {isSF ? "databases" : "datasets"}…
                  </span>
                </div>
              ) : (
                <Select
                  value={selectedDatabase}
                  onValueChange={(v) => {
                    setSelectedDatabase(v);
                    setSchemas([]);
                    setSelectedSchema("");
                    setTables([]);
                    setSelectedTable("");
                    setColumns([]);
                    setSelectedColumns([]);
                    fetchSchemaOrTables(v);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select a ${isSF ? "database" : "dataset"}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {databases.map((db) => (
                      <SelectItem key={db.name} value={db.name}>
                        {db.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Schema selector (Snowflake only) */}
            {isSF && selectedDatabase && schemas.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Schema</Label>
                {loadingBrowse && tables.length === 0 && schemas.length > 0 ? (
                  <div className="flex items-center gap-2 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading…
                    </span>
                  </div>
                ) : (
                  <Select
                    value={selectedSchema}
                    onValueChange={(v) => {
                      setSelectedSchema(v);
                      setTables([]);
                      setSelectedTable("");
                      setColumns([]);
                      setSelectedColumns([]);
                      fetchTables(selectedDatabase, v);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a schema" />
                    </SelectTrigger>
                    <SelectContent>
                      {schemas.map((s) => (
                        <SelectItem key={s.name} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {/* Table selector */}
            {((isSF && selectedSchema) || (!isSF && selectedDatabase)) &&
              tables.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Table / View</Label>
                  {loadingBrowse &&
                  columns.length === 0 &&
                  tables.length > 0 ? (
                    <div className="flex items-center gap-2 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Loading…
                      </span>
                    </div>
                  ) : (
                    <Select
                      value={selectedTable}
                      onValueChange={(v) => {
                        setSelectedTable(v);
                        setColumns([]);
                        setSelectedColumns([]);
                        fetchColumns(
                          selectedDatabase,
                          isSF ? selectedSchema : undefined,
                          v
                        );
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a table" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables.map((t) => (
                          <SelectItem key={t.name} value={t.name}>
                            {t.name}{" "}
                            {(t.type || t.kind) && (
                              <span className="text-muted-foreground">
                                ({t.type || t.kind})
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

            {/* Column selector */}
            {columns.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Columns{" "}
                  <span className="font-normal text-muted-foreground">
                    (select relevant fields)
                  </span>
                </Label>
                {loadingBrowse ? (
                  <div className="flex items-center gap-2 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading columns…
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto p-2 rounded-md border">
                    {columns.map((col) => {
                      const isSelected = selectedColumns.includes(col.name);
                      return (
                        <button
                          key={col.name}
                          onClick={() => toggleColumn(col.name)}
                          className={`text-xs px-2 py-1 rounded-md border transition-colors flex items-center gap-1 ${
                            isSelected
                              ? "bg-primary/10 border-primary text-primary"
                              : "border-border hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                          {col.name}
                          {col.type && (
                            <span className="opacity-50 text-[10px]">
                              {col.type}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Mapping Details ─────────────────────────────────── */}
        {step === "details" && (
          <div className="space-y-3 py-2">
            {browseError && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-md p-2">
                {browseError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Entity Type</Label>
                <Input
                  value={formEntityType}
                  onChange={(e) => setFormEntityType(e.target.value)}
                  placeholder="e.g. Inventory Item"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Metric Category</Label>
                <Select
                  value={metricCategory}
                  onValueChange={setMetricCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {METRIC_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Current stock levels and warehouse allocation"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Source System</Label>
                <Input
                  value={sourceSystem}
                  onChange={(e) => setSourceSystem(e.target.value)}
                  placeholder="e.g. BigQuery"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Object Type</Label>
                <Select value={objectType} onValueChange={setObjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table">table</SelectItem>
                    <SelectItem value="view">view</SelectItem>
                    <SelectItem value="materialized_view">
                      materialized_view
                    </SelectItem>
                    <SelectItem value="api_endpoint">api_endpoint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Object Name</Label>
              <Input
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                placeholder="e.g. analytics.inventory.stock_levels"
                className="font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Join Key</Label>
                <Input
                  value={joinKey}
                  onChange={(e) => setJoinKey(e.target.value)}
                  placeholder="e.g. material_number"
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Refresh Frequency</Label>
                <Select
                  value={refreshFrequency}
                  onValueChange={setRefreshFrequency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    {REFRESH_FREQUENCIES.map((freq) => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {exampleFields.length > 0 && (
              <div className="space-y-1.5">
                <Label className="text-xs">Selected Fields</Label>
                <div className="flex flex-wrap gap-1">
                  {exampleFields.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-mono"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <DialogFooter className="flex justify-between gap-2">
          <div className="flex gap-2">
            {step === "browse" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("warehouse")}
              >
                <ChevronLeft className="h-3 w-3 mr-1" /> Back
              </Button>
            )}
            {step === "details" && !isEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("browse")}
              >
                <ChevronLeft className="h-3 w-3 mr-1" /> Back
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            {step === "warehouse" && (
              <Button
                size="sm"
                onClick={handleStartBrowse}
                disabled={!selectedUserIntegrationId}
              >
                Browse <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            )}

            {step === "browse" && (
              <Button
                size="sm"
                onClick={handleProceedToDetails}
                disabled={!selectedTable}
              >
                Next <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            )}

            {step === "details" && (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!canSave || saving}
              >
                {saving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                {isEdit ? "Update" : "Save"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
