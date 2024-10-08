import type { State } from './state';
import type { Cfg } from './cfg';
import type { Palettes } from './palettes';
import type { Info } from './info';
import type { Nodes } from './nodes';
import type { Net } from './net';

export interface Wled {
	palettes?: Palettes;
	state?: State;
	info?: Info;
	cfg?: Cfg;
	nodes?: Nodes;
	net?: Net;
}
