import Store from './Store'

class LevelStorage {
	static keys =  {
		_LEVELS_: '@BaseStorage:LEVEL'
	};

	static getLevel(id=0) {
		return Store.getItem(this.getKey(id), "json");
	}

	static updateLevel(id=0, data) {
		return Store.updateItem(this.getKey(id), data);
	}

	static getLevels(ids = []) {
		let getids = ids.map(id => this.getKey(id));
		return Store.getItems(getids, "json");
	}

	static getKey(id=0) {
		return `${this.keys._LEVELS_}_${id}`;
	}
}
export default LevelStorage;