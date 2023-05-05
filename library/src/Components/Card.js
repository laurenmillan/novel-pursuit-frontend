import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

/** Renders book card.
 * 
 * - Displays information about the book.
 * - Displays a book icon if a book cover cannot be located.
 * - Component limits the displayed authors to the first element.
 * 
 */

const Card = ({ book, openModal }) => {
	// console.log(book);

	const hasCover = book.cover_i;
	const coverUrl = hasCover ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;
	const authors = book.author_name ? book.author_name.slice(0, 1) : ''; // Limit results to the first author

	return (
		<React.Fragment>
			<div className="main-card" onClick={() => openModal(book)}>
				{hasCover ? (
					<img src={coverUrl} alt={book.title} />
				) : (
					<FontAwesomeIcon icon={faBook} size="10x" style={{ marginBottom: '15px' }} />
				)}
				<div className="bottom">
					<h3 className="title card-title">{book.title}</h3>
					<h2 className="author">{authors}</h2>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Card;
