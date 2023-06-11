const batteryConsumption = (details) => {
  if (details.length <= 1) return 'unknown';
  const ratioArray = [];
  let dischargeIndexStart = 0
  let dischargeIndexStop = 0

  for (let index = 1; index < details.length; index++) {
    const previousElement = details[index - 1];
    const currentElement = details[index];

    if (currentElement.batteryLevel <= previousElement.batteryLevel) {
      dischargeIndexStop = index
    }

    if (currentElement.batteryLevel > previousElement.batteryLevel || index === details.length - 1) {
      if (dischargeIndexStart !== dischargeIndexStop) {
        const timeDifference = Date.parse(details[dischargeIndexStop].timestamp) - Date.parse(details[dischargeIndexStart].timestamp)
        const consumptionDifference = details[dischargeIndexStart].batteryLevel - details[dischargeIndexStop].batteryLevel
        if (consumptionDifference > 0) {
          const ratio = (consumptionDifference / timeDifference) * 24 * 60 * 60 * 1000;
          ratioArray.push(ratio)
        }
      }
      dischargeIndexStop = index
      dischargeIndexStart = index
    }
  }

  if (ratioArray.length > 0) {
    const sum = ratioArray.reduce((a, b) => a + b, 0);
    const avg = parseFloat((sum / ratioArray.length).toFixed(2));
    return avg
  } else { return 'unknown' };

};
export { batteryConsumption };
