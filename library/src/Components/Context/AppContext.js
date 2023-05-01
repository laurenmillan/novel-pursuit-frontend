import { createContext, useContext } from 'react';
import { useState } from 'react';

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
		const currFavorites = [ ...favorites ];
		const newFavorites = currFavorites.concat(book);

		setFavorites(newFavorites);
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
