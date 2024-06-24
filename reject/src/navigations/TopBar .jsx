import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationIcon from '@mui/icons-material/NotificationAddRounded'

const TopBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', px: 2 }}>
            <Toolbar>
                <IconButton edge="start" color="dark" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                <Typography variant="h6" component="div" align="center" color="secondary" sx={{ flexGrow: 1 }}>
                    REJECT
                </Typography>
                <IconButton edge="end" color="dark" aria-label="account of current user">
                    <NotificationIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
