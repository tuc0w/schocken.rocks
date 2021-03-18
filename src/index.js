// ./src/index.js
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const database = require("./services/mongodb");

const PORT = process.env.PORT || 3001;

// create express app
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

// defining endpoints
app.use("/dice", routes.dice);
app.use("/games", routes.games);
app.use("/player", routes.player);

// define swagger definition
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
    basePath: "/",
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/dice.js", "./src/routes/games.js", "./src/routes/player.js"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

database.connect().then(async () => {
    app.listen(3001, async () => {
        console.log("listening on port 3001");
    });
});
