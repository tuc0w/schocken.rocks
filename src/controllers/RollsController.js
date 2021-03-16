const { Roll } = require("../database/models");

const RollsController = {
    async insert(roll) {
        const newRoll = new Roll(roll);
        const insertId = await newRoll.save();
        return insertId;
    },

    async findAll() {
        const rolls = await Roll.find().populate("game").populate("player");
        return rolls;
    },

    async findById(id) {
        const roll = await Roll.findById(id).populate("game").populate("player");
        return roll;
    },
};

module.exports = RollsController;
