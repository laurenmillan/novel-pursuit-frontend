import React from 'react';

const Card = ({ book }) => {
	console.log(book);

	return (
		<React.Fragment>
			<div className="card">
				<img src={book.cover_url} alt={book.title} />
				<div className="bottom">
					<h3 className="title">{book.title}</h3>
					<h2 className="author">{book.author_name}</h2>
				</div>
			</div>
		</React.Fragment>
	);
};

// return (
// 		<React.Fragment>
// 			{book.map((key) => {
// 				// let thumbnail = key.cover_i
// 				return (
// 					<React.Fragment>
// 						<div className="card">
// 							<img src={thumbnail} alt={book.title} />
// 							<div className="bottom">
// 								<h3 className="title">{book.title}</h3>
// 								<h2 className="author">{book.author_name}</h2>
// 							</div>
// 						</div>
// 					</React.Fragment>
// 				);
// 			})}
// 		</React.Fragment>
// 	);

export default Card;
