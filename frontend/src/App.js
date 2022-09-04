import Header from './widget/Header'
import Footer from './widget/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Homescreen from './screen/Homescreen'
import Productscreen from './screen/Productscreen'
import Cartscreen from './screen/Cartscreen'
import Loginscreen from './screen/Loginscreen'
import Registerscreen from './screen/Registerscreen'
import Profilescreen from './screen/ProfileScreen'
import Shippingscreen from './screen/Shippingscreen'
import Paymentscreen from './screen/Paymentscreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
function App() {
	return (
		<div>
			<Router>
				<Header />
				<main className="my-3">
					<Container>
						<Routes>
							<Route path="/" element={<Homescreen />} />
							<Route path="/product/:id" element={<Productscreen />} />
							<Route path="/cart/*" element={<Cartscreen />} />
							<Route path="/cart/:id" element={<Cartscreen />} />
							<Route path="/login" element={<Loginscreen />} />
							<Route path="/register" element={<Registerscreen />} />
							<Route path="/profile" element={<Profilescreen />} />
							<Route path="/shipping" element={<Shippingscreen />} />
							<Route path="/payment" element={<Paymentscreen />} />
							<Route path="/placeorder" element={<PlaceOrderScreen />} />
							<Route path="/order/:id" element={<OrderScreen />} />
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
		</div>
	)
}

export default App
