import React, { useState } from 'react';
import { schoolList } from "../model/getSchoolList"
import { batteryList } from "../model/getBatteryList"
import { batteryConsumption } from "../model/getBatteryConsumption"
import { sortByIssues } from "../model/sortByIssues"

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function SchoolBatteryInformation({ props }) {
  const [fold, setFold] = useState({ show: false, foldAcademyInfo: 0 });

  function Row({ row }) {
    // const { row } = props;
    return (
      <React.Fragment>
        <TableRow onClick={() => setFold({ show: fold.foldAcademyInfo !== row.academyId ? true : !fold.show, foldAcademyInfo: fold.foldAcademyInfo !== row.academyId ? row.academyId : 0 })}>
          {row.academyDetails.length && <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
            >
              {(fold.show && fold.foldAcademyInfo === row.academyId) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>}
          <TableCell align="center" component="th" scope="row">
            {row.academyId}
          </TableCell>
          <TableCell align="center">{row.academyDetails.length}</TableCell>
          <TableCell align="center"
            sx={{ fontWeight: row.issues > 0 && 'bold' }}
          >{row.issues}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={fold.show && fold.foldAcademyInfo === row.academyId} timeout='auto' unmountOnExit>
              <Box
                sx={{
                  margin: 1,
                  width: 0.75,
                  display: 'inline-block',
                }}>
                <Typography component="div" align="center" sx={{ fontSize: 'default' }}>
                  Detailed description for {row.academyId}
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>BatteryId</TableCell>
                      <TableCell align="right">Consumtion</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.academyDetails.map((battery) => (
                      <TableRow key={battery.serialNumber} >
                        <TableCell component="th" scope="row"
                          sx={{ fontWeight: !isNaN(battery.consumption) && battery.consumption > 0.3 && 'bold' }}>
                          {battery.serialNumber}
                        </TableCell>
                        <TableCell align="right"
                          sx={{ fontWeight: !isNaN(battery.consumption) && battery.consumption > 0.3 && 'bold' }}
                        >{battery.consumption}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  //////////////////model calls///////
  const getSchoolsList = schoolList(props)
  const getBatteryList = getSchoolsList.map((school) => Object.assign({}, { 'academyId': school.academyId }, { 'academyDetails': batteryList(school.academyDetails) }))
  getBatteryList.forEach((school) => school.academyDetails.map((battery) => battery.consumption = batteryConsumption(battery.batteryDetails)))
  sortByIssues(getBatteryList);

  return (
    <div className="school-battery-information">
      <TableContainer component={Paper}
        sx={{
          width: { sm: 1, md: 1 / 2 },
          display: 'inline-block',
          mt: { sm: 'none', md: 10 }
        }}>
        < Table aria-label="collapsible table" stickyHeader={true} size={'medium'} >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">AcademyId</TableCell>
              <TableCell align="center">Batteries Amount</TableCell>
              <TableCell align="center">Issues</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getBatteryList.map((row) => (
              <Row key={row.academyId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer >

    </div >
  )
};
