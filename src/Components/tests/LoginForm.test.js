import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../LoginForm';
import fetchMock from 'jest-fetch-mock';

/** Login form tests. 
 * 
 * - Test that the form renders.
 * - Test that the form renders the expected elements.
 * - Test that the form logs in a user successfully.
 * - Test that the form shows an error message for an invalid login.
 * 
 */

test('renders', () => {
	render(
		<BrowserRouter>
			<LoginForm />
		</BrowserRouter>
	);
});

test('renders login form', () => {
	const { getAllByText } = render(
		<BrowserRouter>
			<LoginForm />
		</BrowserRouter>
	);
	const loginElements = getAllByText('Login');
	loginElements.forEach((element) => {
		expect(element).toBeInTheDocument();
	});
});

test('logs in user successfully', async () => {
	// Mock a successful login response
	fetchMock.mockResponseOnce(
		JSON.stringify({
			success: true,
			token: 'example-token'
		})
	);
	render(
		<BrowserRouter>
			<LoginForm />
		</BrowserRouter>
	);
	fireEvent.change(screen.getByLabelText('Username'), {
		target: { value: 'user1' }
	});
	fireEvent.change(screen.getByLabelText('Password'), {
		target: { value: 'password' }
	});
});

test('shows error message for invalid login', async () => {
	// Mock an unsuccessful login response
	fetchMock.mockResponseOnce(
		JSON.stringify({
			success: false
		})
	);
	render(
		<BrowserRouter>
			<LoginForm login={async () => ({ success: false })} />
		</BrowserRouter>
	);
	fireEvent.change(screen.getByLabelText('username'), {
		target: { value: 'user1' }
	});
	fireEvent.change(screen.getByLabelText('password'), {
		target: { value: 'wrong-password' }
	});
	fireEvent.click(screen.getByText('Login'));

	await screen.findByText('Incorrect username or password');

	expect(screen.getByText('Incorrect username or password')).toBeInTheDocument();
});
