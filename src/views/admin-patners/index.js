import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { baseURL } from '../../const';

const AdminPartners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);

    // API to fetch partners
    const fetchPartners = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/partner/all/`);
            setPartners(response.data.partners);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleView = (partner) => {
        setSelectedPartner(partner);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPartner(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>First Name</strong></TableCell>
                                <TableCell><strong>Last Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Company Name</strong></TableCell>
                                <TableCell><strong>Sponsorship Level</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {partners.map((partner) => (
                                <TableRow key={partner.id} hover>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleView(partner)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{partner.id}</TableCell>
                                    <TableCell>{partner.first_name}</TableCell>
                                    <TableCell>{partner.last_name}</TableCell>
                                    <TableCell>{partner.email}</TableCell>
                                    <TableCell>{partner.company_name}</TableCell>
                                    <TableCell>{partner.sponsorship_level}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for Viewing Partner Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    Partner Details
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
                    {selectedPartner && (
                        <Box>
                            <Typography><strong>ID:</strong> {selectedPartner.id}</Typography>
                            <Typography><strong>First Name:</strong> {selectedPartner.first_name}</Typography>
                            <Typography><strong>Last Name:</strong> {selectedPartner.last_name}</Typography>
                            <Typography><strong>Email:</strong> {selectedPartner.email}</Typography>
                            <Typography><strong>Company Name:</strong> {selectedPartner.company_name}</Typography>
                            <Typography><strong>Sponsorship Level:</strong> {selectedPartner.sponsorship_level}</Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminPartners;
