import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, IconButton, Button, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddCircle';
import reject from "../assets/reject.png";
import { baseUrl } from '../base_url';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


const OkoaScreen = () => {
    const [value, setValue] = React.useState(0);
    const [items, setItems] = React.useState([]); 
    const [newItem, setNewItem] = React.useState({ number: '', amount: '' });
    const [selectedMethod, setSelectedMethod] = React.useState('by-number');
    const accountId = sessionStorage.getItem('ID');
    const [loading, setLoading] = React.useState(false);
    const [loadingMessage, setLoadingMessage] = React.useState('Transaction In Progress...');

    // total amount for the add reciever
    const [totalAmount, setTotalAmount] = React.useState(0);
    const [totalPeople, setTotalPeople] = React.useState(0);

    React.useEffect(() => {
        if (selectedMethod === 'by-number') {
            const total = items.reduce((acc, item) => acc + parseFloat(item.amount), 0);
            setTotalAmount(total.toFixed(2)); // Format to 2 decimal places\}
        } 
    }, [items]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            setSelectedMethod('by-number');
        } else {
            setSelectedMethod('by-amount');
        }
    };

    const handleInputChange = (field, index) => (event) => {
        const values = [...items];
        values[index][field] = event.target.value;
        setItems(values);
    };

    const handleNewInputChange = (field) => (event) => {
        setNewItem({ ...newItem, [field]: event.target.value });
    };

    const addItem = () => {
        if (newItem.number !== '' && newItem.amount !== '') {
            setItems([...items, newItem]);
            setNewItem({ number: '', amount: '' }); // Reset newItem after adding
        }
    };

    const deleteItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = async () => {
        setLoading(true);
        let receivers = [];
        if (selectedMethod === 'by-number') {
            receivers = items.map(item => item.number);
        } else {
            receivers = [10];
        }
        try {
            const response = await axios.post(`${baseUrl}/send-money`, {
                senderId: accountId,
                method: selectedMethod,
                receivers: receivers,
                amount: totalAmount,
            });
            
            console.log(response.data);
        } catch (error) {
            console.error('Error sending money:', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {loading &&
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.9)'}}>
                    <div>
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress color="success" align="center" sx={{ mb: 2, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" sx={{ ml: 2, color: "white" }}> {loadingMessage} </Typography>
                    </div>
                </Box>
            }
            <Box
                component="img"
                src={reject}
                alt="Example Image"
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    margin: '0 auto',
                    display: 'block',
                }}
            />
            <Typography variant="h4" color="secondary" align="center" sx={{ fontWeight: 800, my: 2 }}>
                Donate to Gen-Z
            </Typography>

            <Typography color="textSecondary" align="center" gutterBottom>
                Tolea Comarade Kakitu akule lunch
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 4
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="deposit-tabs">
                    <Tab label="Specific" />
                    <Tab label="Random" />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Typography variant="h6" gutterBottom>
                    Add Numbers and Amounts
                </Typography>

                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: "5px" }}>
                <TextField
                        label="Number"
                        fullWidth
                        sx={{width: '70%'}}
                        variant="filled" 
                        value={newItem.number}
                        onChange={handleNewInputChange('number')}
                    />
                    <TextField
                        label="Amount"
                        fullWidth
                        variant="filled" 
                        sx={{width: '40%'}}
                        value={newItem.amount}
                        onChange={handleNewInputChange('amount')}
                    />
                    <IconButton onClick={addItem} aria-label="add item">
                        <AddIcon />
                    </IconButton>
                </Box>

                <List>
                    {items.map((item, index) => (
                        <ListItem key={index} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemText
                                primary={`${item.number}: KES ${item.amount}`}
                                primaryTypographyProps={{ color: "textPrimary" }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Button onClick={handleSubmit} variant="contained" color="secondary" fullWidth sx={{ mt: 2, py: 2 }}>
                    Send
                </Button>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Typography variant="h6" color="textSecondary" align="center">
                    <Typography variant="h6" gutterBottom>
                        Add Amount and Persons to send
                    </Typography>

                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: "5px" }}>
                    <TextField
                            label="Amount"
                            fullWidth
                            sx={{width: '70%'}}
                            variant="filled" 
                            value = { totalAmount }
                            onChange = {(e) => setTotalAmount(e.target.value)}
                        />
                        <TextField
                            label="Total Genz"
                            fullWidth
                            variant="filled" 
                            sx={{width: '40%'}}
                            value={totalPeople}
                            onChange= {(e) => setTotalPeople(e.target.value)}
                        />
                    </Box>

                    <List>
                        {/* list of randomly selected numbers from the db */}
                    </List>

                    <Button onClick={handleSubmit} variant="contained" color="secondary" fullWidth sx={{ mt: 2, py: 2 }}>
                        Send
                    </Button>
                </Typography>
            </TabPanel>
        </Box>
    );
}

const TabPanel = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default OkoaScreen;
