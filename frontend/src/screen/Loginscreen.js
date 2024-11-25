import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Messages from '../widget/Messages'
import Loader from '../widget/Loader'
import { userLoginAction } from '../actions/userActions'
import FormContainer from '../widget/FormContainer'

const Loginscreen = () => {
	const history = useNavigate()
	const dispatch = useDispatch()
	const [ searchParams ] = useSearchParams()
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const userLogin = useSelector((state) => state.userLogin)
	const { error, loading, userInfo } = userLogin
	const redirect = searchParams.get('redirect')
	useEffect(
		() => {
			if (userInfo && redirect) {
				history('/shipping')
			} else if (userInfo) {
				history('/')
			}
		},
		[ userInfo, history, redirect ]
	)
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(userLoginAction(email, password))
	}
	return (
		<FormContainer>
			{loading ? <Loader /> : error ? <Messages variant="danger" text={error} /> : <Container />}
			<Form onSubmit={submitHandler}>
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
					<Form.Label>Password Address</Form.Label>
					<Form.Control
						type="password"
						placeholder="enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="dark" className="my-3">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer? <Link to="/register">Register</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default Loginscreen
