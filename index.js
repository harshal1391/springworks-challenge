const { categoriseData } = require("./src/Solution");
const waypoints = require("./waypoints.json");

const output = categoriseData(waypoints);

console.log(output);
