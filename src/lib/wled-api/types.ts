import type { State } from './state';
import type { Cfg } from './cfg';

export interface Wled {
	state?: State;
	cfg?: Cfg;
}
