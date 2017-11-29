import { Injectable } from '@angular/core';

@Injectable()
export class PersistentStorageService {
	private appName = 'hybrid-holdings';

	constructor() {}

	save(name, data) {
		let localData: any = localStorage.getItem(this.appName);
		if (localData) {
			localData = JSON.parse(localData);
		} else {
			localData = {};
		}

		localData[name] = data;

		localStorage.setItem(this.appName, JSON.stringify(localData));
	}

	get(name) {
		const data = JSON.parse(localStorage.getItem(this.appName));
		if (!data) {
			return undefined;
		}
		if (name) {
			if (data[name]) {
				return data[name];
			} else {
				return {};
			}
		}
		return data;
	}
}
