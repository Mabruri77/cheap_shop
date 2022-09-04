import React, { useEffect } from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckOutSteps from '../widget/CheckOutSteps'
import Messages from '../widget/Messages'

const PlaceOrderScreen = () => {
	const dispatch = useDispatch()
	const history = useNavigate()
	const cart = useSelector((state) => state.cart)
	const { cartItems, shippingAddress, paymentMethod } = cart
	const itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	const shippingPrice = itemPrice > 100 ? 0 : 100
	const taxPrice = (Number(itemPrice) * 0.15).toFixed(2)
	const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
	const orderCreate = useSelector((state) => state.orderCreate)
	const { success, order, error } = orderCreate
	useEffect(
		() => {
			if (success) {
				history(`/order/${order._id}`)
			}
		},
		[ success, history, order ]
	)
	const orderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: itemPrice,
				taxPrice: taxPrice,
				shippingPrice: shippingPrice,
				totalPrice: totalPrice
			})
		)
	}
	return (
		<div>
			<CheckOutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping Address</h2>
							<p>
								<strong>Address: </strong> {shippingAddress.address}, {shippingAddress.city},{' '}
								{shippingAddress.postalCode}, {shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong> {paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Messages variant="info" text="Your cart is empety" />
							) : (
								<ListGroup variant="flush">
									{cartItems.map((el, id) => (
										<ListGroup.Item key={id}>
											<Row>
												<Col md={1}>
													<Image src={el.image} alt={el.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${el.product}`}>{el.name}</Link>
												</Col>
												<Col md={4}>
													{el.qty} X {el.price} = {el.qty * el.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items: </Col>
									<Col> ${itemPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax: </Col>
									<Col> ${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping: </Col>
									<Col> ${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total: </Col>
									<Col> ${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{error && (
								<ListGroup.Item>
									<Messages variant="danger" text={error} />
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<div className="d-grid gap-2">
									<Button
										onClick={orderHandler}
										variant="dark"
										size="lg"
										disabled={cartItems.length === 0 ? true : false}
									>
										Place Order
									</Button>
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default PlaceOrderScreen
