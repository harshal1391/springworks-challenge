const { categoriseData } = require("../src/Solution.js");
const waypoints = require("../waypoints.json");

describe("solution", () => {
  test("Should return default data for empty waypoints", () => {
    const waypoints = [];

    const data = categoriseData(waypoints);

    expect(data).toMatchObject({
      distanceSpeeding: 0,
      durationSpeeding: 0,
      totalDistance: 0,
      totalDuration: 0,
    });
  });

  test("Should return default data for no movement", () => {
    const waypoints = [
      {
        timestamp: "2016-06-21T12:00:00.000Z",
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
    ];

    const output = categoriseData(waypoints);

    expect(output).toMatchObject({
      distanceSpeeding: 0,
      durationSpeeding: 0,
      totalDistance: 0,
      totalDuration: 0,
    });
  });

  test("Should return calculated data", () => {
    const waypoints = [
      {
        timestamp: "2016-06-21T12:00:00.000Z",
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
      {
        timestamp: "2016-06-21T12:00:05.000Z",
        position: {
          latitude: 59.3337,
          longitude: 18.0662,
        },
        speed: 9.4,
        speed_limit: 8.33,
      },
    ];

    const output = categoriseData(waypoints);

    expect(output).toMatchObject({
      distanceSpeeding: 0,
      durationSpeeding: 0,
      totalDistance: 31.944499999999998,
      totalDuration: 5,
    });
  });

  test("Should return calculated data 1", () => {
    const waypoints = [
      {
        timestamp: "2016-06-21T12:00:00.000Z",
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 6.3889,
        speed_limit: 8.33,
      },
      {
        timestamp: "2016-06-21T12:00:05.000Z",
        position: {
          latitude: 59.3337,
          longitude: 18.0662,
        },
        speed: 9.4,
        speed_limit: 8.33,
      },
      {
        timestamp: "2016-06-21T12:00:10.000Z",
        position: {
          latitude: 59.3331,
          longitude: 18.0664,
        },
        speed: 11.1,
        speed_limit: 8.33,
      },
      {
        timestamp: "2016-06-21T12:00:15.000Z",
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 8.32,
        speed_limit: 8.33,
      },
    ];

    const output = categoriseData(waypoints);

    expect(output).toMatchObject({
      distanceSpeeding: 102.5,
      durationSpeeding: 10,
      totalDistance: 134.4445,
      totalDuration: 15,
    });
  });

  test("Under speed limit driving", () => {
    const waypoints = [
      {
        timestamp: "2016-06-21T12:00:00.000Z",
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 20,
        speed_limit: 30,
      },
      {
        timestamp: "2016-06-21T12:00:05.000Z",
        position: {
          latitude: 59.3337,
          longitude: 18.0662,
        },
        speed: 30,
        speed_limit: 40,
      },
      {
        timestamp: "2016-06-21T12:00:10.000Z",
        position: {
          latitude: 59.3331,
          longitude: 18.0664,
        },
        speed: 40,
        speed_limit: 50,
      },
      {
        timestamp: "2016-06-21T12:00:15.000Z",
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 50,
        speed_limit: 60,
      },
    ];

    const output = categoriseData(waypoints);

    expect(output).toMatchObject({
      distanceSpeeding: 0,
      durationSpeeding: 0,
      totalDistance: 20 * 5 + 30 * 5 + 40 * 5,
      totalDuration: 15,
    });
  });

  test("Over speed limit driving", () => {
    const waypoints = [
      {
        timestamp: "2016-06-21T12:00:00.000Z",
        position: {
          latitude: 59.334,
          longitude: 18.0667,
        },
        speed: 40,
        speed_limit: 30,
      },
      {
        timestamp: "2016-06-21T12:00:05.000Z",
        position: {
          latitude: 59.3337,
          longitude: 18.0662,
        },
        speed: 50,
        speed_limit: 40,
      },
      {
        timestamp: "2016-06-21T12:00:10.000Z",
        position: {
          latitude: 59.3331,
          longitude: 18.0664,
        },
        speed: 60,
        speed_limit: 50,
      },
      {
        timestamp: "2016-06-21T12:00:15.000Z",
        position: {
          latitude: 59.3327,
          longitude: 18.0665,
        },
        speed: 70,
        speed_limit: 60,
      },
    ];

    const output = categoriseData(waypoints);

    expect(output).toMatchObject({
      distanceSpeeding: 40 * 5 + 50 * 5 + 60 * 5,
      durationSpeeding: 15,
      totalDistance: 40 * 5 + 50 * 5 + 60 * 5,
      totalDuration: 15,
    });
  });
});
