import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupForm from '../SignupForm';
import fetchMock from 'jest-fetch-mock';

/** Signup form tests. 
 * 
 * - Test that the form renders.
 * - Test that the form renders the expected elements.
 * - Test that the form allows a new user to signup successfully.
 * 
 */

test('renders', () => {
	render(
		<BrowserRouter>
			<SignupForm />
		</BrowserRouter>
	);
});

test('renders login form', () => {
	const { getAllByText } = render(
		<BrowserRouter>
			<SignupForm />
		</BrowserRouter>
	);
	const loginElements = getAllByText('Sign Up!');
	loginElements.forEach((element) => {
		expect(element).toBeInTheDocument();
	});
});

test('signs up new user successfully', async () => {
	// Mock a successful signup response
	fetchMock.mockResponseOnce(
		JSON.stringify({
			success: true,
			token: 'example-token'
		})
	);
	render(
		<BrowserRouter>
			<SignupForm />
		</BrowserRouter>
	);
	fireEvent.change(screen.getByLabelText('Username'), {
		target: { value: 'user1' }
	});
	fireEvent.change(screen.getByLabelText('Password'), {
		target: { value: 'password' }
	});
	fireEvent.change(screen.getByLabelText('firstName'), {
		target: { value: 'firstName' }
	});
	fireEvent.change(screen.getByLabelText('lastName'), {
		target: { value: 'lastName' }
	});
	fireEvent.change(screen.getByLabelText('email'), {
		target: { value: 'email' }
	});
});

test('does not submit form when required fields are empty', async () => {
	// Mock a successful signup response
	fetchMock.mockResponseOnce(
		JSON.stringify({
			success: true,
			token: 'example-token'
		})
	);
	render(
		<BrowserRouter>
			<SignupForm />
		</BrowserRouter>
	);
	fireEvent.click(screen.getByRole('button', { name: 'Sign Up!' }));
});

test('does not submit form when password is too short', async () => {
	render(
		<BrowserRouter>
			<SignupForm signup={async () => ({ success: false })} />
		</BrowserRouter>
	);

	fireEvent.change(screen.getByLabelText('Password'), {
		target: { value: '1234' }
	});
	fireEvent.click(screen.getByText('Sign Up!'));

	expect(await screen.findByText('Password must be at least 5 characters.')).toBeInTheDocument();
});

test('displays error message when username or email already exists', async () => {
	render(
		<BrowserRouter>
			<SignupForm
				signup={() => {
					return Promise.reject({
						response: {
							status: 409
						}
					});
				}}
			/>
		</BrowserRouter>
	);
	fireEvent.change(screen.getByLabelText('Username'), {
		target: { value: 'existing_user' }
	});
	fireEvent.change(screen.getByLabelText('Password'), {
		target: { value: 'password' }
	});
	fireEvent.change(screen.getByLabelText('firstName'), {
		target: { value: 'firstName' }
	});
	fireEvent.change(screen.getByLabelText('lastName'), {
		target: { value: 'lastName' }
	});
	fireEvent.change(screen.getByLabelText('email'), {
		target: { value: 'email' }
	});
	fireEvent.click(screen.getByText('Sign Up!'));
});
