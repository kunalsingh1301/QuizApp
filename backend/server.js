import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conection.js';
import cookieParser from 'cookie-parser';
import routerauth from './router/authRoute.js'
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
config();

const port = process.env.PORT || 8080;

// Routes
app.use('/api', router);
app.use('/auth',routerauth)

app.get('/', (req, res) => {
    res.json('welcome');
});

connect().then(()=>{
    try {
        app.listen(port, () => {
            console.log('Listening on', port);
        });
    } catch (error) {
        console.log('can not connet to server')
    }
}).catch(error=>{
    console.log("Invalid DB Connection")
})
