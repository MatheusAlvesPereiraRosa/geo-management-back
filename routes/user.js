const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
/*const { geneticAlgorithm } = require('../algorithms/geneticAlgortithm');
const { nearestNeighbor } = require("../algorithms/nearestNeighbor")*/

function distance(p1, p2) {
    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function newNearestNeighbor(points) {
    const n = points.length;
    const start = points[0];
    const path = [start];
    const used = Array(n).fill(false);
    used[0] = true;

    for (let i = 1; i < n; i++) {
        let best = -1;
        let minDistance = Infinity;
        for (let j = 1; j < n; j++) {
            if (!used[j]) {
                const currentDistance = distance(path[i - 1], points[j]);
                if (currentDistance < minDistance) {
                    best = j;
                    minDistance = currentDistance;
                }
            }
        }
        path.push(points[best]);
        used[best] = true;
    }

    // Ensure the tour returns to the starting point (0, 0)
    path.push(start);

    return path;
}

// Example routes
router.get('', UserController.getAllUsers);
router.post('/create', UserController.createUser);
router.post('/filter', UserController.getOneUser);
/*router.post('/calculateTSPSolution', (req, res) => {
    try {
        const points = req.body.points; // Array of points [{x, y}, {x, y}, ...]

        // Ensure points is an array and has at least 2 points
        if (!Array.isArray(points) || points.length < 2) {
            return res.status(400).json({ error: 'Invalid input. Please provide at least two points.' });
        }

        // Nearest Neighbor Algorithm
        const nearestNeighborResult = nearestNeighbor(points);

        // Genetic Algorithm
        const geneticAlgorithmResult = geneticAlgorithm(points);

        res.json({ nearestNeighbor: nearestNeighborResult, geneticAlgorithm: geneticAlgorithmResult });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});*/

router.get('/calculateDistanceSolution', (req, res) => {
    try {
        var points = [[0, 0], [2, 6], [3, 4], [1, 2]];
        var path = newNearestNeighbor(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;