import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../widget/FormContainer'
import { addShippingAdress } from '../actions/cartActions'
import CheckOutSteps from '../widget/CheckOutSteps'
import { useNavigate } from 'react-router-dom'

const Shippingscreen = () => {
	const dispatch = useDispatch()
	const history = useNavigate()
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	const [ address, setAddress ] = useState(shippingAddress.address)
	const [ city, setCity ] = useState(shippingAddress.city)
	const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode)
	const [ country, setCountry ] = useState(shippingAddress.country)
	const submitHandler = (e) => {
		e.preventDefault()
		if (address && city && postalCode && country) {
			dispatch(addShippingAdress({ address, city, postalCode, country }))
			history('/payment')
		}
	}
	return (
		<FormContainer>
			<CheckOutSteps step1 step2 />
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="Address" className="my-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="enter Addresss"
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="City" className="my-3">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="enter city"
						required
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="PostalCode" className="my-3">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="enter PostalCode"
						required
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="Country" className="my-3">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="enter Country"
						required
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" variant="dark" className="my-3">
					Next
				</Button>
			</Form>
		</FormContainer>
	)
}

export default Shippingscreen
