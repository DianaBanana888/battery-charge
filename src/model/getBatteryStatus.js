const batteryStatus = (details) => {
  console.log(details)
  let status = details.length <= 1
    ? 'unknown'
    : "tuktuk";
  return status
};
export { batteryStatus };
