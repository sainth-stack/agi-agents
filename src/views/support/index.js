import React from 'react';
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Support = () => {
    const navigate = useNavigate()
    return (
        <Grid container direction="column" alignItems="start" style={{ padding: '20px', paddingTop: 0 }}>
            <Grid item borderBottom={"1px solid rgb(0 0 0 / 5%)"} width={"100%"} mb={3} pb={3}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Support Requests
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="success" style={{ marginBottom: '20px' }} onClick={() => navigate('/new-request')}>
                    Create New Support Request
                </Button>
            </Grid>
            <Grid item style={{ width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>TICKET ID</TableCell>
                                <TableCell>STATUS</TableCell>
                                <TableCell>CATEGORY</TableCell>
                                <TableCell>SUBJECT</TableCell>
                                <TableCell>PRIORITY</TableCell>
                                <TableCell>CREATED AT</TableCell>
                                <TableCell>LAST UPDATED</TableCell>
                                <TableCell>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>YAZFPMHFL2</TableCell>
                                <TableCell>Waiting for answer</TableCell>
                                <TableCell>General Inquiry</TableCell>
                                <TableCell>subject</TableCell>
                                <TableCell>Low</TableCell>
                                <TableCell>2024-06-30 14:20:22</TableCell>
                                <TableCell>2024-06-30 14:20:22</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Support;
