import React, { useState, useEffect } from 'react'
import { Col, ListGroup, Row, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, orderPayActions } from '../actions/orderActions'
import Messages from '../widget/Messages'
import Loader from '../widget/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constant/orderConstant'

const OrderScreen = () => {
	const [ sdkReady, setSdkReady ] = useState(false)
	const { id } = useParams()
	const dispatch = useDispatch()
	const orderDetail = useSelector((state) => state.orderDetail)
	const { order, error } = orderDetail

	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay } = orderPay

	useEffect(
		() => {
			dispatch({
				type: ORDER_PAY_RESET
			})
			dispatch(getOrderDetails(id))
			const addPayPalScript = () => {
				const script = document.createElement('script')
				script.type = 'text/javascript'
				script.src = `https://www.paypal.com/sdk/js?client-id=AWXyhqaou42l4s8zErt5_Us_lqqa6ZgxW4qSAG5DWtLfOvRqHDkVzJrWZKAa-oxwVXC5MPzA8rJmG2s8`
				script.async = true
				script.onload = () => {
					setSdkReady(true)
				}
				document.body.appendChild(script)
			}

			if (!window.paypal) {
				addPayPalScript()
			} else {
				setSdkReady(true)
			}
		},
		[ dispatch, id ]
	)
	const successPaymentHandler = (paymentResult) => {
		dispatch(orderPayActions(order._id, paymentResult))
	}
	return !order ? (
		<Loader />
	) : (
		<div>
			<h1>ORDER: {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping Address</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong> {order.user.email}
							</p>
							<p>
								<strong>Address: </strong> {order.shippingAddress.address},{' '}
								{order.shippingAddress.city},
								{order.shippingAddress.postalCode}, {order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Messages variant="success" text="success delivered" />
							) : (
								<Messages variant="danger" text="Not Delivered" />
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong> {order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Messages variant="success" text="payment success" />
							) : (
								<Messages variant="danger" text="Not Paid" />
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Messages variant="info" text="Your cart is empety" />
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((el, id) => (
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
									<Col> ${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax: </Col>
									<Col> ${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping: </Col>
									<Col> ${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total: </Col>
									<Col> ${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{error && (
								<ListGroup.Item>
									<Messages variant="danger" text={error} />
								</ListGroup.Item>
							)}

							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default OrderScreen
