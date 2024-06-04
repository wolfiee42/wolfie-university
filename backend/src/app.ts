import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

// middleware
app.use(express.json());

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