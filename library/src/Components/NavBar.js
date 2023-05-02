import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

/** Displays dynamic navbar components.
 * 
 * - props: user and logout, passed down from the App component.
 * - user represents current user.
 * - logout is a function that logs out the user when called.
 * 
*/

const NavBar = ({ user, logout }) => {
	return (
		<div>
			<Navbar expand="md" className="custom-navbar">
				<Navbar.Brand as={NavLink} to="/">
					Novel Pursuit
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					<Nav className="ml-auto" navbar>
						{/* if user is not logged in, render /login, /signup */}
						{!user ? (
							<React.Fragment>
								<Nav.Item>
									<Nav.Link as={NavLink} to="/login">
										Log in
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link as={NavLink} to="/signup">
										Sign Up
									</Nav.Link>
								</Nav.Item>
							</React.Fragment>
						) : (
							// if a user is logged in, show /profile, /bookmarks
							<React.Fragment>
								<Nav.Item>
									<Nav.Link as={NavLink} activeclassname="active" to="/bookmarks">
										Bookmarks
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link as={NavLink} activeclassname="active" to="/profile">
										Profile
									</Nav.Link>
								</Nav.Item>

								<Nav.Item>
									<Nav.Link as={NavLink} activeclassname="active" to="/" onClick={logout}>
										Log out
									</Nav.Link>
								</Nav.Item>
							</React.Fragment>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
