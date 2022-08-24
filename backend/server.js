const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/dbCon')
const productRoute = require('./routes/productRoutes')
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
app.use((req, res) => {
	res.status(404).json({ message: `Not Found ${req.originalUrl}` })
})

app.listen(8080, console.log(`server on mode ${process.env.NODE_ENV} on port ${process.env.PORT}`))
