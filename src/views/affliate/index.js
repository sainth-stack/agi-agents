import React from 'react';
import { Grid, Box, Typography, Button, TextField, Card, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { CopyAll } from '@mui/icons-material';

const Affiliate = () => {
    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: '#f3e5f5',
                        padding: '30px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ maxWidth: '40%' }}>
                        <Typography variant="h2" mb={2}>
                            Invite your friends and earn lifelong recurring commissions from every purchase they make. 🎁
                        </Typography>
                        <Typography
                            variant="body1">

                            Affiliate Link
                        </Typography>
                        <Box
                            sx={{
                                marginTop: '10px',
                                backgroundColor: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >

                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#7e57c2',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                }}
                            >
                                https://legal.agi.tools/register?aff=T96CJNEB7BGT
                            </Typography>
                            <CopyAll />
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h1">Earnings</Typography>
                        <Typography variant="h1">$0</Typography>
                        <Typography variant="h5">Commission Rate: 25%</Typography>
                        <Typography variant="h5">Referral Program: All Purchases</Typography>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
            <Card>

                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h3">How it Works</Typography>
                    <Typography variant="h5" mt={1}>
                        1. You send your invitation link to your friends.
                    </Typography>
                    <Typography variant="h5" mt={1}>
                        2. They subscribe to a paid plan by using your referral link.
                    </Typography>
                    <Typography variant="h5" mt={1}>
                        3. From their first purchase, you will begin earning recurring commissions.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" fullWidth>
                        Send
                    </Button>
                </Box>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>

                    <Box
                        sx={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant="h3">Withdrawal Form</Typography>
                        <TextField
                            fullWidth
                            label="Your Bank Information"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Amount (Minimum Withdrawal Amount is 10)"
                            variant="outlined"
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" fullWidth>
                            Send Request
                        </Button>
                    </Box>
                </Card>
            </Grid>

            <Grid item xs={12}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Withdrawal Requests</Typography>
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  You have no withdrawal request
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </Box>
      </Grid>
        </Grid >
    );
};

export default Affiliate;
