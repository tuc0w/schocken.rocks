// ./src/routes/games.js
const { Router } = require("express");
const { GamesController } = require("../controllers");

const router = Router();

router.get("/", async (req, res) => {
    res.send(await GamesController.findAll());
});

router.get("/:id", async (req, res) => {
    res.send(await GamesController.findById(req.params.id));
});

router.post("/", async (req, res) => {
    const newGame = req.body;
    let game = await GamesController.insert(newGame);

    res.send({
        message: "New game created.",
        game: game,
    });
});

module.exports = router;
