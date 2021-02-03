import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { ObservationEntryList } from '../@Types/ObservationEntry';
import { ObservationEntry } from '../@Types/ObservationEntry.d';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

type Props = {
    locationName: string;
    observations: ObservationEntryList;
}


const ObservationTable: React.FC<Props> = ({ locationName, observations }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h5">Observasjoner for {locationName}</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Observasjoner">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tid</TableCell>
                            <TableCell align="right">Vind m/s</TableCell>
                            <TableCell align="right">Trykk</TableCell>
                            <TableCell align="right">Temperatur</TableCell>
                            <TableCell align="right">Skydekke</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations.map((row: ObservationEntry) => (
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
            <Typography variant="caption">Tabellen viser ikke ekte observasjoner</Typography>
        </>
    );
}

export default ObservationTable;
