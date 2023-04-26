import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
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

	static async getBooks(query) {
		const titleResults = await this.getBooksByTitle(query);
		const authorResults = await this.getBooksByAuthor(query);

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

	static async getBooksByTitle(title) {
		const res = await axios.get(LIBRARY_SEARCH_URL, {
			params: {
				title: title
			}
		});
		return res.data.docs;
	}

	/** Get list of books (filtered by author if not undefined). */

	static async getBooksByAuthor(author) {
		const res = await axios.get(LIBRARY_SEARCH_URL, {
			params: {
				author_name: author
			}
		});
		return res.data.docs;
	}

	/** Save a book */

	static async bookmarks(username, id) {
		const bookDetails = await this.getBook(id);

		// Process book details and extract the required information
		const processedBookDetails = {
			id: bookDetails.id,
			title: bookDetails.title,
			author_name: bookDetails.author_name,
			cover_i: bookDetails.cover_i
		};

		await this.request(`users/${username}/books/${id}`, processedBookDetails, 'post');
	}

	/** Get token for login from username, password. */

	static async login(loginData) {
		let res = await this.request(`auth/token`, loginData, 'post');
		// console.log(res);
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
		// console.log(res);
		return res.user;
	}
}

export default LibraryApi;

// for now, put token ("testuser" / "password" on class)
// LibraryApi.token =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
// 	'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
// 	'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';
