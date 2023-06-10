import React, { useState } from 'react';
import { schoolList } from "../model/getSchoolList"
import { batteryList } from "../model/getBatteryList"
import { batteryStatus } from "../model/getBatteryStatus"

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

export default function Abba({ props }) {

  function calculateIssues(array) {
    var total = 0;
    array.forEach((item) => !isNaN(item.consumption) && item.consumption > 0.3 &&
      total++);
    return total || 0;
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow onClick={() => setOpen(!open)}>
          {row.academyDetails.length && <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>}
          <TableCell component="th" scope="row">
            {row.academyId}
          </TableCell>
          <TableCell align="right">{row.academyDetails.length}</TableCell>
          <TableCell align="right"
            sx={{ fontWeight: calculateIssues(row.academyDetails) > 0 && 'bold' }}
          >{calculateIssues(row.academyDetails)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  margin: 1,
                  width: 0.75,
                  display: 'inline-block',
                }}>
                <Typography component="div" align="center">
                  Detailed description
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
                        <TableCell component="th" scope="row">
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


  ///////////////////data calls
  const getSchoolsList = schoolList(props)
  const getBatteryList = getSchoolsList.map((school) => Object.assign({}, { 'academyId': school.academyId }, { 'academyDetails': batteryList(school.academyDetails) }))
  getBatteryList.map((school) => school.academyDetails.map((battery) => battery.consumption = batteryStatus(battery.batteryDetails)))
  console.log('getBatteryList', getBatteryList)
  ///////////////////data calls
  return (
    <div className="Abba">

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
              <TableCell>AcademyId</TableCell>
              <TableCell align="right">Number of Batteries</TableCell>
              <TableCell align="right">Issues</TableCell>
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
