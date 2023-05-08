import { createContext, useContext, useEffect } from 'react';
import React, { useState } from 'react';

/** Manages state for a list of favorited books.
 * 
 * - useAppContext is a custom hook that retrieves the AppContext to access the favorites state and related functions from any component that needs it.
 * - Defines the addToFavorites function, which takes a book object as a parameter and adds it to the favorites array.
 * - Defines the removeFromFavorites function, which takes a key parameter and removes the book with the matching key from the favorites array.
 * - useState manages addToFavorites and removeFromFavorites.
 * - AppContextProvider component wraps its children with the AppContext.Provider component and passes the favorites and removeFromFavorites 
 * 		properties as the value prop of the AppContext.Provider component.
 * - Retrieves stored favorites from LS and parses the JSON string to an array.
 * 		-Using the retrieved favorites array as the initial state for the 'favorites' state.
 * 		-useEffect updates LS whenever the 'favorites' state changes.
 * - username is passed as a prop from the App component. 
 * 		AppContextProvider uses username prop to manage the logged-in user's saved books by storing and retrieving them from LS.
 * 
 */

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
