import {
	MY_ORDERLIST_FAIL,
	MY_ORDERLIST_REQUEST,
	MY_ORDERLIST_RESET,
	MY_ORDERLIST_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS
} from '../constant/orderConstant'

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true }
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload }
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const orderDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true }
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload }
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true }
		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true, order: action.payload }
		case ORDER_PAY_FAIL:
			return { loading: false, error: action.payload }
		case ORDER_PAY_RESET:
			return {}
		default:
			return state
	}
}
export const myOrderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case MY_ORDERLIST_REQUEST:
			return { loading: true }
		case MY_ORDERLIST_SUCCESS:
			return { loading: false, success: true, orders: action.payload }
		case MY_ORDERLIST_FAIL:
			return { loading: false, error: action.payload }
		case MY_ORDERLIST_RESET:
			return { orders: [] }
		default:
			return state
	}
}
