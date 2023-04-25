import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/** Renders book modal.
 * 
 * -Displays book information for specific book selected by user.
 * -A user can click the X to exit the modal or click outside the modal to exit.
 * 
 */

const Modal = ({ show, item, closeModal }) => {
	if (!show) {
		return null;
	}

	const coverUrl = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null;
	const publishers = item.publisher ? item.publisher.slice(0, 1) : ''; // Limit results to the first publisher
	const authors = item.author_name ? item.author_name.slice(0, 1) : ''; // Limit results to the first author

	return (
		<React.Fragment>
			<div className="overlay" onClick={closeModal}>
				<div className="overlay-inner">
					<button className="close" onClick={closeModal}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
					<div className="inner-box">
						{coverUrl ? <img src={coverUrl} alt={item.title} /> : <FontAwesomeIcon icon="book" size="6x" />}
						<div className="info">
							<h1 className="title">{item.title}</h1>
							<h3 className="author">by {authors}</h3>
							<h5>
								Publisher: <br />
								{publishers} <br />
								<span>{item.first_publish_year}</span>
							</h5>
						</div>
						<br />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;