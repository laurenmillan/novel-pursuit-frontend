import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppContextProvider, { useAppContext } from './AppContext';

/** Mock component to simulate the usage of the AppContext.
 * 
 * - checks if addToFavorites correctly adds a book to the list of favorites.
 * - checks if removeFromFavorites removes a book from the list. 
 * - The test creates a TestComponent that uses the AppContext to access and manipulate the favorites list. 
 * - The test then clicks the buttons to add and remove books from the favorites and checks whether the expected behavior occurs.
 * 
*/

const TestComponent = () => {
	const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

	return (
		<div>
			<button onClick={() => addToFavorites({ key: 'book1', title: 'Book 1' })}>Add Book 1 to Favorites</button>
			<button onClick={() => addToFavorites({ key: 'book2', title: 'Book 2' })}>Add Book 2 to Favorites</button>
			<button onClick={() => removeFromFavorites('book1')}>Remove Book 1 from Favorites</button>
			<ul>{favorites.map((book) => <li key={book.key}>{book.title}</li>)}</ul>
		</div>
	);
};

test('addToFavorites and removeFromFavorites work correctly', () => {
	render(
		<AppContextProvider>
			<TestComponent />
		</AppContextProvider>
	);

	const addBook1Button = screen.getByText('Add Book 1 to Favorites');
	const addBook2Button = screen.getByText('Add Book 2 to Favorites');
	const removeBook1Button = screen.getByText('Remove Book 1 from Favorites');
	const book1 = 'Book 1';
	const book2 = 'Book 2';

	fireEvent.click(addBook1Button);
	expect(screen.getByText(book1)).toBeInTheDocument();

	fireEvent.click(addBook2Button);
	expect(screen.getByText(book2)).toBeInTheDocument();

	fireEvent.click(removeBook1Button);
	expect(screen.queryByText(book1)).not.toBeInTheDocument();
});
