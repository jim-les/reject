import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';


const HomeScreen = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: "80vh",
                backgroundColor: "rgb(194, 194, 255)",
                overflow: 'hidden'
            }}
        >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbcZnJj_gvEPKfJy3ssGPW9Py4feuBvQU1pQ&s" alt="" 
                style={{
                    width: '100%'
                }}
            />
        </Box>
    )
}

export default HomeScreen