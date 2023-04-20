import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/LoginForm';
import Signup from './Components/SignupForm';
import Profile from './Components/ProfileForm';
import Bookmarks from './Components/Bookmarks';
import NotFound from './404/404';

/** Routing Logic. */

const AppRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/bookmarks" element={<Bookmarks />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
