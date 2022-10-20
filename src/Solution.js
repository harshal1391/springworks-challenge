const categoriseData = (waypoints) => {
  const data = {
    distanceSpeeding: 0,
    durationSpeeding: 0,
    totalDistance: 0,
    totalDuration: 0,
  };

  if (waypoints.length === 0) return data;

  waypoints.reduce((prev, curr) => {
    const duration =
      (new Date(curr.timestamp).getTime() -
        new Date(prev.timestamp).getTime()) /
      1000;
    const distance = prev.speed * duration;

    if (prev.speed > prev.speed_limit) {
      data.distanceSpeeding += distance;
      data.durationSpeeding += duration;
    }
    data.totalDistance += distance;
    data.totalDuration += duration;

    return curr;
  });

  return data;
};

module.exports = { categoriseData };
