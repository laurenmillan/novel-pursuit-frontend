import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import LibraryApi from './api/api';

import './App.css';
import Home from './Components/Home';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/Profile';
import Bookmarks from './Components/Bookmarks';
import NotFound from './404/404';
import Main from './Components/Main';
import NavBar from './Components/NavBar';

/** Library App logic. */

const App = () => {
	return (
		<div className="App">
			<NavBar />
			{/* <Main /> */}
			<Routes>
				<Route exact path="/" element={<><Home /><Main /></>} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/profile" element={<Profile />} />
				<Route exact path="/bookmarks" element={<Bookmarks />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
