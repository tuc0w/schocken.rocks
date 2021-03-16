// ./src/routes/games.js
const { Router } = require("express");
const { PlayerController } = require("../controllers");

const router = Router();

router.get("/", async (req, res) => {
    res.send(await PlayerController.findAll());
});

router.get("/:id", async (req, res) => {
    res.send(await PlayerController.findById(req.params.id));
});

router.post("/", async (req, res) => {
    const newPlayer = req.body;
    let player = await PlayerController.insert(newPlayer);

    res.send({
        message: "New player created.",
        player: player,
    });
});

// // endpoint to delete an ad
// router.delete("/:id", async (req, res) => {
//     await deletePlayer(req.params.id);
//     res.send({ message: "Player removed." });
// });

// // endpoint to update an ad
// router.put("/:id", async (req, res) => {
//     const updatedPlayer = req.body;
//     await updatePlayer(req.params.id, updatedPlayer);
//     res.send({ message: "Player updated." });
// });

module.exports = router;
