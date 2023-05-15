import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Renders a Login Form. 
 * 
 * - The UI will display an error message if a user's login credentials are incorrect.
 * 
*/

const LoginForm = ({ login }) => {
	const [ isSuccess, setIsSuccess ] = useState(false);
	const [ validated, setValidated ] = useState(false);
	const navigate = useNavigate();
	const [ formData, setFormData ] = useState({ username: '', password: '' });
	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			if (isSuccess) {
				navigate('/', { replace: true });
			}
		},
		[ isSuccess, navigate ]
	);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const form = evt.currentTarget;
		setValidated(true);

		if (form.checkValidity() === false) {
			evt.stopPropagation();
			return;
		}

		const loginRes = await login(formData);
		setIsSuccess(loginRes.success);

		if (!loginRes.success) {
			console.error('Failed to login:', loginRes.error);
			setError('Incorrect username or password');
		} else {
			setError(null);
		}
	};

	return (
		<div className="SignupForm">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={10} md={8} lg={6}>
						<Card>
							<Card.Body>
								<h2 className="mb-3">Log In</h2>
								{error ? <div className="alert alert-danger">{error}</div> : null}
								<Form noValidate validated={validated} onSubmit={handleSubmit}>
									<Form.Group className="mb-3">
										<Form.Label htmlFor="username">Username</Form.Label>
										<Form.Control
											id="username"
											type="text"
											aria-label="username"
											name="username"
											value={formData.username}
											onChange={handleChange}
											autoComplete="username"
											required
											className="form-control-sm"
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label htmlFor="password">Password</Form.Label>
										<Form.Control
											id="password"
											type="password"
											aria-label="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											autoComplete="current-password"
											required
											className="form-control-sm"
										/>
									</Form.Group>

									<Button variant="primary" type="submit">
										Login
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginForm;
