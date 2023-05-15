import { createContext, useContext, useEffect } from 'react';
import React, { useState } from 'react';

/** Manages state for a list of favorited books. */

const AppContext = createContext(null);

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error('AppContext must be within appContextProvider');
	}

	return context;
};

const AppContextProvider = ({ children, username }) => {
	const storedFavorites = localStorage.getItem(`favorites-${username}`);
	const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

	const [ favorites, setFavorites ] = useState(initialFavorites);

	useEffect(
		() => {
			if (username) {
				const storedFavorites = localStorage.getItem(`favorites-${username}`);
				const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
				setFavorites(initialFavorites);
			} else {
				setFavorites([]);
			}
		},
		[ username ]
	);

	useEffect(
		() => {
			localStorage.setItem(`favorites-${username}`, JSON.stringify(favorites));
		},
		[ favorites, username ]
	);

	// pass book object as a parameter
	const addToFavorites = (book) => {
		const currFavorites = [ ...favorites ]; // creates a new array that includes currFavorites concatenated with the book obkect
		const newFavorites = currFavorites.concat(book);

		setFavorites(newFavorites); // updates favorites state with new array
	};

	const removeFromFavorites = (key) => {
		const currFavorites = [ ...favorites ];
		const newFavorites = currFavorites.filter((book) => book.key !== key);

		setFavorites(newFavorites);
	};

	return (
		<AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>{children}</AppContext.Provider>
	);
};

export default AppContextProvider;
