const { calculateDistanceMatrix, calculateFitness, initializePopulation, crossover, mutate, selectTopIndices, findMaxIndex } = require('./utils');

function geneticAlgorithm(points, populationSize = 10, generations = 21) {
    const n = points.length;

    console.log("tamanho da população", n)

    const distanceMatrix = calculateDistanceMatrix(points);
    let population = initializePopulation(n, populationSize); // Pass n to initializePopulation

    for (let generation = 0; generation < generations; generation++) {
        const newPopulation = [];

        // Perform selection, crossover, and mutation
        for (let i = 0; i < populationSize; i++) {
            const parent1 = population[Math.floor(Math.random() * populationSize)];
            const parent2 = population[Math.floor(Math.random() * populationSize)];
            const child = crossover(parent1, parent2);
            if (Math.random() < 0.1) {
                mutate(child);
            }
            newPopulation.push(child);
        }

        // Calculate fitness for each tour in the new population
        const fitnessValues = newPopulation.map((tour) => calculateFitness(tour, distanceMatrix));

        // Select the top 50% of the population based on fitness
        const selectedIndices = selectTopIndices(fitnessValues, Math.floor(populationSize / 2));

        // Replace the old population with the selected individuals
        population = selectedIndices.map((index) => newPopulation[index]);
    }

    // Find the best tour in the final population
    const bestTourIndex = findMaxIndex(population.map((tour) => calculateFitness(tour, distanceMatrix)));
    const bestTour = population[bestTourIndex];

    console.log(bestTour)

    return bestTour;
}

module.exports = { geneticAlgorithm };