import express from 'express';
// import express-session from 'express-session';
import dotenv from 'dotenv';
import axios from 'axios';
import controllers from './controllers.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/parks', (req, res) => {
  controllers.getParks(req, res);
});

app.get('/park/:id', (req, res) => {
  controllers.getPark(req, res);
});

app.get('/parkNames', (req, res) => {
  controllers.getParkNames(req, res);
})

app.put('/saved/:id', (req, res) => {
  controllers.savePark(req, res);
})

app.put('/visited/:id', (req, res) => {
  controllers.markVisited(req, res);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
