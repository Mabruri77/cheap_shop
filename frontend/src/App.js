import Header from './widget/Header'
import Footer from './widget/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Homescreen from './screen/Homescreen'
import Productscreen from './screen/Productscreen'
import Cartscreen from './screen/Cartscreen'
import Loginscreen from './screen/Loginscreen'
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
							<Route path="/cart/:id*" element={<Cartscreen />} />
							<Route path="/login" element={<Loginscreen />} />
						</Routes>
					</Container>
				</main>
				<Footer />
			</Router>
		</div>
	)
}

export default App
