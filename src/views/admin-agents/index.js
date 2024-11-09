import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { baseURL } from '../../const';
import PrepLoader from '../../components/prep-loader/loader';
import { useNavigate } from 'react-router-dom';

const AdminAgents = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
const navigate= useNavigate()
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const fetchAgents = async (status) => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/agent_status/?status=${status}`);
            setAgents(response.data.agents);
        } catch (error) {
            console.error('Error fetching agents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const statuses = ['pending', 'approved', 'rejected'];
        fetchAgents(statuses[tabIndex]);
    }, [tabIndex]);

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Pending" />
                <Tab label="Approved" />
                <Tab label="Rejected" />
            </Tabs>
            <TabPanel value={tabIndex} index={tabIndex}>
                {loading ? (
                    <PrepLoader />
                ) : (
                    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Description</strong></TableCell>
                                    <TableCell><strong>Category</strong></TableCell>
                                    <TableCell><strong>Industry</strong></TableCell>
                                    <TableCell><strong>Pricing</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Website</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agents.map((agent) => (
                                    <TableRow key={agent.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(agent,navigate)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{agent.name}</TableCell>
                                        <TableCell>{tabIndex === 1 ? 'Approved' : tabIndex === 2 ? 'Rejected' : 'Pending'}</TableCell>
                                        <TableCell>{agent.description}</TableCell>
                                        <TableCell>{agent.category}</TableCell>
                                        <TableCell>{agent.industry}</TableCell>
                                        <TableCell>{agent.pricing}</TableCell>
                                        <TableCell>{agent.email}</TableCell>
                                        <TableCell>
                                            <a href={agent.website_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                                {agent.website_url}
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </TabPanel>
        </Box>
    );
};

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

// Example handler function for editing an agent
const handleEdit = (agent,navigate) => {
    console.log('Edit agent:', agent);
    navigate(`/agnets-hub/update/${agent?.id}`)
    // Implement edit functionality here
};

export default AdminAgents;
