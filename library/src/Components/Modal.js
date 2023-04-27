import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, item, closeModal }) => {
	if (!show) {
		return null;
	}

	const coverUrl = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null;
	const publisher = item.publisher ? item.publisher.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first publisher
	const author = item.author_name ? item.author_name.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first author

	const handleButtonClick = (evt) => {
		evt.stopPropagation();
		console.log('Bookmark button clicked');
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
							<img className="book-cover" src={coverUrl} alt={item.title} />
						) : (
							<FontAwesomeIcon className="book-placeholder" icon={faBook} size="6x" />
						)}
						<div className="info">
							<h1 className="title">{item.title}</h1>
							<h3 className="author">by {author}</h3>
							<h5 className="publisher">
								Publisher: {publisher}
								<span className="publish-date">
									&nbsp;|&nbsp;Publish Date: {item.first_publish_year}
								</span>
							</h5>
							<button className="bookmark-btn" type="submit" onClick={handleButtonClick}>
								<span className="bookmark-text">
									<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
									<span className="add-to-bookmarks">&nbsp;Add to Bookmarks</span>
								</span>
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
