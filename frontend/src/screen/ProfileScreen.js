import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Messages from '../widget/Messages'
import Loader from '../widget/Loader'
import { updateProfileAction } from '../actions/userActions'

const Profilescreen = () => {
	const history = useNavigate()
	const dispatch = useDispatch()
	const [ email, setEmail ] = useState('')
	const [ name, setName ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ message, setMessage ] = useState('')
	const userLogin = useSelector((state) => state.userLogin)
	const { error, loading, userInfo } = userLogin

	useEffect(
		() => {
			if (!userInfo) {
				history('/')
			} else {
				setName(userInfo.name)
				setEmail(userInfo.email)
			}
		},
		[ userInfo, history ]
	)
	const submitHandler = (e) => {
		e.preventDefault()
		if (password === confirmPassword && name && email) {
			dispatch(updateProfileAction({ name, email, password }))
		} else {
			setMessage('please add true data')
		}
	}
	return (
		<div>
			<Row>
				<Col md={3}>
					{loading ? (
						<Loader />
					) : error ? (
						<Messages variant="danger" text={error} />
					) : (
						<Container />
					)}
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
							Update
						</Button>
					</Form>
				</Col>
				<Col md={9}>
					<h2>My Order</h2>
				</Col>
			</Row>
		</div>
	)
}

export default Profilescreen
