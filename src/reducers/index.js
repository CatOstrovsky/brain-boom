import { combineReducers } from 'redux'
import LevelReducer from "./LevelReducer"

export default combineReducers({
	levels: LevelReducer,
});