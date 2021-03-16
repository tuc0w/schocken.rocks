// ./src/index.js
const routes = require('./routes');

// importing the dependencies
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// database dependencies
const database = require("./database/mongo");

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining endpoints
app.use('/dice', routes.dice);
app.use('/games', routes.games);
app.use('/player', routes.player);

// start the in-memory MongoDB instance
database.connect().then(async () => {
    // start the server
    app.listen(3001, async () => {
        console.log("listening on port 3001");
    });
});
