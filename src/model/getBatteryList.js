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
  let generatedUnicorn = [];
  arrayWithAcademyDetails.map((item) => (
    !generatedUnicorn.find((el) => el.serialNumber === item.serialNumber)
      ? generatedUnicorn.push({
        'serialNumber': item.serialNumber,
        'batteryDetails': [
          getInfo(item)
        ]
      })
      : generatedUnicorn.find((el) => el.serialNumber === item.serialNumber && el.batteryDetails.push(
        getInfo(item)
      ))
  ))
  return generatedUnicorn;
};
export { batteryList };
