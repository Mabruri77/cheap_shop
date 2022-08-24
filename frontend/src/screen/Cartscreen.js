import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ListGroup, Row, Col, Image, Form, Button, Card } from 'react-bootstrap'
import Messages from '../widget/Messages'
import { addToCart, removeItem } from '../actions/cartActions'

const Cartscreen = () => {
	const { id } = useParams()
	const history = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const [ searchParams ] = useSearchParams()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const qty = Number(searchParams.get('qty'))
	useEffect(
		() => {
			dispatch(addToCart(id, qty))
		},
		[ id, qty, dispatch ]
	)
	const removeFromCartHandler = (id) => {
		dispatch(removeItem(id))
	}
	const checkOutHandler = () => {
		if (userInfo) {
			history('/shipping')
		} else {
			history('/login?redirect=shipping')
		}
	}
	return (
		<Row>
			<Col md={8}>
				{cartItems.length === 0 ? (
					<div>
						<Link className="btn btn-dark my-3" to="/">
							Go back
						</Link>
						<Messages variant="info" text="your cart is empety" />
					</div>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
										>
											{[ ...Array(item.countInStock).keys() ].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="dark"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash" />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
							${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
						</ListGroup.Item>
						<ListGroup.Item>
							<div className="d-grid gap-2">
								<Button
									onClick={checkOutHandler}
									variant="dark"
									size="lg"
									disabled={cartItems.length === 0 ? true : false}
								>
									Check Out
								</Button>
							</div>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default Cartscreen
