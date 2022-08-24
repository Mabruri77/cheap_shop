import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT
} from '../constant/userConstant'
import axios from 'axios'

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
}
