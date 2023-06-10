const calculatedIssues = (array) => {
  var total = 0;
  array.forEach((item) => !isNaN(item.consumption) && item.consumption > 0.3 &&
    total++);
  return total || 0;
};

const sortByIssues = (props) => {
  const newArray = props;
  newArray.forEach((academy) => (
    academy.issues = calculatedIssues(academy.academyDetails))
  );

  newArray.sort((a, b) => b.issues - a.issues);
  return newArray;
};
export { sortByIssues };
