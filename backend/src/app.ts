import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser'
import cors from 'cors'


// middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }))
app.use(cookieParser())

const test = async (req: Request, res: Response) => {
    // const a = 10;
    // res.send(10)
    Promise.reject()
}

app.get('/', test)


// app.get('/', (req, res) => {
//     res.send('Welcome to my world!')
// })
// api endpoints
app.use('/api/v1', router)


// error handler
app.use(globalErrorHandler)

// 404 page
app.use(notFound)

export default app;