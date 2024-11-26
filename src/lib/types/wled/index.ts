import type { State } from './state';
import type { Info } from './info';
import type { Palettes } from './palettes';
// import type { Cfg } from './cfg';
import type { Nodes } from './nodes';
import type { Net } from './net';

export interface WLED {
	/**
	 * Current state of the WLED device
	 */
	state?: State;

	/**
	 * Device information and capabilities
	 */
	info?: Info;

	/**
	 * Available color palettes
	 */
	palettes?: Palettes;

	/**
	 * Device configuration
	 */
	// cfg?: Cfg;

	/**
	 * Information about discovered WLED nodes
	 */
	nodes?: Nodes;

	/**
	 * Network configuration and status
	 */
	net?: Net;
}

export type {
	State,
	Info,
	Palettes,
	// Cfg,
	Nodes,
	Net
};
