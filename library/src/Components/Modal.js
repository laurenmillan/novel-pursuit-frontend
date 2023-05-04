import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from './Context/AppContext';

/** Renders a book modal.
 *  
 * - item is the selectedBook which is a prop passed down from the Main component.
 * - Returns a modal overlay that displays the book details, handles for unavailable descriptions.
 * - It includes a button to add or remove the book from the bookmarks.
 * - When the Modal is rendered within the Main component, the isLoggedIn prop is passed down
 * 		to decide whether to display the alert for signing up or logging for a user that is logged out.
 * 
 */

const Modal = ({ show, item, closeModal, isLoggedIn }) => {
	const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
	const [ description, setDescription ] = useState('');
	const [ loading, setLoading ] = useState(true); // loading state variable for the book description

	// useEffect makes a separate API request to get the description of the book and handle different formats of the description object
	useEffect(
		() => {
			// Reset loading and description states when the item changes
			setLoading(true);
			setDescription('');

			if (item) {
				const fetchDescription = async () => {
					try {
						const response = await fetch(`https://openlibrary.org${item.key}.json`);
						const data = await response.json();
						if (data && data.description) {
							if (typeof data.description === 'string') {
								setDescription(data.description);
							} else if (data.description.value) {
								setDescription(data.description.value);
							}
						}
						setLoading(false);
					} catch (error) {
						console.error(error);
						setLoading(false);
					}
				};
				fetchDescription();
			}
		},
		[ item ]
	);

	if (!show) {
		return null;
	}

	console.log('favorites are', favorites);

	const isBookInFavorites = (key) => {
		// .some checks if there is at least one element in the favorites array in the condition
		const found = favorites.some((book) => book.key === key);
		return found;
	};

	const coverUrl = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null;
	const publisher = item.publisher ? item.publisher.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first publisher
	const author = item.author_name ? item.author_name.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first author

	return (
		<React.Fragment>
			<div className="overlay" onClick={closeModal}>
				<div className="overlay-inner">
					<button className="close" onClick={closeModal}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
					<div className="inner-box">
						{coverUrl ? (
							<img className="book-cover" src={coverUrl} alt={item.title} />
						) : (
							<FontAwesomeIcon className="book-placeholder" icon={faBook} size="6x" />
						)}
						<div className="info">
							<h1 className="modal-title">{item.title}</h1>
							<h3 className="author">by {author}</h3>
							<h5 className="publisher">
								Publisher: {publisher}
								<span className="publish-date">
									&nbsp;|&nbsp;Publish Date: {item.first_publish_year}
								</span>
							</h5>

							{loading ? (
								<p className="loading-text">Loading...</p>
							) : (
								<p className="description-text">{description || 'Sorry, no description available.'}</p>
							)}

							{isBookInFavorites(item.key) ? (
								<button
									className="bookmark-btn"
									type="submit"
									onClick={(e) => {
										e.stopPropagation();
										removeFromFavorites(item.key);
									}}
								>
									<span className="bookmark-text">
										<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
										<span className="add-to-bookmarks">&nbsp;Remove from Bookmarks</span>
									</span>
								</button>
							) : (
								<button
									className="bookmark-btn"
									type="submit"
									onClick={(e) => {
										e.stopPropagation();
										if (isLoggedIn) {
											addToFavorites(item);
										} else {
											// Show signup/login prompt
											alert('You need to Signup or Login to add a Bookmark.');
										}
									}}
								>
									<span className="bookmark-text">
										<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
										<span className="add-to-bookmarks">&nbsp;Add to Bookmarks</span>
									</span>
								</button>
							)}
						</div>
						<br />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
