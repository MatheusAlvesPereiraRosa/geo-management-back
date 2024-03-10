const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
/*const { geneticAlgorithm } = require('../algorithms/geneticAlgortithm');
const { nearestNeighbor } = require("../algorithms/nearestNeighbor")*/

function distance(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    var result = Math.sqrt(dx * dx + dy * dy);

    console.log("Distância entre ", p1, " e ", p2, " : ", result)

    return result
}

function newNearestNeighbor(points) {
    const n = points.length;

    // Garantindo que há pontos para processar
    if (n === 0) {
        return [];
    }

    const start = points[0];
    const path = [start];
    const used = Array(n).fill(false);
    used[0] = true;

    for (let i = 1; i < n; i++) {
        let best = -1;
        let minDistance = Infinity;
        for (let j = 0; j < n; j++) {
            if (!used[j]) {
                const currentDistance = distance(path[i - 1], points[j]);

                // Guarda e melhor distância entre os pontos
                if (currentDistance < minDistance) {
                    best = j;
                    minDistance = currentDistance;
                }
            }
        }
        console.log("Calculei a ", i, " rota")
        path.push(points[best]);
        used[best] = true;
    }

    // Garantindo que a rota sempre voltará para o início
    path.push(start);

    return path;
}

// Todas as rotas possíveis

function calculateDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function generateRoutes(points) {
    const n = points.length;

    if (n < 2) {
        return [];
    }

    const start = points[0];
    const routes = [];
    const used = Array(n).fill(false);

    function backtrack(path) {
        if (path.length === n) {
            // Garantindo que a rota sempre voltará para o início
            path.push(start);
            routes.push({
                route: path.map(p => ({ x: p.x, y: p.y })),
                totalDistance: calculateTotalDistance(path),
            });
            path.pop(); // Remove o ponto adicionado no início
            return;
        }

        for (let i = 1; i < n; i++) {
            if (!used[i]) {
                used[i] = true;
                path.push(points[i]);
                backtrack(path);
                path.pop();
                used[i] = false;
            }
        }
    }

    backtrack([start]);

    return routes;
}

function calculateTotalDistance(route) {
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += calculateDistance(route[i], route[i + 1]);
    }

    return totalDistance;
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

router.post('/calculateDistanceSolution', (req, res) => {
    try {
        var points = req.body.points;

        var path = newNearestNeighbor(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.post('/calculateAllRoutes', (req, res) => {
    try {
        var points = req.body.points;

        var path = generateRoutes(points)

        res.status(200).json(path)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;