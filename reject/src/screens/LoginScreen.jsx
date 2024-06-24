import React, { useEffect } from 'react';
import { Button, Box, Container, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import successImage from '../assets/succes2.jpg';
import axios from "axios";
import { baseUrl } from '../base_url';
// material ui preloader import 
import CircularProgress from '@mui/material/CircularProgress';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [account , setAccount] = React.useState("Create an account with just the initials of your name");
    const [initials, setInitials] = React.useState();
    const [error, setError] = React.useState();
    const [success, setSuccess] = React.useState();
    const [auth , setAuth] = React.useState(1);
    const [accountId, setAccountId] = React.useState();
    const [loading, setLoading] = React.useState(false);
    // preloader message
    const [loadingMessage, setLoadingMessage] = React.useState('Creating Account...');

    const handleCreatAccount = async () => {
        console.log('Creating Account');
        setError('');
        if(!initials){
            setError('Please enter your initials');
            return;
        }


        // check if initals is numbers
        if(!/^[a-zA-Z]+$/.test(initials)){
            setError('Initials should only contain letters');
            return;
        }
        setLoading(true);

        const reponse = await axios.post(`${baseUrl}/signup`, {initials: initials});
        console.log(reponse.data);
        
        setLoading(false); 
        setAccount(`Your Account ID: ${reponse.data.accountId + reponse.data.initials}`);
        setSuccess("Account Created successfuly");
        setAccountId(reponse.data.accountId+reponse.data.initials);
    }

    const handleAuthToggle = (value) => {
        setAuth(value);
        setError('');
        setSuccess('');
        setAccountId('');
        setInitials('');
    };

    const handleLogin = async () => {
        setLoadingMessage('Logging In...');
        setLoading(true);
        setError('');
    
        if (accountId.length < 5) {
            setError('Account ID must be at least 5 characters long');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post(`${baseUrl}/login`, { accountIdInitials: accountId });
            setLoading(false);
            sessionStorage.setItem('ID', response.data.accountId + response.data.initials);
            window.location.reload();
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('Network error or server is not responding');
            }
        }
    };

    return (
        <Container 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                position: 'fixed'
            }}
        >
            <Box>
                {/* preload fixed on top */}
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

                {/* // creating account with just the initials of your name */}
                { auth === 0 && 
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: '24vh', my:5}}>
                        {!success ? (
                            <img src={logo} alt="Logo" style={{ width: '100%' }} />
                        ) : (
                            <img src={successImage} alt="Logo" style={{ width: '100%' }} />
                        )}
                    </Box>
                }
                
                { auth === 1 && 
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: '24vh', my:5}}>
                        <img src={logo} alt="Logo" style={{ width: '100%' }} />
                    </Box>
                }

                {/* display when auth == 0 */}
                { auth === 0 && 
                <>
                    <Typography variant='h5' color="secondary" align="center" sx={{ fontWeight: 800, my: 2 }}>
                        {account}
                    </Typography>

                    {!success && 
                        <TextField 
                            label="Enter your Initials"
                            variant="filled" 
                            value={initials}
                            onChange={(e) => setInitials(e.target.value)}
                            sx={{
                                width: "100%",
                                mt: 4,
                                mb:1,
                                justifyContent: 'center'
                            }}
                        />
                    }
                    {/* display erro if not empty message */}
                    {error && 
                        <Typography 
                            color="error"
                            align='center'
                            sx={{
                                my: 2
                            }}
                        >{error}</Typography>
                    }
                    
                    {success && 
                    <>
                        <Typography 
                            color="green"
                            align='center'
                            sx={{
                                my: 2
                            }}
                        >{success}</Typography>
                        
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{
                                width: '100%',
                                py: 2,
                            }}
                            onClick={ () => {setAuth(1)}}
                        >
                            Log In 
                        </Button>
                    </>
                            
                    }

                    {!success && 
                    <>

                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{
                            width: '100%',
                            py: 2,
                        }}
                        onClick={handleCreatAccount}
                    >
                        Create Account 
                    </Button>
                    <p style={{textAlign: 'center', padding: '20px 0' }}>OR</p>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        >
                        
                        <Button align="center" onClick={ () => handleAuthToggle(1)}>Already has an account? Login</Button>
                    </Box>
                </>}
                </>
                }

                { auth === 1 && 
                <>
                    <TextField 
                        label="Enter your Account ID"
                        variant="filled" 
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        sx={{
                            width: "100%",
                            mt: 4,
                            mb:3,
                            justifyContent: 'center'
                        }}
                    />
                    {/* display erro if not empty message */}
                    {error && 
                        <Typography 
                            color="error"
                            align='center'
                            sx={{
                                my: 2
                            }}
                        >{error}</Typography>
                    }
                    
                    {success && 
                        <Typography 
                            color="green"
                            align='center'
                            sx={{
                                my: 2
                            }}
                        >{success}</Typography>
                    }
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{
                            width: '100%',
                            py: 2,
                        }}
                        onClick={handleLogin}
                    >
                        Log In 
                    </Button>
                    <p style={{textAlign: 'center', padding: '20px 0' }}>OR</p>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        >
                        <Button align="center" 
                            onClick={ () => {setAuth(0)}}
                        >Create New Account</Button>
                    </Box>
                </>
                }

            </Box>

        </Container>
    )
}


export default LoginScreen