import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/ProfileForm';
import Bookmarks from './Components/Bookmarks';

/** Routing Logic. */

const AppRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/bookmarks" element={<Bookmarks />} />
			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
