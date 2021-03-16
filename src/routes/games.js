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

// // endpoint to delete an ad
// router.delete("/:id", async (req, res) => {
//     await deleteGame(req.params.id);
//     res.send({ message: "Game removed." });
// });

// // endpoint to update an ad
// router.put("/:id", async (req, res) => {
//     const updatedGame = req.body;
//     await updateGame(req.params.id, updatedGame);
//     res.send({ message: "Game updated." });
// });

module.exports = router;
