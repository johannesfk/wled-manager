import { WledJsonApiError } from '../other/WledJsonApiError';

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
	 * Realtime data source IP address
	 */
	lip?: string;
	/**
	 * -1 to 8; Number of currently connected WebSockets clients. -1 indicates that WS is unsupported in this build.
	 */
	ws?: number;
	/**
	 * Number of effects included.
	 */
	fxcount?: number;
	/**
	 * Number of palettes configured.
	 * will only return built-in palette count
	 */
	palcount?: number;
	/**
	 * custom palette count
	 */
	cpalcount?: number;
	/**
	 * available ledmaps
	 */
	maps?: Map[];
	/**
	 * Info about wifi
	 */
	wifi?: Wifi;
	/**
	 * Info about the embedded LittleFS filesystem (since 0.11.0)
	 */
	fs?: Fs;
	/**
	 * -1 to 255; Number of other WLED devices discovered on the network. -1 if Node discovery disabled. (since 0.12.0)
	 */
	ndc?: number;
	/**
	 * only present on debug builds
	 * (int) WiFi.getTxPower();
	 */
	tx_power?: number;
	/**
	 * only present on debug builds
	 * (bool) WiFi.getSleep();
	 */
	sleep?: boolean;
	/**
	 * Name of the platform.
	 */
	arch?: string;
	/**
	 * Version of the underlying (Arduino core) SDK.
	 */
	core?: string;
	/**
	 * only present on debug esp32 builds
	 * (int)rtc_get_reset_reason(0);
	 */
	reset_reason_0?: number;
	/**
	 * only present on debug esp32 builds
	 * (int)rtc_get_reset_reason(1);
	 */
	reset_reason_1?: number;
	/**
	 * only present on debug esp8266 builds
	 * (int)rtc_get_reset_reason(0);
	 */
	reset_reason?: number;
	/**
	 * 0-2; Version of LwIP. 1 or 2 on ESP8266, 0 (does not apply) on ESP32. Deprecated, removal in 0.14.0
	 */
	lwip?: number;
	/**
	 * Bytes of heap memory (RAM) currently available. Problematic if <10k.
	 */
	freeheap?: number;
	/**
	 * ESP.getFreePsram(); only present when hardware supports psram
	 */
	psram?: number;
	/**
	 * Time since the last boot/reset in seconds.
	 */
	uptime?: number;
	/**
	 * The current time in human readable format
	 */
	time?: string;
	/**
	 * Used for debugging purposes only. bit map of build info
	 * ````rust
	 * #ifdef WLED_DEBUG_HOST
	 * 	os |= 0x0100;
	 * 	if (!netDebugEnabled) os &= ~0x0080;
	 * #endif
	 * ````
	 * - 0x80: debug enabled
	 * - 0x40: disable alexa
	 * - 0x20: Depreceated, used to be Blynk support, may be repurposed
	 * - 0x10: usermod Chronixie
	 * - 0x08: disable filesystem build tag
	 * - 0x04: disable hue sync build tag
	 * - 0x02: enable AdaLight build tag
	 * - 0x01: disable OTA build tag
	 */
	opt?: number;
	/**
	 * The producer/vendor of the light. Always WLED for standard installations.
	 */
	brand?: string;
	/**
	 * The product name. Always FOSS for standard installations.
	 */
	product?: string;
	/**
	 * The origin of the build.
	 * src if a release version is compiled from source,
	 * bin for an official release image,
	 * dev for a development build (regardless of src/bin origin)
	 * and exp for experimental versions.
	 * ogn if the image is flashed to hardware by the vendor.
	 *
	 * Removed as of v0.10
	 */
	btype?: string;
	/**
	 * The hexadecimal hardware MAC address of the light, lowercase and without colons.
	 */
	mac?: string;
	/**
	 * The IP address of this instance. Empty string if not connected. (since 0.13.0)
	 *
	 * format: `sprintf(s, "%d.%d.%d.%d", localIP[0], localIP[1], localIP[2], localIP[3]);`
	 */
	ip?: string;

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

/**
 * Leds class representing the structure of the Leds object.
 */
export class Leds {
	count?: number;
	pwr?: number;
	fps?: number;
	maxpwr?: number;
	maxseg?: number;
	matrix?: MatrixDims;
	seglc?: number[];
	lc?: number;
	rgbw?: boolean;
	wv?: number;
	cct?: number;
	pin?: number[];
	i2c?: [number, number];
	spi?: [number, number, number];

	constructor(data: Partial<Leds> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Leds instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Leds instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Leds {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Leds(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Leds instance to a JSON string.
	 * @returns The JSON string representation of the Leds instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}

/**
 * Map class representing the structure of the Map object.
 */
export class Map {
	id?: number;
	n?: string;

	constructor(data: Partial<Map> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Map instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Map instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Map {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Map(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Map instance to a JSON string.
	 * @returns The JSON string representation of the Map instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}

/**
 * MatrixDims class representing the structure of the MatrixDims object.
 */
export class MatrixDims {
	w?: number;
	h?: number;

	constructor(data: Partial<MatrixDims> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a MatrixDims instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The MatrixDims instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): MatrixDims {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new MatrixDims(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the MatrixDims instance to a JSON string.
	 * @returns The JSON string representation of the MatrixDims instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}

/**
 * Wifi class representing the structure of the Wifi object.
 */
export class Wifi {
	bssid?: string;
	rssi?: number;
	signal?: number;
	channel?: number;

	constructor(data: Partial<Wifi> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Wifi instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Wifi instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Wifi {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Wifi(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Wifi instance to a JSON string.
	 * @returns The JSON string representation of the Wifi instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}

/**
 * Fs class representing the structure of the Fs object.
 */
export class Fs {
	u?: number;
	t?: number;
	pmt?: number;

	constructor(data: Partial<Fs> = {}) {
		Object.assign(this, data);
	}

	/**
	 * Creates a Fs instance from a JSON string.
	 * @param jsonString - The JSON string to parse.
	 * @returns The Fs instance.
	 * @throws WledJsonApiError if parsing fails.
	 */
	static fromJson(jsonString: string): Fs {
		try {
			const jsonObject = JSON.parse(jsonString);
			return new Fs(jsonObject);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}

	/**
	 * Converts the Fs instance to a JSON string.
	 * @returns The JSON string representation of the Fs instance.
	 * @throws WledJsonApiError if serialization fails.
	 */
	toJson(): string {
		try {
			return JSON.stringify(this);
		} catch (error) {
			throw WledJsonApiError.SerdeError(error);
		}
	}
}
