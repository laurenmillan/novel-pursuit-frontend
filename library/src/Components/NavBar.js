import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

/** Displays dynamic navbar components. */

function NavBar() {
	return (
		<div>
			<Navbar expand="md" className="custom-navbar">
				<Navbar.Brand as={NavLink} to="/">
					Novel Pursuit
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					<Nav className="ml-auto" navbar>
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

						{/* TODO: display navbar to show Bookmarks link only on login */}
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
							<Nav.Link as={NavLink} activeclassname="active" to="/">
								Log out
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavBar;
