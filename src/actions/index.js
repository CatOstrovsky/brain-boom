import Levels from '../const/levels'
import LevelStorage from '../controllers/LevelStorage'
import { UPDATE_STORAGE } from '../types.js'

export const updateStorage = (data) => {
	return {
		type: UPDATE_STORAGE,
		levels: data
	};
};
