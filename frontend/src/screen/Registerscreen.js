import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Messages from '../widget/Messages'
import Loader from '../widget/Loader'
import { userRegsisterAction } from '../actions/userActions'
import FormContainer from '../widget/FormContainer'

const Loginscreen = () => {
	const history = useNavigate()
	const dispatch = useDispatch()
	const [ email, setEmail ] = useState('')
	const [ name, setName ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ message, setMessage ] = useState('')
	const userRegister = useSelector((state) => state.userRegister)
	const { error, loading, userInfo } = userRegister

	useEffect(
		() => {
			if (userInfo) {
				history('/')
			}
		},
		[ userInfo, history ]
	)
	const submitHandler = (e) => {
		e.preventDefault()
		if (password === confirmPassword) {
			dispatch(userRegsisterAction(name, email, password))
		} else {
			setMessage("password and confirm password doesn't match")
		}
	}
	return (
		<FormContainer>
			{loading ? <Loader /> : error ? <Messages variant="danger" text={error} /> : <Container />}
			{message && <Messages variant="danger" text={message} />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name" className="my-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email" className="my-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="enter email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password" className="my-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="confirmPassword" className="my-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="enter confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="dark" className="my-3">
					Sign Up
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Already Have Account? <Link to="/login">Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default Loginscreen
