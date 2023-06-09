
// import React, { useEffect } from 'react';

import { schoolList } from "../model/getSchoolList"
import { batteryList } from "../model/getBatteryList"
import { batteryStatus } from "../model/getBatteryStatus"

export default function Abba({ props }) {
  console.log('1', props.length)

  const getSchoolsList = schoolList(props)

  const getBatteryList = getSchoolsList.map((school) => Object.assign({}, { 'academyId': school.academyId }, { 'academyDetails': batteryList(school.academyDetails) }))
  console.log('getBatteryList', getBatteryList)

  getBatteryList.map((school) => school.academyDetails.map((battery) => battery.status = batteryStatus(battery.batteryDetails)))
  console.log('getBatteryList', getBatteryList)
};
