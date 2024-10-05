import { WledJsonApiError } from './WledJsonApiError';
import { Leds } from './Leds';
import { Map } from './Map';
import { Wifi } from './Wifi';
import { Fs } from './Fs';

export class Info {
	/**
	 * Version name.
	 */
	ver?: string;
	/**
	 * Build ID (YYMMDDB, B = daily build index).
	 */
	vid?: number;
	/**
	 * Contains info about the LED setup.
	 */
	leds?: Leds;
	/**
	 * sync Toggle Receive
	 * UIs which only have a single button for sync should toggle send+receive if this is true, only send otherwise
	 */
	str?: boolean;
	/**
	 * Friendly name of the light. Intended for display in lists and titles.
	 *
	 * Name of module - default is WLED
	 */
	name?: string;
	/**
	 * The UDP port for realtime packets and WLED broadcast.
	 * WLED notifier default port
	 */
	udpport?: number;
	/**
	 * If true, the software is currently receiving realtime data via UDP or E1.31.
	 */
	live?: boolean;
	/**
	 * main segment id if its active, -1 otherwise
	 */
	liveseg?: number;
	/**
	 * Info about the realtime data source
	 * WLED SOURCE as of ~wled 14.0:
	 * ````
	 * switch (realtimeMode) {
	 * 	case REALTIME_MODE_INACTIVE:
	 *  	root["lm"] = "";
	 *  	break;
	 * 	case REALTIME_MODE_GENERIC:
	 *  	root["lm"] = "";
	 *  	break;
	 * 	case REALTIME_MODE_UDP:
	 *  	root["lm"] = "UDP";
	 *  	break;
	 * 	case REALTIME_MODE_HYPERION:
	 *  	root["lm"] = "Hyperion";
	 * 	break;
	 * 	case REALTIME_MODE_E131:
	 *  	root["lm"] = "E1.31";
	 *   	break;
	 * 	case REALTIME_MODE_ADALIGHT:
	 *  	root["lm"] = "USB Adalight/TPM2";
	 *  	break;
	 * 	case REALTIME_MODE_ARTNET:
	 *  	root["lm"] = "Art-Net";
	 *  	break;
	 * 	case REALTIME_MODE_TPM2NET:
	 *    root["lm"] = "tpm2.net";
	 *  	break;
	 * 	case REALTIME_MODE_DDP:
	 *    root["lm"] = "DDP";
	 *  	break;
	 * }
	 * ````
	 */
	lm?: string;
	/**
	 *
	 */
	lip?: string;
	/**
	 *
	 */
	ws?: number;
	/**
	 *
	 */
	fxcount?: number;
	/**
	 *
	 */
	palcount?: number;
	/**
	 *
	 */
	cpalcount?: number;
	/**
	 *
	 */
	maps?: Map[];
	/**
	 *
	 */
	wifi?: Wifi;
	/**
	 *
	 */
	fs?: Fs;
	/**
	 *
	 */
	ndc?: number;
	/**
	 *
	 */
	tx_power?: number;
	/**
	 *
	 */
	sleep?: boolean;
	/**
	 *
	 */
	arch?: string;
	/**
	 *
	 */
	core?: string;
	/**
	 *
	 */
	reset_reason_0?: number;
	/**
	 *
	 */
	reset_reason_1?: number;
	/**
	 *
	 */
	reset_reason?: number;
	/**
	 *
	 */
	lwip?: number;
	/**
	 *
	 */
	freeheap?: number;
	/**
	 *
	 */
	psram?: number;
	/**
	 *
	 */
	uptime?: number;
	/**
	 *
	 */
	time?: string;
	/**
	 *
	 */
	opt?: number;
	/**
	 *
	 */
	brand?: string;
	/**
	 *
	 */
	product?: string;
	/**
	 *
	 */
	btype?: string;
	/**
	 *
	 */
	mac?: string;
	/**
	 *
	 */
	ip?: string;
	/**
	 *
	 */

	constructor(data: Partial<Info> = {}) {
		Object.assign(this, data);
	}
	/**
	 * Creates an Info instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Info instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	/* static fromJson(jsonString: string): Info {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Info(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	} */

	/**
	 * Converts the Info instance to a JSON string.
	 * @returns The JSON string representation of the Info instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	/* toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	} */
}
