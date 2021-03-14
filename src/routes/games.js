// ./src/routes/games.js
const { Router } = require('express');

const { insertGame, getGames } = require("../database/games");
const { deleteGame, updateGame } = require("../database/games");

const router = Router();

router.get("/", async (req, res) => {
    res.send(await getGames());
});

router.post("/", async (req, res) => {
    const newGame = req.body;
    await insertGame(newGame);
    res.send({ message: "New game inserted." });
});

// endpoint to delete an ad
router.delete("/:id", async (req, res) => {
    await deleteGame(req.params.id);
    res.send({ message: "Game removed." });
});

// endpoint to update an ad
router.put("/:id", async (req, res) => {
    const updatedGame = req.body;
    await updateGame(req.params.id, updatedGame);
    res.send({ message: "Game updated." });
});

module.exports = router;
