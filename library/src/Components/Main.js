import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import Card from './Card';
import LibraryApi from '../api/api';
import Modal from './Modal';
import Button from 'react-bootstrap/Button';

/** Renders search functionality and book information modal.
 * 
 * - Allows a user to search by title, author, or ISBN.
 * - The component will display the results as cards.
 * - When a user clicks on a card, a modal is displayed with the book information.
 * - A message will appear if a book cannot be located.
 * - selectedBook state is set using the setSelectedBook function whenever a card is clicked. 
 * - The selected book is passed to the Modal component as the item prop, which is used to display the book details.
 * - Component contains pagination with a "Load More" button 
 * 
*/

const Main = () => {
	const [ search, setSearch ] = useState('');
	const [ bookData, setBookData ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ searchPerformed, setSearchPerformed ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedBook, setSelectedBook ] = useState(null);

	// Pagination
	const [ page, setPage ] = useState(1);
	const [ hasMore, setHasMore ] = useState(true);

	const searchBook = async (evt, page = 1) => {
		if (!evt || evt.key === 'Enter') {
			if (page === 1) {
				setBookData([]);
			}

			setLoading(true);
			setSearchPerformed(true);

			try {
				const results = await LibraryApi.getBooks(search, page);
				if (results.length === 0) {
					setHasMore(false);
				} else {
					setBookData((prevBooks) => [ ...prevBooks, ...results ]); // Update the state with search results
					setHasMore(true);
				}
			} catch (error) {
				console.error('Search failed to retrieve book information');
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		}
	};

	const loadMore = () => {
		setPage((prevPage) => prevPage + 1);
		searchBook(null, page + 1);
	};

	// Load More button
	const renderLoadMoreButton = () => {
		return !loading && hasMore && bookData.length > 0 ? (
			<div className="centered-button-container">
				<Button className="load-more-button" onClick={loadMore} variant="dark">
					Load More
				</Button>
			</div>
		) : null;
	};

	const openModal = (book) => {
		setSelectedBook(book);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedBook(null);
	};

	return (
		<React.Fragment>
			<div className="main-text">
				<h1>Discover Your Next Great Read</h1>
				<p>Explore a vast collection of books</p>
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
					<button className="magnifying-button" onClick={searchBook}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</div>
			<div className="loading-container">{loading && <p>Loading...</p>}</div>
			<div className="main-container">
				{!loading &&
					bookData.length > 0 &&
					bookData.map((book) => <Card key={book.key} book={book} openModal={openModal} />)}
				{!loading &&
				searchPerformed &&
				bookData.length === 0 && (
					<p style={{ textAlign: 'center' }}>No books found. Please try your search again.</p>
				)}
				{renderLoadMoreButton()}
			</div>
			<Modal show={showModal} item={selectedBook} closeModal={closeModal} />
		</React.Fragment>
	);
};

export default Main;
