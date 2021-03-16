// ./src/database/models/player.js
const mongoose = require("mongoose");

const playerModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: "{PATH} is required!",
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
        },
        rolls: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Roll",
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Player", playerModel);
