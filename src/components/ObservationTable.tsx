import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

const getObs = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

const createData = (time: string, wind: number, pressure: number, temperature: number, clouds: number) => {
    return { time, wind, pressure, temperature, clouds };
}

const createRows = (nRows: number) => {
    let rows = [];
    for (let i = 0; i < nRows; i++) {
        rows.push(createData((i + 1).toFixed(2), getObs(1, 10), getObs(1000, 1025), getObs(15, 25), getObs(0, 99)));
    }
    return rows;
}


export default function ObservationTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell align="right">Vind m/s</TableCell>
                        <TableCell align="right">Trykk</TableCell>
                        <TableCell align="right">Temperatur</TableCell>
                        <TableCell align="right">Skydekke</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createRows(23).map((row) => (
                        <TableRow key={row.time}>
                            <TableCell component="th" scope="row">
                                {row.time}
                            </TableCell>
                            <TableCell align="right">{row.wind.toFixed(0)}</TableCell>
                            <TableCell align="right">{row.pressure.toFixed(0)}</TableCell>
                            <TableCell align="right">{row.temperature.toFixed(1)}</TableCell>
                            <TableCell align="right">{row.clouds.toFixed(0)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
