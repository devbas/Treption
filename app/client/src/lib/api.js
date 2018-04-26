import config from '../config/'; 
import _ from 'lodash';

class Api {

	static headers() {
		return {
			'Accept': 'application/json', 
			'Content-Type': 'application/json', 
			//'Content-Type': 'application/x-www-form-urlencoded',
			'dataType': 'json', 
			'X-Requested-With': 'XMLHttpRequest'
		}
	}

	static get(route, token) {
		return this.xhr(route, null, 'GET', token); 
	}

	static post(route, params, token) {
		return this.xhr(route, params, 'POST', token); 
	}

	static xhr(route, params, verb, token) {
		
		let host = config.apiEndpoint; 

		const url = `${host}${route}`

		let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null ); 
		options.headers = Api.headers(); 
		if(token) {
			options.headers = _.extend(options.headers, { Authorization: 'Bearer ' + token });
		}

		return fetch(url, options).then( resp => {
			let json = resp.json(); 
			if(resp.ok) {
				return json; 
			} else {
				return json.then(err => { throw err });
			}
		}).catch(err => {
			return Promise.reject(err.code);
		})
	}
}

export default Api; 