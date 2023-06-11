const getInfo = (item) => (
  Object.keys(item)
    .filter((key) => !key.includes("serialNumber"))
    .reduce((object, key) => {
      return Object.assign(object, {
        [key]: item[key]
      });
    }, {})
)

const batteryList = (arrayWithAcademyDetails) => {
  let resultBatteryArray = [];
  arrayWithAcademyDetails?.forEach((item) => (
    !resultBatteryArray.find((el) => el.serialNumber === item.serialNumber)
      ? resultBatteryArray.push({
        'serialNumber': item.serialNumber,
        'batteryDetails': [
          getInfo(item)
        ]
      })
      : resultBatteryArray.find((el) => el.serialNumber === item.serialNumber && el.batteryDetails.push(
        getInfo(item)
      ))
  ))
  return resultBatteryArray;
};
export { batteryList };
