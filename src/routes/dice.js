// ./src/routes/dice.js
const { Router } = require('express');
const { Roll } = require('../database/models');
const { GamesController, PlayerController } = require("../controllers");

const router = Router();

router.get("/:playerId/:gameId/:diceToRoll", async (req, res) => {
    const diceToRoll = req.params.diceToRoll;
    const gameId = req.params.gameId;
    const playerId = req.params.playerId;

    const player = await PlayerController.findById(playerId);
    // const game = await GamesController.findById(gameId);

    let rolledDiceModel = new Roll({
        dice: [],
        game: gameId,
        player: playerId,
    });

    for (i = 0; i < diceToRoll; i++) {
        let dice = {
            eyes: Math.floor(Math.random() * 6) + 1,
            discarded: false
        };
        rolledDiceModel.dice = [...rolledDiceModel.dice, dice];
    }

    await rolledDiceModel.save();
    player.rolls.push(rolledDiceModel)
    await player.save();

    res.send(rolledDiceModel);
});

module.exports = router;
