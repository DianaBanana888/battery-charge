const getInfo = (item) => (
  Object.keys(item)
    .filter((key) => !key.includes("academyId"))
    .reduce((object, key) => {
      return Object.assign(object, {
        [key]: item[key]
      });
    }, {})
)
const schoolList = (props) => {
  let generatedUnicorn = [];
  const newArray = props;
  newArray?.map((item) => (
    generatedUnicorn.find((el) => el.academyId === item.academyId)
      ? generatedUnicorn.find((el) => el.academyId === item.academyId).academyDetails.push(
        getInfo(item)
      )
      : generatedUnicorn.push({
        'academyId': item.academyId,
        'academyDetails': [
          getInfo(item)
        ]
      })

  ))
  return generatedUnicorn;
};
export { schoolList };
