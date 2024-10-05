export interface State {
	/**
	 * On/Off state of the light
	 */
	on?: boolean;
	/**
	 * Brightness of the light. If on is false, contains last brightness when light was on (aka brightness when on is set to true. Setting bri to 0 is supported but it is recommended to use the range 1-255 and use on: false to turn off. The state response will never have the value 0 for bri.
	 */
	bri?: number;
	/**
	 * Duration of the crossfade between different colors/brightness levels. One unit is 100ms, so a value of 4 results in a transition of 400ms.
	 */
	transition?: number;
	/**
	 * Similar to transition, but applies to just the current API call. Not included in state response.
	 */
	tt?: number;
	/**
	 * -1 to 65535; ID of currently set preset. 1~17~ can be used to iterate through presets 1-17.
	 */
	ps?: number;
	/**
	 * 1 to 16 (250 in 0.11); Save current light config to specified preset slot. Not included in state response.
	 */
	psave?: number;
	/**
	 * -1 to 0; 	ID of currently set playlist. For now, this sets the preset cycle feature, -1 is off and 0 is on.
	 */
	pl?: number;
	/**
	 * Night light
	 */
	nl?: Nl;
	/**
	 * UDP sync
	 */
	udpn?: Udpn;
	/**
	 * If set to true in a JSON POST command, the response will contain the full JSON state object. Not included in state response
	 */
	v?: boolean;
	/**
	 * If set to true, device will reboot immediately. Not included in state response.
	 */
	rb?: boolean;
	/**
	 * If set to true, enters realtime mode and blanks the LEDs. The realtime timeout option does not have an effect when this command is used, WLED will stay in realtime mode until the state (color/effect/segments, excluding brightness) is changed.
	 *
	 * It is expected that {"live":false} is sent once live data sending is terminated. Not included in state response.
	 */
	live?: boolean;
	/**
	 * 0, 1, or 2; Live data override.
	 * - 0 is off
	 * - 1 is override until live data ends
	 * - 2 is override until ESP reboot
	 *
	 * (available since 0.10.0)
	 */
	lor?: number;
	/**
	 * Set module time to unix timestamp. Not included in state response.
	 */
	time?: number;
	/**
	 * 0 to info.leds.maxseg-1; Main Segment
	 */
	mainseg?: number;
	/**
	 * Custom preset playlists. Not included in state response (available since 0.11.0)
	 */
	playlist?: Playlist;
	/**
	 * Array of segment objects; Segments are individual parts of the LED strip.
	 *
	 * In 0.9.0 this will enables running different effects on differentparts of the strip.
	 */
	seg?: Seg[];
}

interface Nl {
	/**
	 * Nightlight currently active
	 */
	on?: boolean;
	/**
	 * Duration of nightlight in minutes
	 */
	dur?: number;
	/**
	 * If true, the light will gradually dim over the course of the nightlight duration. If false, it will instantly turn to the target brightness once the duration has elapsed. Removed in 0.13.0 (use mode instead)
	 */
	fade?: boolean;
	/**
	 * 0 to 3; Nightlight mode
	 * - 0: instant
	 * - 1: fade
	 * - 2: color fade
	 * - 3: sunrise
	 *
	 * (available since 0.10.2)
	 */
	mode?: number;
	/**
	 * Target brightness of nightlight feature
	 */
	trbri?: number;
	/**
	 * - -1 to 15300; Remaining nightlight duration in seconds
	 * - -1 if not active.
	 *
	 * Only in state response, can not be set.
	 */
	rem?: number;
}

interface Udpn {
	/**
	 * Send WLED broadcast (UDP sync) packet on state change
	 */
	send?: boolean;
	/**
	 * Receive broadcast packets
	 */
	recv?: boolean;
	/**
	 * Bitfield for broadcast send groups 1-8
	 */
	sgrp?: number;
	/**
	 * Bitfield for broadcast receive groups 1-8
	 */
	rgrp?: number;
	/**
	 * Don't send a broadcast packet
	 *
	 * (applies to just the current API call). Not included in state response.
	 */
	nn?: boolean;
}

interface Seg {
	/**
	 * -1 to info.maxseg -1;
	 * Zero-indexed ID of the segment.
	 *
	 * May be omitted, in that case the ID will be inferred from the order of the segment objects in the seg array. -1 means apply to all selected segments
	 */
	id?: number;
	/**
	 * 0 to info.leds.count -1; LED the segment starts at.
	 */
	start?: number;
	/**
	 * 0 to info.leds.count; LED the segment stops at, not included in range.
	 *
	 * If stop is set to a lower or equal value than start (setting to 0 is recommended), the segment is invalidated and deleted.
	 */
	stop?: number;
	/**
	 * 0 to info.leds.count; Length of the segment (stop - start). stop has preference, so if it is included, len is ignored.
	 *
	 * This feild is ignored if stop is sent, so don't risk sending bad shit
	 */
	len?: number;
	/**
	 *Grouping (how many consecutive LEDs of the same segment will be grouped to the same color)
	 */
	grp?: number;
	/**
	 * Spacing (how many LEDs are turned off and skipped between each group)
	 */
	spc?: number;
	/**
	 * -len+1 to len; 	Offset (how many LEDs to rotate the virtual start of the segments, available since 0.13.0)
	 */
	of?: number;
	/**
	 * Turns on and off the individual segment. (available since 0.10.0)
	 */
	on?: boolean;
	/**
	 * freezes/unfreezes the current effect
	 */
	frz?: boolean;
	/**
	 * Sets the individual segment brightness (available since 0.10.0)
	 */
	bri?: number;
	/**
	 * 0 to 255 or 1900 to 10091; White spectrum color temperature (available since 0.13.0)
	 */
	cct?: number;
	/**
	 * Undocumented?????? TODO
	 *
	 * 14-15 : 0-3 UI segment sets/groups
	 *
	 * -WLED source
	 */
	set?: number;
	/**
	 * The name of the segment. Names are not present by default.
	 * If this is none, use "Segment{id}" to match the WLED UI
	 */
	name?: string;
	/**
	 * Array that has up to 3 color arrays as elements, the primary, secondary (background) and tertiary colors of the segment. Each color is an array of 3 or 4 bytes, which represent an RGB(W) color.
	 */
	col?: number[][];
	/**
	 * 0 to info.fxcount -1; ID of the effect or ~ to increment, ~- to decrement, or r for random.
	 */
	fx?: number;
	/**
	 * Relative effect speed. ~ to increment, ~- to decrement. ~10 to increment by 10, ~-10 to decrement by 10.
	 */
	sx?: number;
	/**
	 * Effect intensity. ~ to increment, ~- to decrement. ~10 to increment by 10, ~-10 to decrement by 10.
	 */
	ix?: number;
	/**
	 * 0 to info.palcount -1; ID of the color palette or ~ to increment, ~- to decrement, or r for random.
	 */
	pal?: number;
	/**
	 * Effect custom slider 1. Custom sliders are hidden or displayed and labeled based on effect metadata.
	 */
	cl?: number;
	/**
	 * Effect custom slider 2.
	 */
	c2?: number;
	/**
	 * 0 to 31; Effect custom slider 3.
	 */
	c3?: number;
	/**
	 * true if the segment is selected. Selected segments will have their state (color/FX) updated by APIs that don't support segments (e.g. UDP sync, HTTP API). If no segment is selected, the first segment (id:0) will behave as if selected. WLED will report the state of the first (lowest id) segment that is selected to APIs (HTTP, MQTT, Blynk...), or mainseg in case no segment is selected and for the UDP API. Live data is always applied to all LEDs regardless of segment configuration.
	 */
	sel?: boolean;
	/**
	 * Flips the segment, causing animations to change direction.
	 */
	rev?: boolean;
	/**
	 * Mirrors the segment (available since 0.10.2)
	 */
	mi?: boolean;
	/**
	 * Effect option 1. Custom options are hidden or displayed and labeled based on effect metadata.
	 */
	o1?: boolean;
	/**
	 * Effect option 2.
	 */
	o2?: boolean;
	/**
	 * Effect option 3.
	 */
	o3?: boolean;
	/**
	 * 0 to 3; Setting of the sound simulation type for audio enhanced effects.
	 * - 0: 'BeatSin'
	 * - 1: 'WeWillRockYou'
	 * - 2: '10_3'
	 * - 3: '14_3'
	 *
	 * (as of 0.14.0-b1, there are these 4 types defined)
	 */
	si?: number;
	/**
	 * 0 to 4 `[map1D2D.count];` Setting of segment field 'Expand 1D FX'.
	 * - 0: Pixels
	 * - 1: Bar
	 * - 2: Arc
	 * - 3: Corner
	 */
	m12?: number;
}

interface Playlist {
	/**
	 * Array of preset ID integers to be applied in this order.
	 */
	ps?: number[];
	/**
	 * Array of time each preset should be kept, in tenths of seconds. If only one integer is supplied, all presets will be kept for that time.Defaults to 10 seconds if not provided.
	 */
	dur?: number[];
	/**
	 * Array of time each preset should transition to the next one, in tenths of seconds. If only one integer is supplied, all presets will transition for that time. Defaults to the current transition time if not provided.
	 */
	transition?: number[];
	/**
	 * How many times the entire playlist should cycle before finishing. Set to 0 for an indefinite cycle. Default to indefinite if not provided.
	 */
	repeat?: number;
	/**
	 * Single preset ID to apply after the playlist finished. Has no effect when an indefinite cycle is set. If not provided, the light will stay on the last preset of the playlist.
	 */
	end?: number;
}