import express, { Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
import authRoutes from './auth/authRoutes';
import activityRoutes from './activities/activityRoutes';
import tagRoutes from './tags/tagRoutes';
import userRoutes from './user/userRoutes';
import env from "dotenv"


env.config();

const app = express();
const port = process.env.SERVER_PORT;


app.use(bodyParser.json());

//CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(authRoutes);
app.use('/activities', activityRoutes);
app.use('/tags', tagRoutes)
app.use('/user', userRoutes)

// Custom error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ error: message })
})

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});