// ------------- Rota mais rápida --------------- //

function calculateDistance(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;

    var result = Math.sqrt(dx * dx + dy * dy);

    console.log("Distância entre ", p1, " e ", p2, " : ", result)

    return result
}

function calculateDistanceMatrix(points) {
    const n = points.length;
    const matrix = [];

    for (let i = 0; i < n; i++) {
        points[i].index = i; // Add index property to each point
        matrix[i] = [];

        for (let j = 0; j < n; j++) {
            matrix[i][j] = calculateDistance(points[i], points[j]);
        }
    }

    return matrix;
}

function shortestPath(points) {
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
                const currentDistance = calculateDistance(path[i - 1], points[j]);

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

function shortestPathMatrix(points) {
    const n = points.length;

    if (n === 0) {
        return [];
    }

    const distanceMatrix = calculateDistanceMatrix(points);

    const start = points[0];
    const path = [start];
    const used = Array(n).fill(false);
    used[0] = true;

    for (let i = 1; i < n; i++) {
        let best = -1;
        let minDistance = Infinity;
        for (let j = 0; j < n; j++) {
            if (!used[j]) {
                const currentDistance = distanceMatrix[path[i - 1].index][j];

                if (currentDistance < minDistance) {
                    best = j;
                    minDistance = currentDistance;
                }
            }
        }
        path.push(points[best]);
        used[best] = true;
    }

    path.push(start);

    return path;
}

// ------------- Todas as rotas possíveis --------------- //

function generateAllRoutes(points) {
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

module.exports = {
    calculateDistance,
    calculateDistanceMatrix,
    shortestPath,
    shortestPathMatrix,
    generateAllRoutes,

};