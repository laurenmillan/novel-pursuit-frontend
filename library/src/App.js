import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LibraryApi from './api/api';

import './App.css';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/Profile';
import Bookmarks from './Components/Bookmarks';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import './Components/style.css';
import jwt_decode from 'jwt-decode';
import SavedBooksContext from './Components/Context/SavedBookContext';

/** Library App logic. 
 * 
 * - useEffect is used to fetch user data whenever the token changes.
 * - signup, login, and logout functions manage user authentication and the JWT token stored in LS.
 * - useEffect will run whenever the token value changes to ensure that the user information is fetched and
 *    updated based on the changes to the token.
 * - bookmarks function to handle a user saving "bookmarking" a book.
 * 
*/

const App = () => {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useState(localStorage.getItem('token')); // retrieve the value of the token key from LS
	LibraryApi.token = token;
	const [ savedBooks, setSavedBooks ] = useState([]);

	console.debug('App', 'currentUser=', currentUser, 'token=', token);

	useEffect(
		() => {
			async function fetchUser() {
				if (LibraryApi.token) {
					try {
						const data = jwt_decode(LibraryApi.token);
						const userData = await LibraryApi.getCurrentUser(data.username);
						setCurrentUser(userData);
					} catch (error) {
						console.error('Error occurred while fetching user data:', error);
					}
				} else {
					setCurrentUser(null);
				}
			}
			fetchUser();
		},
		[ token ]
	); // Add token as a dependency

	async function signup(signupData) {
		try {
			const token = await LibraryApi.signup(signupData);
			localStorage.setItem('token', token);
			setToken(token);
			LibraryApi.token = token;
			return { success: true };
		} catch (error) {
			console.error('Failed to signup:', error);
			return { success: false, error };
		}
	}

	async function login(loginData) {
		try {
			const token = await LibraryApi.login(loginData);
			localStorage.setItem('token', token);
			setToken(token);
			LibraryApi.token = token;
			return { success: true };
		} catch (error) {
			console.error('Failed to login:', error);
			return { success: false, error };
		}
	}

	/** Logout by clearing app's state, remove user's auth token from browser's LS */
	function logout() {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	}

	async function saveBook(key) {
		if (currentUser) {
			try {
				// Extract the book ID from the key, because the key format is '/works/OLXXXXXW'
				const bookId = key.split('/').pop();

				await LibraryApi.saveBook(currentUser.username, bookId);
				setSavedBooks((prevBooks) => [ ...prevBooks, bookId ]);
			} catch (error) {
				console.error('Failed to save this book:', error);
			}
		} else {
			console.error('User must be logged in to save a book.');
		}
	}

	return (
		<React.Fragment>
			<SavedBooksContext.Provider value={{ savedBooks, saveBook }}>
				<div className="App page-container">
					<NavBar user={token} logout={logout} />
					<div className="page-content">
						<Routes>
							<Route exact path="/" element={<Main user={currentUser} saveBook={saveBook} />} />
							<Route exact path="/login" element={<Login login={login} />} />
							<Route exact path="/signup" element={<Signup signup={signup} />} />
							<Route
								exact
								path="/profile"
								element={<Profile user={currentUser} setCurrentUser={setCurrentUser} />}
							/>
							<Route
								exact
								path="/bookmarks"
								element={<Bookmarks user={currentUser} saveBook={saveBook} />}
							/>
							<Route path="/*" element={<Navigate to="/" />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</SavedBooksContext.Provider>
		</React.Fragment>
	);
};

export default App;
