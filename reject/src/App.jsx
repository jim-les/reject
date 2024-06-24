import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import MianNavigation from './navigations/MianNavigation';
import TopBar from './navigations/TopBar ';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import OkoaScreen from './screens/OkoaScreen';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';

// Navigations
const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const userId = sessionStorage.getItem('ID');
    
    // check for session is logged in if userID exists
    useEffect(() => {
        if (userId) {
            setLoggedIn(true);
        }
        if (!userId) {
            setLoggedIn(false);
        }
    }, [userId]);

    if (!loggedIn) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </Router>
        );
    }
    if (loggedIn) {
        return (
            <Router>
                <TopBar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/okoa" element={<OkoaScreen />} />
                </Routes>
                <MianNavigation />
            </Router>
        );
    }
};

export default App;