import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/** Renders book modal.
 * 
 * -Displays book information for specific book selected by user.
 * 
 */

const Modal = ({ show, item, closeModal }) => {
	if (!show) {
		return null;
	}

	return (
		<React.Fragment>
			<div className="overlay">
				<div className="overlay-inner">
					<button className="close" onClick={closeModal}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<div className="inner-box">
						<img src="./book.png" alt="book-cover" />
						<div className="info">
							<h1>Book info Title</h1>
							<h3>Author</h3>
							<h4>
								Publisher <span>Published Date</span>
							</h4>
							<br />
							<a href="#">
								<button>More</button>
							</a>
						</div>
					</div>
					<h4 className="description">Book Description...</h4>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Modal;
