import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBook } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from './Context/AppContext';
import './style.css';

/** Renders a Bookmarks page.
 *
 * - Displays saved books "bookmarks" for logged in user.
 * - A user can also remove a saved book from "bookmarks".
 * - favorites and removeFromFavorites are passed from AppContext.
 *
 */

const Bookmarks = () => {
	const { favorites, removeFromFavorites } = useAppContext();

	console.log('favorites are', favorites);

	return (
		<div className="bookmarks">
			<h1 className="h1-title" style={{ fontSize: '3rem' }}>
				Bookmarks
			</h1>
			<div className="bookmarks-grid">
				{favorites.length > 0 ? (
					favorites.map((item) => {
						const coverUrl = item.cover_i
							? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
							: null;
						const publisher = item.publisher ? item.publisher.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first publisher
						const author = item.author_name ? item.author_name.slice(0, 1) : '(Information Unavailable)'; // Limit results to the first author

						return (
							<div key={item.key} className="book-item">
								<div className="book-item-content">
									{coverUrl ? (
										<img className="book-cover" src={coverUrl} alt={item.title} />
									) : (
										<FontAwesomeIcon className="book-placeholder" icon={faBook} size="6x" />
									)}
									<div className="info">
										<h1 className="title">{item.title}</h1>
										<h3 className="author" style={{ color: '#347d56' }}>
											by {author}
										</h3>
										<h5 className="publisher">
											Publisher: {publisher}
											<span className="publish-date">
												&nbsp;|&nbsp;Publish Date: {item.first_publish_year}
											</span>
										</h5>
									</div>
									<button
										className="bookmark-btn"
										type="submit"
										onClick={(e) => {
											e.stopPropagation();
											removeFromFavorites(item.key);
										}}
									>
										<FontAwesomeIcon className="bookmark-icon" icon={faBookmark} size="1x" />
										<span className="add-to-bookmarks">&nbsp;Remove from Bookmarks</span>
									</button>
								</div>
							</div>
						);
					})
				) : (
					<span className="no-bookmarks-message">You don't have any books that are bookmarked yet!</span>
				)}
			</div>
		</div>
	);
};

export default Bookmarks;
