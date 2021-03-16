// ./src/database/models/game.js
const mongoose = require("mongoose");

const gameModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: "{PATH} is required!",
        },
        player: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Game", gameModel);
