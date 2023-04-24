import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import Card from './Card';

const Main = () => {
	return (
		<React.Fragment>
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
			</div>
		</React.Fragment>
	);
};

export default Main;
