import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';

/** Renders book modal.
 * 
 * - Displays book information for specific book selected by user.
 * - User can exit the modal by either clicking the X button or click outside the modal.
 * - Component limits the displayed authors and publishers to the first element.
 * - Allows a user to save a book to /bookmarks by clicking the bookmark button.
 * 
 */

const Modal = ({ show, item, closeModal, bookmarks }) => {
	if (!show) {
		return null;
	}

	const coverUrl = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null;
	const publishers = item.publisher ? item.publisher.slice(0, 1) : ''; // Limit results to the first publisher
	const authors = item.author_name ? item.author_name.slice(0, 1) : ''; // Limit results to the first author

	const saveBook = () => {
		const isbn = item.isbn && item.isbn.length > 0 ? item.isbn[0] : null;
		if (isbn) {
			bookmarks(isbn); // Call the bookmarks function with the book ISBN when the Save Book button is clicked
			closeModal();
		} else {
			console.error('ISBN not found');
		}
	};

	return (
		<React.Fragment>
			<div className="overlay" onClick={closeModal}>
				<div className="overlay-inner">
					<button className="close" onClick={closeModal}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
					<div className="inner-box">
						{coverUrl ? (
							<img src={coverUrl} alt={item.title} />
						) : (
							<FontAwesomeIcon icon={faBook} size="6x" style={{ marginRight: '15' }} />
						)}
						<div className="info">
							<h1 className="title">{item.title}</h1>
							<h3 className="author">by {authors}</h3>
							<h5 className="publisher">
								Publisher: <br />
								{publishers} <br />
								<span className="publish-date">
									Publish Date: <br />
									{item.first_publish_year}
								</span>
							</h5>
						</div>
						<div>
							<button className="bookmarks" onClick={saveBook}>
								<FontAwesomeIcon icon={faBookmark} size="1x" />
							</button>
						</div>
						<br />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
