function calculateDistance(point1, point2) {
    const deltaX = point1.x - point2.x;
    const deltaY = point1.y - point2.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Function to calculate the distance matrix between all pairs of points
function calculateDistanceMatrix(points) {
    const n = points.length;
    const matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = calculateDistance(points[i], points[j]);
        }
    }

    console.log("Matriz: ", matrix)

    return matrix;
}

function initializePopulation(points, populationSize) {
    const n = points.length;
    const population = [];

    for (let i = 0; i < populationSize; i++) {
        const tour = [...Array(n).keys()].slice(1); // Initial tour (excluding the starting city)
        shuffleArray(tour); // Shuffle the tour randomly
        population.push([0, ...tour, 0]); // Complete the tour by returning to the starting city
    }

    console.log("População inicial:" , population)

    return population;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to perform crossover (ordered crossover)
function crossover(parent1, parent2) {
    const n = parent1.length - 2; // Exclude starting and ending cities
    const start = Math.floor(Math.random() * n);
    const end = Math.floor(Math.random() * (n - start)) + start + 1;

    const child = [...Array(n).keys()].map(() => -1);

    // Copy the segment from parent1 to the child
    for (let i = start; i < end; i++) {
        child[i] = parent1[i];
    }

    // Fill in the remaining positions from parent2
    let index = end % n;
    for (let i = 0; i < n; i++) {
        if (!child.includes(parent2[index])) {
            child[index] = parent2[index];
            index = (index + 1) % n;
        }
    }

    return [0, ...child, 0]; // Complete the tour by returning to the starting city
}

function calculateFitness(tour, distanceMatrix) {
    let totalDistance = 0;

    for (let i = 0; i < tour.length - 1; i++) {
        totalDistance += distanceMatrix[tour[i]][tour[i + 1]];
    }

    return 1 / totalDistance; // Inverse of the total distance as the fitness
}

// Function to perform mutation (swap mutation)
function mutate(tour) {
    const n = tour.length - 2; // Exclude starting and ending cities
    const index1 = Math.floor(Math.random() * n) + 1; // Exclude the starting city
    let index2 = Math.floor(Math.random() * n) + 1;

    // Ensure indices are different
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * n) + 1;
    }

    [tour[index1], tour[index2]] = [tour[index2], tour[index1]]; // Swap cities
    return tour;
}

function selectTopIndices(fitnessValues, numTop) {
    const indices = [...Array(fitnessValues.length).keys()];
    indices.sort((a, b) => fitnessValues[b] - fitnessValues[a]);
    return indices.slice(0, numTop);
}

// Function to find the index of the maximum value in an array
function findMaxIndex(arr) {
    return arr.indexOf(Math.max(...arr));
}

module.exports = {
    calculateDistance,
    calculateDistanceMatrix,
    calculateFitness,
    initializePopulation,
    mutate,
    crossover,
    selectTopIndices,
    findMaxIndex,
};