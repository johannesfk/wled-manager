export interface Net {
	/**
	 * list of networks found by most recent scan
	 */
	networks?: Network[];
}


export interface Network {
	/**
	 * SSID
	 */
	ssid?: string;
	/**
	 * RSSI
	 */
	rssi?: number;
	/**
	 * String MAC / BSSID of scanned wifi
	 */
	bssid?: string;
	/**
	 * Wifi channel. normally these are 1-14 but WLED source uses i32 at time of writing
	 */
	channel?: number;
	/**
	 * encryption type (enum wl_enc_type) of the specified item on the networks scanned list
	 */
	enc?: ApBehaviourEnum;
}

/**
 * words do not begin to explain how hard this was to find.
 * its buried in the esp core arduino framework.
 */
export enum ApBehaviourEnum {
	/** authenticate mode : open */
	WIFI_AUTH_OPEN,
	/** authenticate mode : WEP */
	WIFI_AUTH_WEP,
	/** authenticate mode : WPA_PSK */
	WIFI_AUTH_WPA_PSK,
	/** authenticate mode : WPA2_PSK */
	WIFI_AUTH_WPA2_PSK,
	/** authenticate mode : WPA_WPA2_PSK */
	WIFI_AUTH_WPA_WPA2_PSK,
	/** authenticate mode : WPA2_ENTERPRISE */
	WIFI_AUTH_WPA2_ENTERPRISE,
	/// probaly you found a CIA AP. Run
	WIFI_AUTH_MAX,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD1,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD2,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD3,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD4,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD5,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD6,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD7,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD8,
	/// Reserved to keep some semblance of backwards compatibility when new versions of whatever the fuck this came from come out
	RSVD9
}
