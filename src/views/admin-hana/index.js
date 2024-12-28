import { useState } from 'react';
import {
    Button,
    Card,
    Typography,
    TextField,
    Box,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import { Upload as UploadIcon, Send as SendIcon } from '@mui/icons-material';
import './index.css';
import { baseURL } from '../../const';

const AdminHana = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            setUploadLoading(true);
            try {
                const formData = new FormData();
                formData.append('files', file);

                const response = await fetch(`${baseURL}/processing_files`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                setSnackbar({
                    open: true,
                    message: data.message,
                    severity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                });
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: 'Upload failed.',
                    severity: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                });
            } finally {
                setUploadLoading(false);
            }
        }
    };

    const handleQuery = async () => {
        if (!query.trim()) {
            setSnackbar({ open: true, message: 'Please enter a query', severity: 'warning' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/query_making`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    sql_query: query
                })
            });

            const data = await response.json();
            const newChatEntry = {
                query: query,
                response: data.response,
                timestamp: new Date().toISOString()
            };
            setChatHistory(prev => [...prev, newChatEntry]);
            setQuery('');
        } catch (error) {
            setSnackbar({ open: true, message: 'Query failed to process', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box className="container pt-0">
            <Card className="styled-card" sx={{ p: 2,pt:0 }}>
                <Typography variant="h5" gutterBottom>
                    File Processing System
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={uploadLoading ? <CircularProgress size={24} color="inherit" /> : <UploadIcon />}
                    disabled={uploadLoading}
                >
                    {uploadLoading ? 'Uploading...' : 'Click to Upload Excel File'}
                    <input
                        type="file"
                        hidden
                        accept=".xlsx,.xls"
                        onChange={handleUpload}
                    />
                </Button>
            </Card>

            <Box className="query-section mt-0">
                <Card className="styled-card" sx={{ p: 2,pt:0 }}>
                    <Box className="chat-history">
                        {chatHistory.map((chat, index) => (
                            <Box key={index}>
                                <Box className="chat-message query-message">
                                    <Typography variant="subtitle2">Query:</Typography>
                                    <Typography>{chat.query}</Typography>
                                </Box>
                                <Box className="chat-message response-message">
                                    <Typography variant="subtitle2">Response:</Typography>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: chat.response }}
                                        style={{
                                            width: '100%',
                                            // padding: '20px',
                                            // backgroundColor: '#1e1e1e',
                                            borderRadius: '8px',
                                            color: '#000'
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box className="chat-input pt-0">
                        <TextField
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={1}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type your query here..."
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                            onClick={handleQuery}
                            disabled={loading}
                            sx={{ height: '40px' }}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </Box>
                </Card>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminHana;