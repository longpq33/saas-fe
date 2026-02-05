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

  // Dùng cùng style hình tròn với node icons, màu lấy từ NODE_ICON_COLORS / getNodeColor
  const color = getNodeColor(busType);

  const DivIconCtor = (L as unknown as { DivIcon: new (opts: unknown) => unknown }).DivIcon;
  const icon = new DivIconCtor({
    className: 'custom-bus-icon',
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
  gen: '#BB4D1A',
  ext_grid: '#BB4D1A',
  load: '#024A70',
  sgen: '#BB4D1A',
  storage: '#861043',
  transformer: '#14b8a6',
  trafo3w: '#14b8a6',
  motor: '#312C85',
  shunt: '#06b6d4',
  dc_source: '#8B4513',
  dc_load: '#1E4A6B',
  asymmetric_load: '#6B46C1',
  asymmetric_sgen: '#10B981',
  ward: '#6B7280',
  xward: '#4B5563',
  switch: '#024A70',
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

