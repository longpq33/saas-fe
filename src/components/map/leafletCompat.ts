import { MapContainer, Marker, Polyline, Popup, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import L from 'leaflet';

type AnyProps = Record<string, unknown>;

// Work around type mismatches in this repo's current react-leaflet/leaflet typings setup
// (We keep runtime behavior intact; this is only to unblock tsc.)
export const LeafletMapContainer = MapContainer as unknown as React.ComponentType<AnyProps>;
export const LeafletTileLayer = TileLayer as unknown as React.ComponentType<AnyProps>;
export const LeafletMarker = Marker as unknown as React.ComponentType<AnyProps>;
export const LeafletPopup = Popup as unknown as React.ComponentType<AnyProps>;
export const LeafletPolyline = Polyline as unknown as React.ComponentType<AnyProps>;
export const LeafletGeoJSON = GeoJSON as unknown as React.ComponentType<AnyProps>;
export const LeafletTooltip = Tooltip as unknown as React.ComponentType<AnyProps>;

export type BoundsTuple = [[number, number], [number, number]];

export function toLatLngBounds(bounds: BoundsTuple) {
  const Ctor = (L as unknown as { LatLngBounds: new (a: unknown, b: unknown) => unknown }).LatLngBounds;
  return new Ctor(bounds[0], bounds[1]);
}

type BusIconType = 'bus' | 'dc_bus';

const iconCache = new Map<BusIconType, unknown>();

export function getBusIcon(busType: BusIconType) {
  const cached = iconCache.get(busType);
  if (cached) return cached;

  const iconUrl =
    busType === 'dc_bus'
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';

  const IconCtor = (L as unknown as { Icon: new (opts: unknown) => unknown }).Icon;
  const icon = new IconCtor({
    iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  iconCache.set(busType, icon);
  return icon;
}

// Icon color mapping for different node types
export type MapNodeType =
  | 'bus'
  | 'dc_bus'
  | 'gen'
  | 'ext_grid'
  | 'load'
  | 'sgen'
  | 'storage'
  | 'transformer'
  | 'trafo3w'
  | 'motor'
  | 'shunt'
  | 'dc_source'
  | 'dc_load'
  | 'asymmetric_load'
  | 'asymmetric_sgen'
  | 'ward'
  | 'xward'
  | 'switch';

const NODE_ICON_COLORS: Record<MapNodeType, string> = {
  bus: '#034F3B',
  dc_bus: '#1E3A5F',
  gen: '#22c55e',
  ext_grid: '#eab308',
  load: '#f97316',
  sgen: '#60a5fa',
  storage: '#a855f7',
  transformer: '#6b7280',
  trafo3w: '#374151',
  motor: '#f87171',
  shunt: '#92400e',
  dc_source: '#ef4444',
  dc_load: '#fb7185',
  asymmetric_load: '#fb923c',
  asymmetric_sgen: '#4ade80',
  ward: '#ec4899',
  xward: '#be185d',
  switch: '#fbbf24',
} as const;

export function getNodeColor(nodeType: string): string {
  return NODE_ICON_COLORS[nodeType as MapNodeType] || '#6b7280';
}

const nodeIconCache = new Map<string, unknown>();

/**
 * Get icon for a node type
 * Creates a custom DivIcon with colored circle for each node type
 */
export function getNodeIcon(nodeType: string) {
  const cached = nodeIconCache.get(nodeType);
  if (cached) return cached;

  const color = NODE_ICON_COLORS[nodeType as MapNodeType] || '#6b7280'; // default gray

  const DivIconCtor = (L as unknown as { DivIcon: new (opts: unknown) => unknown }).DivIcon;
  const icon = new DivIconCtor({
    className: 'custom-node-icon',
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  nodeIconCache.set(nodeType, icon);
  return icon;
}

