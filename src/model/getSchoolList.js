const getInfo = (item) => (
  Object.keys(item)
    .filter((key) => !key.includes("academyId"))
    .reduce((object, key) => {
      return Object.assign(object, {
        [key]: item[key]
      });
    }, {})
)
const schoolList = (initialData) => {
  let resultSchoolArray = [];
  initialData?.forEach((item) => (
    resultSchoolArray.find((el) => el.academyId === item.academyId)
      ? resultSchoolArray.find((el) => el.academyId === item.academyId).academyDetails.push(
        getInfo(item)
      )
      : resultSchoolArray.push({
        'academyId': item.academyId,
        'academyDetails': [
          getInfo(item)
        ]
      })

  ))
  return resultSchoolArray;
};
export { schoolList };
