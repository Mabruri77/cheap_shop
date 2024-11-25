import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../widget/Rating'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { productDetailAction } from '../actions/productActions'
import Loader from '../widget/Loader'
import Messages from '../widget/Messages'
const Productscreen = () => {
	const history = useNavigate()
	const [ qty, setQty ] = useState(1)
	const { id } = useParams()
	const dispatch = useDispatch()
	const productDetail = useSelector((state) => state.productDetail)
	const { error, loading, product } = productDetail
	useEffect(
		() => {
			dispatch(productDetailAction(id))
		},
		[ id, dispatch ]
	)
	const addToCartHandler = () => {
		history(`/cart/${id}?qty=${qty}`)
	}
	return (
		<div>
			<Link className="btn btn-dark my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Messages variant="danger" text={error} />
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>Description: {product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty: </Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[ ...Array(product.countInStock).keys() ].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<div className="d-grid gap-2">
										<Button
											onClick={addToCartHandler}
											variant="dark"
											size="lg"
											disabled={product.countInStock > 0 ? false : true}
										>
											Add To Cart
										</Button>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default Productscreen
