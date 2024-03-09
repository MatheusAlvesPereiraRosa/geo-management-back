const { calculateDistance } = require("./utils")

function nearestNeighbor(points) {
    const n = points.length;
    const visited = new Array(n).fill(false);
    const tour = [0]; // Start from the first city

    for (let i = 1; i < n; i++) {
        let minDistance = Infinity;
        let nearestCity = -1;

        for (let j = 0; j < n; j++) {
            if (!visited[j] && j !== tour[i - 1]) {
                const distance = calculateDistance(points[tour[i - 1]], points[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestCity = j;
                }
            }
        }

        tour.push(nearestCity);
        visited[nearestCity] = true;
    }

    tour.push(0); // Complete the tour by returning to the starting city
    return tour;
}

module.exports = { nearestNeighbor }

