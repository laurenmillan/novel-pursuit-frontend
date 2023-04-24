import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import Card from './Card';

const Main = () => {
	return (
		<React.Fragment>
			<div>
				<h1>“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.”</h1>
				<h3>-George R.R. Martin</h3>
				<hr />
			</div>
			<div className="search">
				<input type="text" placeholder="Search by Title, Author or ISBN" />
				<div className="search">
					<button>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</div>
			<img src="./bg2.png" className="responsive-image" alt="background-image" />
			<div className="container">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</React.Fragment>
	);
};

export default Main;
