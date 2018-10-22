import { AsyncStorage } from 'react-native';

class Levels {

	static getItem(key="", type="") {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem(key)
			.then(value => {
				if(type == "json" && value) return JSON.parse(value);
				return value;
			})
			.then(value => resolve(value))
			.catch(error => reject(error))
		})
	}

	static getItems(keys=[], type="") {
		return new Promise((resolve, reject) => {
			AsyncStorage.multiGet(keys)
			.then(value => {
				try {
					if(type == "json" && value) return value.map(val => JSON.parse(val));
				}catch(e) {}
				return value;
			})
			.then(value => resolve(value))
			.catch(error => reject(error))
		})
	}

	static setItem(key = "", value = "") {
		return  new Promise((resolve, reject) => {
			if(typeof(value) == 'object') value = JSON.stringify(value);

			AsyncStorage
			.setItem(key, JSON.stringify(value))
			.then(value => resolve(value))
			.catch(error => reject(error))
		})
	}

	static updateItem(key = "", value = {}) {
		return  new Promise((resolve, reject) => {
			if(typeof(value) == 'object') value = JSON.stringify(value);

			return AsyncStorage
			.mergeItem(key, value)
			.then(result => resolve(result))
			.catch(error => reject(error))
		})
	}

}

export default Levels;