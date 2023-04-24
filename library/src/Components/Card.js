import React from 'react';
import Modal from './Modal';

/** Renders book card.
 * 
 * -Displays information about the book.
 * 
 */

const Card = ({ book, openModal }) => {
	console.log(book);

	return (
		<React.Fragment>
			<div className="card" onClick={() => openModal(book)}>
				<img src={book.cover_url} alt={book.title} />
				<div className="bottom">
					<h3 className="title">{book.title}</h3>
					<h2 className="author">{book.author_name}</h2>
				</div>
			</div>
			<Modal />
		</React.Fragment>
	);
};

export default Card;
