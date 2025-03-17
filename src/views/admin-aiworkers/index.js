import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PrepLoader from '../../components/prep-loader/loader';
import { baseURL } from '../../const';
import CloseIcon from '@mui/icons-material/Close';

const AdminAiWorkers = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const fetchAgents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/agents/`);
            setAgents(response.data.agents);
        } catch (error) {
            console.error('Error fetching agents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleView = (agent) => {
        setSelectedAgent(agent);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedAgent(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.get(`${baseURL}/agent/delete/${id}`);
            setAgents(agents.filter(agent => agent.id !== id));
        } catch (error) {
            console.error('Error deleting agent:', error);
        }
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
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>System Prompt</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agents.map((agent) => (
                                <TableRow key={agent.id} hover>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleView(agent)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{agent.id}</TableCell>
                                    <TableCell>{agent.name}</TableCell>
                                    <TableCell>{agent.system_prompt || 'N/A'}</TableCell>
                                    <TableCell>{agent.agent_description || 'N/A'}</TableCell>
                                    <TableCell>{agent.email || 'N/A'}</TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleDelete(agent.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for Viewing Agent Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    Agent Details
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
                    {selectedAgent && (
                        <Box>
                            <Typography><strong>ID:</strong> {selectedAgent.id}</Typography>
                            <Typography><strong>Name:</strong> {selectedAgent.name}</Typography>
                            <Typography><strong>System Prompt:</strong> {selectedAgent.system_prompt || 'N/A'}</Typography>
                            <Typography><strong>Description:</strong> {selectedAgent.agent_description || 'N/A'}</Typography>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminAiWorkers;