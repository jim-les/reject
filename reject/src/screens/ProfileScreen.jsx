import React from 'react';
import { Box, Typography,  List, ListItem, Button, TextField  } from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { baseUrl } from '../base_url';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/AddCircle';


const ProfileScreen = () => {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [loadingMessage, setLoadingMessage] = React.useState('Loading Profile...');
    const [error, setError] = React.useState(null);
    const [user, setUsername] = React.useState({});
    const [number, setNumber] = React.useState(null);
    const [transactions, setTransaction] = React.useState([]);


    const handleFetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/users/${sessionStorage.getItem('ID')}`);
            setLoading(false);

            if (response.ok) {
                const data = await response.json();
                setUsername(data);
            } else {
                console.error('Failed to fetch user:', response);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    React.useEffect(() => {
        handleFetchUser();
    }, []);

    const handleAddNumber = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}/users/${sessionStorage.getItem('ID')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number })
            });
            setLoading(false);
            
            if (response.ok) {
                const data = await response.json();
                setUsername(data);
            } else {
                console.error('Failed to add number:', response);
            }
        } catch (error) {
            console.error('Failed to add number:', error);
        }
    };


    const handleLogout = () => {
        try {
            sessionStorage.removeItem('ID');
            setTimeout(() => {
                navigate('/login', { replace: true });
                window.location.reload();
            }, 0);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${baseUrl}/transactions/${sessionStorage.getItem('ID')}`);
            if (response.ok) {
                const data = await response.json();
                setTransaction(data);
            } else {
                console.error('Failed to fetch transactions:', response);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    React.useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', width: "100%", height: '24vh' }}>
                <AccountCircle sx={{fontSize: '12rem'}}  color="secondary"/>
            </Box>
            <Typography variant="h6" color="primary" align="center">
                Account ID: {user.accountId + user.initials}
            </Typography> 
            <Typography variant="h6" color="primary" align="center">
                Number: 0{user.number}
            </Typography> 
            <Typography variant="h4" color="dark" align="center" sx={{fontWeight: '800'}}>
                KES {user.balance}/=
            </Typography> 

            { user.number ? (
                <>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6" color="primary" align="left" sx={{fontWeight: '400', mt: 3, mx: 1}}>
                                Recent Transactions 
                        </Typography>
                        <Typography variant="h8" color="primary" align="left" sx={{fontWeight: '400', mt: 3, mx: 1, fontSize: '12px'}}>
                                View All 
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            maxHeight: '28vh', // Adjust the height as needed
                            overflowY: 'auto',
                            width: '100%', // Ensure the box takes full width
                            // backgroundColor: 'rgba(0, 0, 0, .04)'
                        }}
                    >
                        
                        <List>
                            { transactions.length === 0  && 
                                <ListItem alignItems="center">
                                   😞
                                    No transactions yet
                                </ListItem>
                            }
                            {transactions.map((transaction, index) => (
                                <ListItem key={index}
                                    sx={{
                                        background: 'white',
                                        mt: 1, p: 2,
                                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'

                                    }}
                                >Recieved <b style={{padding: '0 4px'}}>KES </b> from 07xxxxxxxx</ListItem>
                            ))}
                        </List>
                    </Box>
                    
                    <Box sx={{mx:2}}>
                        <Button variant="contained" color="secondary" sx={{ mt: 2,width: "100%", mx: 'auto', py: 2, paddingX: 5 }}>Withdraw</Button>
                    </Box>
                </>
            ) : (
                <Box sx={{my:4}}>
                    <Typography color="primary" align="center">
                        Update your PhoneNumber To recieve funds
                    </Typography>
                    <Box sx={{flexGrow: 1}}>
                        <TextField
                            label="Phone Number"
                            variant="filled"
                            fullWidth
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            sx={{mt: 2}}
                        />

                        {/* update rounded button with plus icon */}
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAddNumber}
                            sx={{ mt: 2,width: "70px", height: '70px', mx: 'auto', borderRadius: '100px' }}
                        >
                            <AddIcon />
                        </Button>
                        </Box>
                    </Box>
                </Box>
            )}
            
{/* 
            <Box sx={{mx:2}}>
                <Button variant="contained" color="primary" sx={{ mt: 2,width: "100%", mx: 'auto', py: 2, paddingX: 5 }}
                    onClick = {() => { handleLogout() }}
                >Logout</Button>
            </Box> */}
        </Box>
    );
};

export default ProfileScreen;
