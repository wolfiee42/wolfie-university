import express from 'express';
import { userRouter } from './app/modules/user/04.user.route';
import { StudentRoutes } from './app/modules/student/04.student.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express();

// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my world!')
})

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', userRouter)


// error handler
app.use(globalErrorHandler)

// 404 page
app.use(notFound)

export default app;