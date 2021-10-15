import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRotes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()
const app  = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json()) //allow to accept json data

app.use('/api/orders', orderRotes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname))) // __dirname: current directory
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))) //* any of the API routes in server.js
} else {
    app.get('/', (req, res)=>{
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 


