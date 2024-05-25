import express from 'express';
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to my world!')
})

export default app;