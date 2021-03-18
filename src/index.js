// ./src/index.js
const routes = require("./routes");

// importing the dependencies
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// import swagger dependencies
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// database dependencies
const database = require("./services/mongodb");

const PORT = process.env.PORT || 3001;

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
app.use("/dice", routes.dice);
app.use("/games", routes.games);
app.use("/player", routes.player);

// define swagger options
const swaggerDefinition = {
    info: {
        title: "Schocken.rocks Express API with Swagger",
        version: "1.0.0",
        description: "This is the Schocken.rocks API made with Express and documented with Swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
    },
    host: `localhost:${PORT}`,
    basePath: '/', 
}
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    apis: ["./src/routes/player.js"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// start the in-memory MongoDB instance
database.connect().then(async () => {
    // start the server
    app.listen(3001, async () => {
        console.log("listening on port 3001");
    });
});
