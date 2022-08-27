import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../widget/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckOutSteps from '../widget/CheckOutSteps'

const Paymentscreen = () => {
	const dispatch = useDispatch()
	const history = useNavigate()
	const cart = useSelector((state) => state.cart)
	const [ paymentMethod, setPaymentMethod ] = useState('PayPal')
	const { shippingAddress } = cart
	if (!shippingAddress) {
		history('/shipping')
	}
	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(savePaymentMethod(paymentMethod))
		history('/placeorder')
	}
	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal"
							id="PayPal"
							value="PayPal"
							name="paymentMethod"
							defaultChecked
							onClick={(e) => setPaymentMethod(e.target.value)}
						/>
						<Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							value="Stripe"
							name="paymentMethod"
							onClick={(e) => setPaymentMethod(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Button type="submit" variant="dark" className="my-3">
					Next
				</Button>
			</Form>
		</FormContainer>
	)
}

export default Paymentscreen
