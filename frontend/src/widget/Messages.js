import React from 'react'
import { Alert } from 'react-bootstrap'

const Messages = ({ variant, text }) => {
	return (
		<div>
			<Alert variant={variant}>{text}</Alert>
		</div>
	)
}

export default Messages
