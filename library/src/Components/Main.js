import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import Card from './Card';
import LibraryApi from '../api/api';

/** Renders search functionality.
 * 
 * -Allows a user to search by title, author, or ISBN.
 * -The component will display the results as cards.
 * 
*/

const Main = () => {
	const [ search, setSearch ] = useState('');
	const [ bookData, setBookData ] = useState([]); // store results
	const [ loading, setLoading ] = useState(false);

	const searchBook = async (evt) => {
		if (evt.key === 'Enter') {
			setLoading(true);

			try {
				const results = await LibraryApi.getBooks(search); // Pass search variable
				// console.log(results);
				setBookData(results); // Update the state with search results
			} catch (err) {
				console.error('Search failed to retrieve book information');
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		}
	};

	return (
		<React.Fragment>
			<div>
				<h1>
					“A reader lives a thousand lives before he dies... <br /> The man who never reads lives only one.”
				</h1>
				<h3>-George R.R. Martin</h3>
				<hr />
			</div>
			<div className="search">
				<input
					type="text"
					placeholder="Search by Title, Author or ISBN"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={searchBook}
				/>
				<div className="search">
					<button>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</div>
			<img src="./bg2.png" className="responsive-image" alt="background-image" />
			<div className="container">
				{loading ? (
					<p>Loading...</p>
				) : bookData.length > 0 ? (
					bookData.map((book) => <Card key={book.key} book={book} />)
				) : search !== '' ? (
					<p>No books found. Please try your search again.</p>
				) : null}
			</div>
		</React.Fragment>
	);
};

export default Main;
