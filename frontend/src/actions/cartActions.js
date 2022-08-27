import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SHIPPING_ADDRESS,
	SAVE_PAYMENT_METHOD
} from '../constant/cartConstant'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)
	dispatch(
		{
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty: qty
			}
		},
		[ dispatch, id, qty ]
	)

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItem = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAdress = (data) => (dispatch) => {
	dispatch({
		type: CART_SHIPPING_ADDRESS,
		payload: data
	})
	localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: SAVE_PAYMENT_METHOD,
		payload: data
	})
	localStorage.setItem('paymentMethod', JSON.stringify(data))
}
