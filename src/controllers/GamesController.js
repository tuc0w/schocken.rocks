const { Game } = require("../models");

const GamesController = {
    async insert(games) {
        const newGame = new Game(games);
        const insertId = await newGame.save();
        return insertId;
    },

    async findAll() {
        const games = await Game.find().populate("player");
        return games;
    },

    async findById(id) {
        const game = await Game.findById(id).populate("player");
        return game;
    },
};

module.exports = GamesController;
