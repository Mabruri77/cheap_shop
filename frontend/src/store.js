import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducers, productListReducers } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userRegisterReducer, userUpdateProfile } from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducer'
const cartItemFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: null
const initState = {
	cart: {
		cartItems: cartItemFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage
	},
	userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [ thunk ]
const reducer = combineReducers({
	productList: productListReducers,
	productDetail: productDetailReducers,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	updateProfile: userUpdateProfile,
	orderCreate: orderCreateReducer,
	orderDetail: orderDetailsReducer,
	orderPay: orderPayReducer
})
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
