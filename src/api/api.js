import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 */

class LibraryApi {
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		// pass authorization token in the header.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${LibraryApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	/** Individual API routes. */

	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	static async getBooks(query, page) {
		const titleResults = await this.getBooksByTitle(query, page);
		const authorResults = await this.getBooksByAuthor(query, page);

		try {
			const isbnResults = await this.getBook(query);
			return [ ...titleResults, ...authorResults, isbnResults ];
		} catch (err) {
			return [ ...titleResults, ...authorResults ];
		}
	}

	static async getBook(isbn) {
		const LIBRARY_BOOK_URL = `https://openlibrary.org/isbn/${isbn}.json`;
		const res = await axios.get(LIBRARY_BOOK_URL);
		return res.data;
	}

	static async getBooksByTitle(title, page) {
		const res = await axios.get(LIBRARY_SEARCH_URL, {
			params: {
				title: title,
				page: page,
				limit: 16
			}
		});
		return res.data.docs;
	}

	static async getBooksByAuthor(author, page) {
		const res = await axios.get(LIBRARY_SEARCH_URL, {
			params: {
				author_name: author,
				page: page,
				limit: 16
			}
		});
		return res.data.docs;
	}

	static async saveBook(username, bookId) {
		await this.request(`users/${username}/books/${bookId}`, {}, 'post');
	}

	static async login(loginData) {
		let res = await this.request(`auth/token`, loginData, 'post');
		return res.token;
	}

	static async signup(signupData) {
		let res = await this.request(`auth/register`, signupData, 'post');
		return res.token;
	}

	static async saveProfile(username, data) {
		const res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

export default LibraryApi;
