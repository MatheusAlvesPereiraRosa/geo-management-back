const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { shortestPath, shortestPathMatrix, generateAllRoutes } = require("../algorithms/utils")

// Example routes
router.get('', UserController.getAllUsers);
router.post('/create', UserController.createUser);
router.post('/filter', UserController.getOneUser);

router.post('/calculateDistanceSolution', (req, res) => {
    try {
        var points = req.body.points;

        var path = shortestPath(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.post('/calculateAllRoutes', (req, res) => {
    try {
        var points = req.body.points;

        var path = generateAllRoutes(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.post('/calculateDistanceSolutionMatrix', (req, res) => {
    try {
        var points = req.body.points;

        var path = shortestPathMatrix(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;