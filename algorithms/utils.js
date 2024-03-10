// ------------- Rota mais rápida --------------- //

function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function calculateTotalDistance(route) {
    let totalDistance = 0;
    for (let i = 1; i < route.length; i++) {
        totalDistance += calculateDistance(route[i - 1], route[i]);
    }
    // Adding the distance from the last point back to the start
    totalDistance += calculateDistance(route[route.length - 1], route[0]);
    return totalDistance;
}

function permute(arr) {
    const result = [];

    function permuteHelper(arr, start) {
        if (start === arr.length - 1) {
            result.push([...arr]);
            result.push([...arr].reverse()); // Add the reverse order as well
            return;
        }

        for (let i = start; i < arr.length; i++) {
            [arr[start], arr[i]] = [arr[i], arr[start]];
            permuteHelper(arr, start + 1);
            [arr[start], arr[i]] = [arr[i], arr[start]];
        }
    }

    permuteHelper(arr, 0);
    return result;
}

function findBestRoute(points) {
    const start = { x: 0, y: 0 };
    const allPossibleRoutes = permute(points);
    let bestRoute = allPossibleRoutes[0];
    let minDistance = calculateTotalDistance([...bestRoute, start]);

    for (const route of allPossibleRoutes) {
        const totalDistance = calculateTotalDistance([...route, start]);
        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            bestRoute = route;
        }
    }

    // Ensure the best route starts and ends at the origin
    bestRoute = [start, ...bestRoute, start];

    return { points: bestRoute, distance: minDistance };
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

/*
function calculateTotalDistance(route) {
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += calculateDistance(route[i], route[i + 1]);
    }

    return totalDistance;
}*/


module.exports = {
    findBestRoute,
    generateAllRoutes,
};