// ./src/database/mongo.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function connect() {
    const mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(mongoUri, mongooseOpts, err => {
        if (err) {
            console.error(err);
        }
    });
}

async function close() {
    await mongoose.disconnect();
    await mongoServer.stop();
}

async function clear() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

mongoose.connection.on("connected", function () {
    console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
});

module.exports = {
    connect,
    close,
    clear,
};
