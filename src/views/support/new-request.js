import React from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const NewRequest = () => {
    return (
        <Grid>
            <Grid container borderBottom={"1px solid rgb(0 0 0 / 5%)"}  direction="column" alignItems="start" style={{ padding: '20px' }}>
                <Grid item>
                    <Typography variant="h5" style={{ marginBottom: '10px' }}>
                        Generate new support request. We will answer as soon as possible.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Create New Support Request
                    </Typography>
                </Grid>
            </Grid>
              <Grid container direction="column" alignItems="center" style={{ padding: '20px',marginTop:'40px' }}>
            <Grid item container spacing={2} style={{ width: '100%', maxWidth: '600px' }}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: '#333', fontSize: '1rem' }}>Support Category</InputLabel>
                        <Select
                            defaultValue="General Inquiry"
                            label="Support Category"
                            style={{ backgroundColor: '#fff', borderRadius: '4px' }}
                        >
                            <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                            <MenuItem value="Technical Issue">Technical Issue</MenuItem>
                            <MenuItem value="Billing">Billing</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel style={{ color: '#333', fontSize: '1rem' }}>Support Priority</InputLabel>
                        <Select
                            defaultValue="Low"
                            label="Support Priority"
                            style={{ backgroundColor: '#fff', borderRadius: '4px' }}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Subject"
                        placeholder="Please enter subject of the support request"
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: '#333', fontSize: '1rem' }
                        }}
                        style={{ backgroundColor: '#fff', borderRadius: '4px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Message"
                        placeholder="Please enter your message"
                        variant="outlined"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            style: { color: '#333', fontSize: '1rem' }
                        }}
                        style={{ backgroundColor: '#fff', borderRadius: '4px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth style={{ backgroundColor: '#4A148C' }}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    );
}

export default NewRequest;
