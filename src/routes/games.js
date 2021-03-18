// ./src/routes/games.js
const { Router } = require("express");
const { GamesController } = require("../controllers");

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API to manage game models.
 *
 * definitions:
 *   Game:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         description: The auto-generated id of the player.
 *       name:
 *         type: string
 *         description: The name of the player.
 *       player:
 *         type: array
 *         description: The players is attending this game.
 *         items:
 *           $ref: '#/definitions/Player'
 *       createdAt:
 *         type: string
 *         format: date
 *         description: The date of the record creation.
 *     example:
 *       name: Test Game
 */

/**
 * @swagger
 * /games:
 *   get:
 *     description: Retrieve a list of games.
 *     tags: [Games]
 *     responses:
 *       "200":
 *         description: All registered games.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Game'
 */
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
