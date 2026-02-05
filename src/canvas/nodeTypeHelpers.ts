import type { Node } from 'reactflow';

/**
 * Node type constants for type checking
 */
export const BUS_TYPES = ['bus', 'dc_bus'] as const;
export const LINE_NODE_TYPES = ['line', 'dcline', 'impedance', 'hvdc_link'] as const;
export const DC_LINE_TYPES = ['dcline', 'impedance', 'hvdc_link'] as const;
export const BUS_BOUND_TYPES = [
  'load',
  'gen',
  'sgen',
  'ext_grid',
  'motor',
  'shunt',
  'storage',
  'dc_load',
  'dc_source',
  'asymmetric_load',
  'asymmetric_sgen',
  'ward',
  'xward',
] as const;

/**
 * Type checking functions
 */

/**
 * Check if a node is a bus (AC or DC)
 */
export const isBus = (node: Node): boolean => {
  return BUS_TYPES.includes(node.type as (typeof BUS_TYPES)[number]);
};

/**
 * Check if a node is a line node (AC line, DC line, impedance, or HVDC link)
 */
export const isLineNode = (node: Node): boolean => {
  return LINE_NODE_TYPES.includes(node.type as (typeof LINE_NODE_TYPES)[number]);
};

/**
 * Check if a node is a DC line node (DC line, impedance, or HVDC link)
 */
export const isDcLineNode = (node: Node): boolean => {
  return DC_LINE_TYPES.includes(node.type as (typeof DC_LINE_TYPES)[number]);
};

/**
 * Check if a node is bus-bound equipment (loads, generators, etc.)
 */
export const isBusBound = (node: Node): boolean => {
  return BUS_BOUND_TYPES.includes(node.type as (typeof BUS_BOUND_TYPES)[number]);
};

/**
 * Check if a node is a switch
 */
export const isSwitch = (node: Node): boolean => {
  return node.type === 'switch';
};

/**
 * Check if a node is an element (transformer or bus)
 */
export const isElement = (node: Node): boolean => {
  return node.type === 'transformer' || node.type === 'bus';
};

/**
 * Check if a node is a three-winding transformer
 */
export const isTrafo3W = (node: Node): boolean => {
  return node.type === 'trafo3w';
};

