import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS
} from '../constant/userConstant'
import axios from 'axios'
import { MY_ORDERLIST_RESET } from '../constant/orderConstant'

export const userLoginAction = (email, password) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST
		})
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { data } = await axios.post('/api/users/login', { email, password }, config)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		})
		localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}

export const userLogoutAction = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({
		type: USER_LOGOUT
	})
	dispatch({
		type: MY_ORDERLIST_RESET
	})
}

export const userRegsisterAction = (name, email, password) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST
		})
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		const { data } = await axios.post('/api/users', { name, email, password }, config)
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data
		})
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		})
		localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}

export const updateProfileAction = (dataBody) => async (dispatch, getState) => {
	var { userInfo } = getState().userLogin
	try {
		dispatch({
			type: USER_UPDATE_REQUEST
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		const { data } = await axios.put('/api/users/profile', dataBody, config)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: { ...data, token: userInfo.token }
		})
		dispatch({
			type: USER_UPDATE_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response.data.message ? error.response.data.message : error.message
		})
	}
}
