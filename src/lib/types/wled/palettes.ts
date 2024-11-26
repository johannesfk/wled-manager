// Assuming you have a file for custom errors
import { WledJsonApiError } from './errors';

export class Palettes extends Array<string> {
	constructor(items?: string[]) {
		super();
		if (items) {
			this.push(...items);
		}
	}

	static fromJson(jsonString: string): Palettes {
		try {
			const parsed = JSON.parse(jsonString);
			if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
				return new Palettes(parsed);
			}
			throw new Error('Invalid JSON structure for Palettes');
		} catch (e) {
			if (e instanceof Error) {
				throw new WledJsonApiError('SerdeError', e.message);
			}
			throw new WledJsonApiError('SerdeError', 'Unknown error during JSON parsing');
		}
	}
}

// Test
if (process.env.NODE_ENV === 'test') {
	const jsonString = `[
    "Default","* Random Cycle","* Color 1","* Colors 1&2","* Color Gradient","* Colors Only","Party","Cloud","Lava","Ocean",
    "Forest","Rainbow","Rainbow Bands","Sunset","Rivendell","Breeze","Red & Blue","Yellowout","Analogous","Splash",
    "Pastel","Sunset 2","Beach","Vintage","Departure","Landscape","Beech","Sherbet","Hult","Hult 64",
    "Drywet","Jul","Grintage","Rewhi","Tertiary","Fire","Icefire","Cyane","Light Pink","Autumn",
    "Magenta","Magred","Yelmag","Yelblu","Orange & Teal","Tiamat","April Night","Orangery","C9","Sakura",
    "Aurora","Atlantica","C9 2","C9 New","Temperature","Aurora 2","Retro Clown","Candy","Toxy Reaf","Fairy Reaf",
    "Semi Blue","Pink Candy","Red Reaf","Aqua Flash","Yelblu Hot","Lite Light","Red Flash","Blink Red","Red Shift","Red Tide",
    "Candy2"
  ]`;

	try {
		const palettes = Palettes.fromJson(jsonString);
		console.log(palettes);
	} catch (error) {
		console.error('Test failed:', error);
	}
}
