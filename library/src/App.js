import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LibraryApi from './api/api';

import './App.css';

function App() {
	const [ data, setData ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState('');

	useEffect(() => {
		setLoading(true);
		fetch('https://openlibrary.org/search.json?author=tolkien&sort=new')
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((error) => setError(error));
	}, []);

	if (loading) {
		return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}
	if (!data) {
		return null;
	}

	let array = data.docs;

	return (
		<div className="container">
			<ul>
				{array.map((item, i) => {
					return (
						<li key={i}>
							<i className="fa fa=book" />
							&nbsp;
							{item.title}
						</li>
					);
				})}
			</ul>
		</div>
	);

	//console.log(data.docs[0].title);
}

export default App;
