import { UPDATE_STORAGE } from '../types.js'

export default function(levels = [], action) {
	switch (action.type) {
		case UPDATE_STORAGE:
			return action.levels;
		break;

		default:
			if(action.levels) return action.levels;
			return levels;
		break;
	}
}