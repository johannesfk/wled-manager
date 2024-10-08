export interface Nodes {
	nodes: Node[];
}

export interface Node {
	/**
	 * Not a trick question, really just the name of the corresponding node
	 */
	name?: string;
	/**
	 * 'a waste of space as we only have 5 types'
	 *
	 *    \- the WLED source code
	 *
	 * ```
	 * #define NODE_TYPE_ID_UNDEFINED        0
	 * #define NODE_TYPE_ID_ESP8266         82 // should be 1
	 * #define NODE_TYPE_ID_ESP32           32 // should be 2
	 * #define NODE_TYPE_ID_ESP32S2         33 // etc
	 * #define NODE_TYPE_ID_ESP32S3         34
	 * #define NODE_TYPE_ID_ESP32C3         35
	 * ```
	 * Considering the above, this field may be changed by the time you are using this
	 */
	type?: number;
	/**
	 * Not a trick question, really just IP address
	 */
	ip?: string;
	/**
	 * We have our top 4 engineers on the case, we'll know aht this is in about 3 years
	 */
	age?: number;
	/**
	 * We have our top 4 engineers on the case, we'll know aht this is in about 3 years
	 */
	vid?: string;
}
