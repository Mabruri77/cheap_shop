import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../widget/Product'
import { productListAction } from '../actions/productActions'
import Loader from '../widget/Loader'
import Messages from '../widget/Messages'

const Homescreen = () => {
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { error, products, loading } = productList

	useEffect(
		() => {
			dispatch(productListAction())
		},
		[ dispatch ]
	)
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Messages variant="danger" text={error} />
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	)
}

export default Homescreen
