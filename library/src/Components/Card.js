import React from 'react';

const Card = () => {
	return (
		<React.Fragment>
			<div className="card">
				<img src="./book.png" alt="book" />
				<div className="bottom">
					<h3 className="title">TITLE</h3>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Card;
