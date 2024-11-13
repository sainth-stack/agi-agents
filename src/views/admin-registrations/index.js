import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import PrepLoader from '../../components/prep-loader/loader';
import { baseURL } from '../../const';
import CloseIcon from '@mui/icons-material/Close';

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/submission/all/`);
            setRegistrations(response.data.submissions);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleView = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {loading ? (
                <PrepLoader />
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><strong>First Name</strong></TableCell>
                                <TableCell><strong>Last Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>GitHub Profile</strong></TableCell>
                                <TableCell><strong>LinkedIn Profile</strong></TableCell>
                                <TableCell><strong>Country</strong></TableCell>
                                <TableCell><strong>Affiliation Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {registrations.map((registration) => (
                                <TableRow key={registration.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleView(registration)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{registration.first_name}</TableCell>
                                    <TableCell>{registration.last_name}</TableCell>
                                    <TableCell>{registration.email}</TableCell>
                                    <TableCell>
                                        <a href={registration.github_profile} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                            {registration.github_profile}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={registration.linkedin_profile} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                            {registration.linkedin_profile}
                                        </a>
                                    </TableCell>
                                    <TableCell>{registration.country}</TableCell>
                                    <TableCell>{registration.affiliation_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for Viewing User Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    User Details
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Box>
                            <Typography><strong>First Name:</strong> {selectedUser.first_name}</Typography>
                            <Typography><strong>Last Name:</strong> {selectedUser.last_name}</Typography>
                            <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
                            <Typography><strong>GitHub Profile:</strong> <a href={selectedUser.github_profile} target="_blank" rel="noopener noreferrer">{selectedUser.github_profile}</a></Typography>
                            <Typography><strong>LinkedIn Profile:</strong> <a href={selectedUser.linkedin_profile} target="_blank" rel="noopener noreferrer">{selectedUser.linkedin_profile}</a></Typography>
                            <Typography><strong>Country:</strong> {selectedUser.country}</Typography>
                            <Typography><strong>Affiliation Status:</strong> {selectedUser.affiliation_status}</Typography>
                            <Typography><strong>Created At:</strong> {selectedUser.created_at}</Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminRegistrations;
