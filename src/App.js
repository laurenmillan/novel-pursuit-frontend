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
import AppContextProvider from './Components/Context/AppContext';

/** Library App logic. 
 * 
 * - useEffect is used to fetch user data whenever the token changes.
 * - signup, login, and logout functions manage user authentication and the JWT token stored in LS.
 * - jwt_decode is used to decode the JWT token and obtain user information.
 * - useEffect will run whenever the token value changes to ensure that the user information is fetched and
 *    updated based on the changes to the token.
 * - React Router is used for handling navigation and rendering different components based on the URL path.
 * - AppContextProvider is used for managing the application's state.
 * 
*/

const App = () => {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ token, setToken ] = useState(localStorage.getItem('token')); // retrieve the value of the token key from LS
	const [ isLoggedIn, setIsLoggedIn ] = useState(!!token); // isLoggedIn gets updated based on the presence of a token
	LibraryApi.token = token;

	useEffect(
		() => {
			setIsLoggedIn(!!token);
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
			const err = { success: false, error };
			throw err;
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

	function logout() {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	}

	return (
		<>
			<AppContextProvider isLoggedIn={isLoggedIn} username={currentUser?.username}>
				<div className="App page-container">
					<NavBar user={token} logout={logout} />
					<div className="page-content">
						<Routes>
							<Route exact path="/" element={<Main user={currentUser} isLoggedIn={isLoggedIn} />} />
							<Route exact path="/login" element={<Login login={login} />} />
							<Route exact path="/signup" element={<Signup signup={signup} />} />
							<Route
								exact
								path="/profile"
								element={<Profile user={currentUser} setCurrentUser={setCurrentUser} />}
							/>
							<Route exact path="/bookmarks" element={<Bookmarks />} />
							<Route path="/*" element={<Navigate to="/" />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</AppContextProvider>
		</>
	);
};

export default App;
