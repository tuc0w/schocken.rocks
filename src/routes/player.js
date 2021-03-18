// ./src/routes/games.js
const { Router } = require("express");
const { PlayerController } = require("../controllers");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: API to manage player models.
 * 
 * definitions:
 *   Player:
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
 *       game:
 *         type: string
 *         description: The game the player is attending.
 *       rolls:
 *         type: array
 *         items:
 *           id:
 *             type: integer
 *         description: The dice rolls the player has made.
 *       createdAt:
 *         type: string
 *         format: date
 *         description: The date of the record creation.
 *     example:
 *       name: tuc0w
 */

/**
 * @swagger
 * /player:
 *   get:
 *     description: Retrieve a list of players.
 *     tags: [Player]
 *     responses:
 *       "200":
 *         description: All registered players.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Player'
 */
router.get("/", async (req, res) => {
    res.send(await PlayerController.findAll());
});

/**
 * @swagger
 * /player/{id}:
 *   get:
 *     description: Retrieve a list single player.
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The player id
 *     responses:
 *       "200":
 *         description: All registered players.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Player'
 */
router.get("/:id", async (req, res) => {
    res.send(await PlayerController.findById(req.params.id));
});

/**
 * @swagger
 * /player:
 *   post:
 *     description: Creates a new player and stores it in the database.
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Player'
 *     responses:
 *       "200":
 *         description: The created player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Player'
 */
router.post("/", async (req, res) => {
    const newPlayer = req.body;
    let player = await PlayerController.insert(newPlayer);

    res.send({
        message: "New player created.",
        player: player,
    });
});

module.exports = router;
