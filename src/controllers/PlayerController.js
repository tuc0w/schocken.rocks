// ./src/controllers/PlayerController.js
const { Player } = require("../models");

const PlayersController = {
    async insert(player) {
        const newPlayer = new Player(player);
        const insertId = await newPlayer.save();
        return insertId;
    },

    async findAll() {
        const players = await Player.find().populate("game");
        return players;
    },

    async findById(id) {
        const player = await Player.findById(id).populate("game");
        return player;
    },
};

module.exports = PlayersController;
