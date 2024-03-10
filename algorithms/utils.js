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

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function generatePermutations(points, callback) {
    const n = points.length;
    const c = new Array(n).fill(0);

    callback([...points]);

    let i = 0;
    while (i < n) {
        if (c[i] < i) {
            if (i % 2 === 0) {
                swap(points, 0, i);
            } else {
                swap(points, c[i], i);
            }

            callback([...points]);

            c[i]++;
            i = 0;
        } else {
            c[i] = 0;
            i++;
        }
    }
}

function nearestInsertion(points) {
    const start = { x: 0, y: 0 };
    let unvisited = [...points];
    let currentPoint = start;
    let route = [start];
    let totalDistance = 0;

    while (unvisited.length > 0) {
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        for (let i = 0; i < unvisited.length; i++) {
            const distance = calculateDistance(currentPoint, unvisited[i]);
            if (distance < nearestDistance) {
                nearestIndex = i;
                nearestDistance = distance;
            }
        }

        totalDistance += nearestDistance;
        currentPoint = unvisited[nearestIndex];
        route.push(unvisited[nearestIndex]);
        unvisited.splice(nearestIndex, 1);
    }

    // Add the distance back to the start
    totalDistance += calculateDistance(route[route.length - 1], start);
    route.push(start);

    return { points: route, distance: totalDistance };
}

function findBestRoute(points) {
    const start = { x: 0, y: 0 };

    const thresholdForPermutation = 10; // Adjust the threshold as needed

    if (points.length <= thresholdForPermutation) {

        let minDistance = Infinity;
        let bestRoute;

        generatePermutations(points, route => {
            const totalDistance = calculateTotalDistance([start, ...route, start]);

            if (totalDistance < minDistance) {
                minDistance = totalDistance;
                bestRoute = [start, ...route, start];
            }
        });

        return { points: bestRoute, distance: minDistance };
    } else {
        const nearestInsertionResult = nearestInsertion(points);
        return nearestInsertionResult;
    }
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

module.exports = {
    findBestRoute,
    generateAllRoutes,
};