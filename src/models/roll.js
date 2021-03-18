// ./src/models/player.js
const mongoose = require("mongoose");

const rollModel = mongoose.Schema(
    {
        dice: [
            {
                eyes: {
                    type: Number,
                    required: "{PATH} is required!",
                },
                discarded: {
                    type: Boolean,
                    required: "{PATH} is required!",
                },
            },
        ],
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
        },
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Roll", rollModel);
