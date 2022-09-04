const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/dbCon')
const productRoute = require('./routes/productRoutes')
const orderRoute = require('./routes/orderRoute')
const userRoute = require('./routes/userRoute')
dotenv.config()
connectDB()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Api is Running')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use((req, res) => {
	res.status(404).json({ message: `Not Found ${req.originalUrl}` })
})
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.listen(8080, console.log(`server on mode ${process.env.NODE_ENV} on port ${process.env.PORT}`))
