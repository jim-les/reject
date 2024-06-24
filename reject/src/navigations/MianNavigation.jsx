// src/components/MainNavigation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MainNavigation = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        switch (value) {
            case 0:
                navigate("/");
                break;
            case 1:
                navigate("/okoa");
                break;
            case 2:
                navigate("/profile");
                break;
            default:
                navigate("/okoa");
                break;
        }
    }, [value, navigate]);

    return (
        <Box sx={{ pb: 7 }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />}/>
                <BottomNavigationAction label="Okoa" icon={<MonetizationOnIcon />} />
                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default MainNavigation;
