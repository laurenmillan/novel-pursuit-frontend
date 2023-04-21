import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Main.css';

const Main = () => {
	return (
		<React.Fragment>
			<div className="search">
				<input type="text" placeholder="Search by Title, Author or ISBN" />
				<button>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</div>
		</React.Fragment>
	);
};

export default Main;
