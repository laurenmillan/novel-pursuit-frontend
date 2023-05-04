import { createContext, useContext } from 'react';
import { useState } from 'react';

/** Manages state for a list of favorited books.
 * 
 * - Defines the addToFavorites function, which takes a book object as a parameter and adds it to the favorites array.
 * - Defines the removeFromFavorites function, which takes a key parameter and removes the book with the matching key from the favorites array.
 * - useState manages addToFavorites and removeFromFavorites.
 * - AppContextProvider component wraps its children with the AppContext.Provider component and passes the favorites and removeFromFavorites 
 * 		properties as the value prop of the AppContext.Provider component.
 * 
 */

// initially set to null
const AppContext = createContext(null);

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error('AppContext must be within appContextProvider');
	}

	return context;
};

const AppContextProvider = ({ children }) => {
	const [ favorites, setFavorites ] = useState([]);

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
