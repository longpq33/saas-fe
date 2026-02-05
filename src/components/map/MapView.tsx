import { useMemo, useState, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import type { Feature } from 'geojson';
import type { FeatureCollection } from 'geojson';
import vnGeoData from './vn_geo.json';
import styled from 'styled-components';

import {
  LeafletMapContainer,
  LeafletGeoJSON,
  LeafletMarker,
  LeafletPolyline,
  LeafletPopup,
  LeafletTooltip,
  getBusIcon,
  getNodeIcon,
  getNodeColor,
  toLatLngBounds,
  type BoundsTuple,
} from './leafletCompat';
import {
  getBusesWithGeodata,
  getLinesWithGeodata,
  getNodesWithGeodata,
  getNodeToBusConnections,
  calculateMapBounds,
  getLineCoordinates,
  getVietnamBounds,
} from '../../utils/mapUtils';
import 'leaflet/dist/leaflet.css';
import type { ViewMapControlProps } from './ViewMapControl';
import type { SimulateResponse } from '../../api/simulate';

type Row = Record<string, unknown>;

function asNumber(v: unknown): number | undefined {
  if (v === null || v === undefined) return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function asString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v);
  return s.length ? s : undefined;
}

function buildOverloadedLineNameSet(response: SimulateResponse | undefined, thresholdPercent = 100): Set<string> {
  const overloaded = new Set<string>();
  const network = response?.network;
  if (!network) return overloaded;

  const lineTable = ((network.tables?.line ?? []) as Row[]) || [];
  const resLine = ((network.results?.res_line ?? []) as Row[]) || [];

  const nameByIndex = new Map<string, string>();
  for (const r of lineTable) {
    const idx = asString((r as any)?.index ?? (r as any)?.id);
    const name = asString((r as any)?.name);
    if (idx && name) {
      nameByIndex.set(idx, name);
    }
  }

  for (const r of resLine) {
    const loading = asNumber((r as any)?.loading_percent);
    if (loading === undefined || loading < thresholdPercent) continue;

    const idx = asString((r as any)?.index ?? (r as any)?.id);
    let name = asString((r as any)?.name);
    if (!name && idx) {
      const fromTable = nameByIndex.get(idx);
      if (fromTable) name = fromTable;
    }
    if (name) {
      overloaded.add(name);
    }
  }

  return overloaded;
}

function buildLineLoadingByName(response: SimulateResponse | undefined): Map<string, number> {
  const loadingByName = new Map<string, number>();
  const network = response?.network;
  if (!network) return loadingByName;

  const lineTable = ((network.tables?.line ?? []) as Row[]) || [];
  const resLine = ((network.results?.res_line ?? []) as Row[]) || [];

  const nameByIndex = new Map<string, string>();
  for (const r of lineTable) {
    const idx = asString((r as any)?.index ?? (r as any)?.id);
    const name = asString((r as any)?.name);
    if (idx && name) {
      nameByIndex.set(idx, name);
    }
  }

  for (const r of resLine) {
    const loading = asNumber((r as any)?.loading_percent);
    if (loading === undefined) continue;

    const idx = asString((r as any)?.index ?? (r as any)?.id);
    let name = asString((r as any)?.name);
    if (!name && idx) {
      const fromTable = nameByIndex.get(idx);
      if (fromTable) name = fromTable;
    }
    if (name) {
      loadingByName.set(name, loading);
    }
  }

  return loadingByName;
}

export const MAP_CONFIG = {
  DEFAULT_CENTER: [16.0, 106.0] as [number, number],
  DEFAULT_ZOOM: 6,
  MIN_ZOOM: 5,
  MAX_ZOOM: 15,
  HEIGHT: '650px',
  BOUNDS_PADDING: [20, 20] as [number, number],
} as const;

const PROVINCE_STYLE = {
  fillColor: '#e3f2fd',
  fillOpacity: 0.3,
  color: '#1976d2',
  weight: 1.5,
  opacity: 0.8,
};

const HOVER_STYLE = {
  ...PROVINCE_STYLE,
  fillOpacity: 0.5,
  weight: 2,
  color: '#0D542B',
};

function getProvinceName(properties: Record<string, unknown>): string {
  if (properties.name) {
    return String(properties.name);
  }
  if (properties.NAME_1) {
    return String(properties.NAME_1);
  }
  return 'Tỉnh/Thành phố';
}

// Styled components for legend
const Legend = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 12px;

  .legend-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .legend-color {
    width: 20px;
    height: 3px;
    background: #3388ff;
  }

  .legend-marker {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
`;

// MapInitializer component to handle map initialization after modal opens
function MapInitializer() {
  const map = useMap();

  useEffect(() => {
    // Wait for map to be ready and DOM to be fully rendered
    const initializeMap = () => {
      map.whenReady(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          // Invalidate size to recalculate map dimensions
          // This is crucial when map is in a modal that was just opened
          map.invalidateSize();

          // Retry invalidateSize after a short delay to handle edge cases
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        });
      });
    };

    initializeMap();
  }, [map]);

  return null;
}

// FitBounds component to auto-fit map to bounds
function FitBounds({ bounds }: { bounds: BoundsTuple }) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => {
      // Wait a bit for map to be fully initialized
      requestAnimationFrame(() => {
        const latLngBounds = toLatLngBounds(bounds);
        map.fitBounds(latLngBounds, {
          padding: [20, 20],
          maxZoom: 12,
          animate: false,
        });
      });
    });
  }, [map, bounds]);

  return null;
}

export const MapView = ({ nodes, edges, response }: ViewMapControlProps) => {
  const [isMounted] = useState(() => typeof window !== 'undefined');
  const [isContainerReady, setIsContainerReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const geoData = useMemo(() => vnGeoData as FeatureCollection, []);

  // Check if container has size (important for modal)
  useEffect(() => {
    if (!isMounted || !containerRef.current) {
      return;
    }

    const checkContainerSize = () => {
      const container = containerRef.current;
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setIsContainerReady(true);
        } else {
          // Retry after a short delay
          setTimeout(checkContainerSize, 50);
        }
      }
    };

    // Initial check
    checkContainerSize();

    // Also check on window resize
    window.addEventListener('resize', checkContainerSize);
    return () => window.removeEventListener('resize', checkContainerSize);
  }, [isMounted]);

  // Extract buses and lines with geodata - memoized
  const buses = useMemo(() => getBusesWithGeodata(nodes), [nodes]);
  const lines = useMemo(() => getLinesWithGeodata(nodes, edges), [nodes, edges]);
  const nodesWithGeodata = useMemo(() => getNodesWithGeodata(nodes, buses), [nodes, buses]);
  const nodeToBusConnections = useMemo(() => getNodeToBusConnections(buses, nodesWithGeodata), [buses, nodesWithGeodata]);

  // Overloaded lines (by name) based on simulation results
  const overloadedLineNames = useMemo(
    () => buildOverloadedLineNameSet(response, 100),
    [response]
  );

  const lineLoadingByName = useMemo(
    () => buildLineLoadingByName(response),
    [response]
  );

  // Calculate bounds: use buses if available, otherwise use Vietnam bounds
  const bounds = useMemo(() => {
    if (buses.length > 0) {
      const calculatedBounds = calculateMapBounds(buses);
      return calculatedBounds;
    }
    return null;
  }, [buses]);

  // Default bounds for Vietnam (when no buses)
  const vietnamBounds = useMemo(() => getVietnamBounds() as BoundsTuple, []);

  // Polyline options for lines - memoized
  const polylineOptions = useMemo(
    () => ({
      color: '#3388ff',
      weight: 3,
      opacity: 0.7,
    }),
    []
  );

  // Connection style function - returns style based on node type
  const getConnectionStyle = useMemo(() => {
    return (nodeType: string) => {
      // Generator connections
      if (['gen', 'sgen', 'ext_grid', 'asymmetric_sgen'].includes(nodeType)) {
        const colors: Record<string, string> = {
          gen: '#22c55e',
          sgen: '#60a5fa',
          ext_grid: '#eab308',
          asymmetric_sgen: '#4ade80',
        };
        return {
          color: colors[nodeType] || '#22c55e',
          weight: 2,
          opacity: 0.6,
          dashArray: '5, 5',
        };
      }
      // Load connections
      if (['load', 'motor', 'asymmetric_load', 'dc_load'].includes(nodeType)) {
        const colors: Record<string, string> = {
          load: '#f97316',
          motor: '#f87171',
          asymmetric_load: '#fb923c',
          dc_load: '#fb7185',
        };
        return {
          color: colors[nodeType] || '#f97316',
          weight: 2,
          opacity: 0.6,
          dashArray: '5, 5',
        };
      }
      // Storage connections
      if (nodeType === 'storage') {
        return {
          color: '#a855f7',
          weight: 2,
          opacity: 0.6,
          dashArray: '5, 5',
        };
      }
      // Transformer connections
      if (['transformer', 'trafo3w'].includes(nodeType)) {
        const colors: Record<string, string> = {
          transformer: '#6b7280',
          trafo3w: '#374151',
        };
        return {
          color: colors[nodeType] || '#6b7280',
          weight: 2,
          opacity: 0.7,
          dashArray: undefined, // solid line
        };
      }
      // Shunt connections
      if (nodeType === 'shunt') {
        return {
          color: '#92400e',
          weight: 1.5,
          opacity: 0.5,
          dashArray: '5, 5',
        };
      }
      // Switch connections
      if (nodeType === 'switch') {
        return {
          color: '#fbbf24',
          weight: 2,
          opacity: 0.6,
          dashArray: '5, 5',
        };
      }
      // Other connections (ward, xward, dc_source)
      const colors: Record<string, string> = {
        ward: '#ec4899',
        xward: '#be185d',
        dc_source: '#ef4444',
      };
      return {
        color: colors[nodeType] || '#6b7280',
        weight: 2,
        opacity: 0.6,
        dashArray: '5, 5',
      };
    };
  }, []);

  const getStyle = useMemo(() => {
    return () => PROVINCE_STYLE;
  }, []);

  const onEachFeature = useMemo(() => {
    return (feature: Feature, layer: unknown) => {
      const leafletLayer = layer as {
        bindTooltip?: (content: string, options?: unknown) => void;
        setStyle?: (style: unknown) => void;
        bringToFront?: () => void;
        on?: (events: {
          mouseover: (e: { target: typeof leafletLayer }) => void;
          mouseout: (e: { target: typeof leafletLayer }) => void;
        }) => void;
      };

      const provinceName = getProvinceName(feature.properties || {});

      if (leafletLayer.bindTooltip) {
        leafletLayer.bindTooltip(provinceName, {
          permanent: false,
          direction: 'center',
          className: 'vietnam-geo-tooltip',
        });
      }

      if (leafletLayer.on) {
        leafletLayer.on({
          mouseover: (e: { target: typeof leafletLayer }) => {
            const targetLayer = e.target;
            if (targetLayer.setStyle) {
              targetLayer.setStyle(HOVER_STYLE);
            }
          },
          mouseout: (e: { target: typeof leafletLayer }) => {
            const targetLayer = e.target;
            if (targetLayer.setStyle) {
              targetLayer.setStyle(PROVINCE_STYLE);
            }
          },
        });
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p>Đang tải bản đồ...</p>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p>Đang tải dữ liệu bản đồ...</p>
      </div>
    );
  }

  // Wait for container to have size before rendering map
  if (!isContainerReady) {
    return (
      <div
        ref={containerRef}
        style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <p>Đang khởi tạo bản đồ...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%', position: 'relative' }}>
      <LeafletMapContainer
        className="map-container"
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        minZoom={MAP_CONFIG.MIN_ZOOM}
        maxZoom={MAP_CONFIG.MAX_ZOOM}
        style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}
        scrollWheelZoom={true}
        preferCanvas={true}
        attributionControl={false}
      >
        {/* Initialize map after modal opens - handles invalidateSize */}
        <MapInitializer />

        {/* Vietnam GeoJSON boundaries */}
        <LeafletGeoJSON
          data={geoData}
          style={getStyle}
          onEachFeature={onEachFeature}
          interactive={true}
        />

        {/* Auto-fit bounds to buses if available, otherwise use Vietnam bounds */}
        <FitBounds bounds={bounds ?? vietnamBounds} />

        {/* Render buses as markers */}
        {buses.map((bus) => {
          const icon = getBusIcon(bus.type);
          const busContent = (
            <div>
              <strong>{bus.name}</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#666' }}>ID: {bus.id}</span>
              <br />
              <span style={{ fontSize: '12px', color: '#666' }}>
                Tọa độ: {bus.lat.toFixed(6)}, {bus.long.toFixed(6)}
              </span>
              {bus.data.vn_kv && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Điện áp: {bus.data.vn_kv} kV</span>
                </>
              )}
            </div>
          );
          return (
            <LeafletMarker key={bus.id} position={[bus.lat, bus.long] as [number, number]} icon={icon}>
              <LeafletTooltip direction="top" offset={[0, -10]}>
                {busContent}
              </LeafletTooltip>
              <LeafletPopup>{busContent}</LeafletPopup>
            </LeafletMarker>
          );
        })}

        {/* Render other nodes as markers */}
        {nodesWithGeodata.map((node) => {
          const icon = getNodeIcon(node.type);
          const busName = node.bus?.name;
          const nodeContent = (
            <div>
              <strong>{node.name}</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#666' }}>Type: {node.type}</span>
              <br />
              <span style={{ fontSize: '12px', color: '#666' }}>ID: {node.id}</span>
              {node.busId && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Bus ID: {node.busId}</span>
                </>
              )}
              {node.bus && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    Tọa độ: {node.lat.toFixed(6)}, {node.long.toFixed(6)}
                  </span>
                </>
              )}
              {/* Node-specific information */}
              {node.type === 'gen' && (node.data as { p_mw?: number; vm_pu?: number }).p_mw !== undefined && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    P: {(node.data as { p_mw: number }).p_mw} MW
                  </span>
                </>
              )}
              {node.type === 'load' && (node.data as { p_mw?: number; q_mvar?: number }).p_mw !== undefined && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    P: {(node.data as { p_mw: number }).p_mw} MW, Q: {(node.data as { q_mvar: number }).q_mvar} MVar
                  </span>
                </>
              )}
              {node.type === 'storage' && (node.data as { soc_percent?: number }).soc_percent !== undefined && (
                <>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    SOC: {(node.data as { soc_percent: number }).soc_percent}%
                  </span>
                </>
              )}
              {node.type === 'switch' && (
                <>
                  {node.bus && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>Kết nối đến: {node.bus.name}</span>
                    </>
                  )}
                  {(node.data as { closed?: boolean }).closed !== undefined && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Trạng thái: {(node.data as { closed: boolean }).closed ? 'CLOSED' : 'OPEN'}
                      </span>
                    </>
                  )}
                  {(node.data as { elementType?: string }).elementType && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Element Type: {(node.data as { elementType: string }).elementType}
                      </span>
                    </>
                  )}
                  {(node.data as { elementId?: string }).elementId && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Element ID: {(node.data as { elementId: string }).elementId}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          );
          return (
            <LeafletMarker key={node.id} position={[node.lat, node.long] as [number, number]} icon={icon}>
              <LeafletTooltip direction="top" offset={[0, -10]}>
                {nodeContent}
              </LeafletTooltip>
              <LeafletPopup>{nodeContent}</LeafletPopup>
            </LeafletMarker>
          );
        })}

        {/* Render lines as polylines */}
        {lines.map((line) => {
          const coordinates = getLineCoordinates(line);
          if (!coordinates || coordinates.length < 2) {
            return null;
          }

          const isOverloaded = overloadedLineNames.has(line.name);
          const loadingPercent = lineLoadingByName.get(line.name);
          const pathOptions = isOverloaded
            ? {
                ...polylineOptions,
                color: '#ef4444',
                weight: 4,
                opacity: 0.9,
              }
            : polylineOptions;

          return (
            <LeafletPolyline key={line.id} positions={coordinates} pathOptions={pathOptions}>
              <LeafletTooltip direction="center">
                <div style={{ fontSize: 12 }}>
                  <strong>{line.name}</strong>
                  {line.fromBus && line.toBus && (
                    <>
                      <br />
                      <span>
                        {line.fromBus.name} → {line.toBus.name}
                      </span>
                    </>
                  )}
                  {loadingPercent !== undefined && (
                    <>
                      <br />
                      <span>Loading: {loadingPercent.toFixed(1)}%</span>
                    </>
                  )}
                  {loadingPercent === undefined && (
                    <>
                      <br />
                      <span>Loading: N/A</span>
                    </>
                  )}
                  {isOverloaded && (
                    <>
                      <br />
                      <span>OVERLOADED</span>
                    </>
                  )}
                </div>
              </LeafletTooltip>
              <LeafletPopup>
                <div>
                  <strong>{line.name}</strong>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>ID: {line.id}</span>
                  {line.fromBus && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>Từ: {line.fromBus.name}</span>
                    </>
                  )}
                  {line.toBus && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: '#666' }}>Đến: {line.toBus.name}</span>
                    </>
                  )}
                  {response && (
                    <>
                      <br />
                      <span style={{ fontSize: '12px', color: isOverloaded ? '#b91c1c' : '#666' }}>
                        {isOverloaded ? 'Trạng thái: QUÁ TẢI (≥ 100%)' : 'Trạng thái: Bình thường'}
                      </span>
                    </>
                  )}
                </div>
              </LeafletPopup>
            </LeafletPolyline>
          );
        })}

        {/* Render node-to-bus connections */}
        {nodeToBusConnections.map((connection) => {
          const style = getConnectionStyle(connection.nodeType);
          const pathOptions = {
            color: style.color,
            weight: style.weight,
            opacity: style.opacity,
            dashArray: style.dashArray,
          };

          return (
            <LeafletPolyline
              key={connection.id}
              positions={[connection.fromPosition, connection.toPosition]}
              pathOptions={pathOptions}
            >
              <LeafletPopup>
                <div>
                  <strong>{connection.nodeName}</strong>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Type: {connection.nodeType}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Node ID: {connection.nodeId}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Kết nối đến: {connection.busName}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>Bus ID: {connection.busId}</span>
                </div>
              </LeafletPopup>
            </LeafletPolyline>
          );
        })}
      </LeafletMapContainer>

      {/* Legend */}
      <Legend>
        <div className="legend-title">Chú giải</div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#3388ff', height: 3 }}></div>
          <span>Đường dây (bình thường)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#ef4444', height: 3 }}></div>
          <span>Đường dây quá tải (≥ 100%)</span>
        </div>
        {/* Connections section */}
        {nodeToBusConnections.length > 0 && (
          <>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '11px' }}>Kết nối:</div>
            {['gen', 'load', 'storage', 'ext_grid', 'transformer', 'switch'].map((type) => {
              const connections = nodeToBusConnections.filter((c) => c.nodeType === type);
              if (connections.length === 0) return null;
              const style = getConnectionStyle(type);
              return (
                <div key={type} className="legend-item">
                  <div
                    className="legend-color"
                    style={{
                      background: style.color,
                      borderTop: style.dashArray ? `2px dashed ${style.color}` : `2px solid ${style.color}`,
                      height: '2px',
                    }}
                  ></div>
                  <span>
                    {type === 'gen' ? 'Generator' : type === 'load' ? 'Load' : type === 'storage' ? 'Storage' : type === 'ext_grid' ? 'Ext Grid' : type === 'transformer' ? 'Transformer' : 'Switch'} ({connections.length})
                  </span>
                </div>
              );
            })}
          </>
        )}
        <div className="legend-item">
          <div className="legend-marker" style={{ background: getNodeColor('bus'), borderRadius: '50%' }}></div>
          <span>Bus</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker" style={{ background: getNodeColor('dc_bus'), borderRadius: '50%' }}></div>
          <span>DC Bus</span>
        </div>
        {/* Node types grouped by category */}
        {nodesWithGeodata.filter((n) => ['gen', 'sgen', 'ext_grid', 'asymmetric_sgen'].includes(n.type)).length > 0 && (
          <>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '11px' }}>Generators:</div>
            {['gen', 'sgen', 'ext_grid', 'asymmetric_sgen'].map((type) => {
              const count = nodesWithGeodata.filter((n) => n.type === type).length;
              if (count === 0) return null;
              const color = getNodeColor(type);
              return (
                <div key={type} className="legend-item">
                  <div className="legend-marker" style={{ background: color, borderRadius: '50%' }}></div>
                  <span>{type} ({count})</span>
                </div>
              );
            })}
          </>
        )}
        {nodesWithGeodata.filter((n) => ['load', 'motor', 'asymmetric_load', 'dc_load'].includes(n.type)).length > 0 && (
          <>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '11px' }}>Loads:</div>
            {['load', 'motor', 'asymmetric_load', 'dc_load'].map((type) => {
              const count = nodesWithGeodata.filter((n) => n.type === type).length;
              if (count === 0) return null;
              const color = getNodeColor(type);
              return (
                <div key={type} className="legend-item">
                  <div className="legend-marker" style={{ background: color, borderRadius: '50%' }}></div>
                  <span>{type} ({count})</span>
                </div>
              );
            })}
          </>
        )}
        {nodesWithGeodata.filter((n) => ['storage'].includes(n.type)).length > 0 && (
          <div className="legend-item">
            <div className="legend-marker" style={{ background: getNodeColor('storage'), borderRadius: '50%' }}></div>
            <span>storage ({nodesWithGeodata.filter((n) => n.type === 'storage').length})</span>
          </div>
        )}
        {nodesWithGeodata.filter((n) => ['transformer', 'trafo3w'].includes(n.type)).length > 0 && (
          <>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '11px' }}>Transformers:</div>
            {['transformer', 'trafo3w'].map((type) => {
              const count = nodesWithGeodata.filter((n) => n.type === type).length;
              if (count === 0) return null;
              const color = getNodeColor(type);
              return (
                <div key={type} className="legend-item">
                  <div className="legend-marker" style={{ background: color, borderRadius: '50%' }}></div>
                  <span>{type} ({count})</span>
                </div>
              );
            })}
          </>
        )}
        {nodesWithGeodata.filter((n) => ['shunt', 'dc_source', 'ward', 'xward', 'switch'].includes(n.type)).length > 0 && (
          <>
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '11px' }}>Others:</div>
            {['shunt', 'dc_source', 'ward', 'xward', 'switch'].map((type) => {
              const count = nodesWithGeodata.filter((n) => n.type === type).length;
              if (count === 0) return null;
              const color = getNodeColor(type);
              return (
                <div key={type} className="legend-item">
                  <div className="legend-marker" style={{ background: color, borderRadius: '50%' }}></div>
                  <span>{type} ({count})</span>
                </div>
              );
            })}
          </>
        )}
        <div style={{ marginTop: '8px', color: '#999', fontSize: '11px' }}>
          {buses.length > 0 || nodesWithGeodata.length > 0
            ? `${buses.length} bus, ${nodesWithGeodata.length} nodes, ${lines.length} đường dây, ${nodeToBusConnections.length} kết nối`
            : 'Không có bus nào có tọa độ địa lý'}
        </div>
      </Legend>
    </div>
  );
};
