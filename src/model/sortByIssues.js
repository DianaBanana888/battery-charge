const calculatedIssues = (array) => {
  var total = 0;
  array.forEach((item) => !isNaN(item.consumption) && item.consumption > 0.3 &&
    total++);
  return total || 0;
};

const sortByIssues = (sortArray) => {
  sortArray?.forEach((academy) => (
    academy.issues = calculatedIssues(academy.academyDetails))
  );

  sortArray.sort((a, b) => b.issues - a.issues);
  return sortArray;
};
export { sortByIssues };
