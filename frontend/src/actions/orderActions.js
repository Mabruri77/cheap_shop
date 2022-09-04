import {
	MY_ORDERLIST_FAIL,
	MY_ORDERLIST_REQUEST,
	MY_ORDERLIST_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS
} from '../constant/orderConstant'
import axios from 'axios'
export const createOrder = (dataBody) => async (dispatch, getState) => {
	var { userInfo } = getState().userLogin
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const { data } = await axios.post('/api/orders', dataBody, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data
		})
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}
export const getOrderDetails = (id) => async (dispatch, getState) => {
	var { userInfo } = getState().userLogin
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST
		})
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}
export const orderPayActions = (id, paymentResult) => async (dispatch, getState) => {
	var { userInfo } = getState().userLogin
	try {
		dispatch({
			type: ORDER_PAY_REQUEST
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}
export const myOrderListAction = (id, paymentResult) => async (dispatch, getState) => {
	var { userInfo } = getState().userLogin
	try {
		dispatch({
			type: MY_ORDERLIST_REQUEST
		})
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const { data } = await axios.get('/api/orders/myorder', config)

		dispatch({
			type: MY_ORDERLIST_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: MY_ORDERLIST_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}
