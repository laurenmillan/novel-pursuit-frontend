import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */

class LibraryApi {
	// the token for interactive with the API will be stored here.
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

	// Individual API routes

	/** Get the current user. */

	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Get details of a book by isbn, author or title. */

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

	/** Get details on a book by isbn. */

	static async getBook(isbn) {
		const LIBRARY_BOOK_URL = `https://openlibrary.org/isbn/${isbn}.json`;
		const res = await axios.get(LIBRARY_BOOK_URL);
		return res.data;
	}

	/** Get list of books (filtered by title if not undefined). */

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

	/** Get list of books (filtered by author if not undefined). */

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

	/** Save a book */

	static async saveBook(username, bookId) {
		await this.request(`users/${username}/books/${bookId}`, {}, 'post');
	}

	/** Get token for login from username, password. */

	static async login(loginData) {
		let res = await this.request(`auth/token`, loginData, 'post');
		return res.token;
	}

	/** Signup for site. */

	static async signup(signupData) {
		let res = await this.request(`auth/register`, signupData, 'post');
		return res.token;
	}

	/** Save user profile page. */

	static async saveProfile(username, data) {
		const res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

export default LibraryApi;
