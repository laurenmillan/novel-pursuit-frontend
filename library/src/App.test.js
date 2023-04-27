import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

test('renders', () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
});
