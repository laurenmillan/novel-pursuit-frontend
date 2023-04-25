import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LibraryApi from './api/api';

import './App.css';
import Home from './Components/Home';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/Profile';
import Bookmarks from './Components/Bookmarks';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
import './Components/style.css'
import jwt_decode from 'jwt-decode';

/** Library App logic. 
 * 
 * - signup and logout functions use the LibraryApi to make requests to the backend API. If successful, they update 
 *    the token and store it in the browser's local storage.
 * - This maintains the user's session and avoids the need for the user to login when they revisit the website.
*/

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')) // retrieve the value of the token key from LS
  LibraryApi.token=token

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

	async function login(loginData){
		try{
			const token = await LibraryApi.login(loginData)
			localStorage.setItem('token', token)
      setToken(token)
      LibraryApi.token = token
      return {success:true}
		}catch(error){
      console.error('Failed to login:', error)
      return {success: false, error}
		}
	}

  /** Logout by clearing app's state, remove user's auth token from browser's LS */
	function logout() {
		setCurrentUser(null);
		setToken(null);
		localStorage.removeItem('token');
	}

	return (
		<div className="App">
			<NavBar user={token} logout={logout} />
			{/* <Main /> */}
			<Routes>
				<Route exact path="/" element={<><Home /><Main /></>} />
				<Route exact path="/login" element={<Login login={login} />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/profile" element={<Profile />} />
				<Route exact path="/bookmarks" element={<Bookmarks />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
};

export default App;
