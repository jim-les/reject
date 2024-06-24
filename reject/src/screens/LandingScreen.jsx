import React from 'react';
import { Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const LandingScreen = () => {
    const navigate = useNavigate()

    const handleOnGetStarted = () =>{
        navigate('/login')
    }

    return (
        <Container
        >
            {/* load a an embeded youtube video at background <iframe width="560" height="315" src="https://www.youtube.com/embed/9icc5w4wsk0?si=cT1RZLgjMr4BoCIH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            >
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    Help the Genz by donating to the cause today, Acha wakule lunch kwa amani waki pigania haki zao
                </marquee>
            </Box>

            {/* add animation the logo to scale up and down */}
            <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    width: '100%',
                    maxWidth: 300,
                    margin: '0 auto',
                    display: 'block',
                    mt: 10,
                    animation: 'logoAnimation 2s infinite',
                    transformOrigin: 'center',
                    '@keyframes logoAnimation': {
                        '0%': {
                            transform: 'scale(1)'
                        },
                        '50%': {
                            transform: 'scale(1.1)'
                        },
                        '100%': {
                            transform: 'scale(1)'
                        }
                    }
                }}

            />

            {/* {/* // Get started btn at the bottom/} */}
            <Button
                color="secondary"
                variant="contained"
                onClick={handleOnGetStarted}
                sx={{
                    width: '80%',
                    position: 'fixed',
                    bottom: 30,
                    py: 2,
                    mx: 3
                }}

            >
                Get Started
            </Button>

        </Container>
    )
}

export default LandingScreen