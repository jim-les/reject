import React, { useState, useEffect } from 'react';
import { List, ListItem } from '@mui/material';

// Function to generate a random 4-digit number
function getRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
}

// Function to generate a random string of 3 to 4 letters
function getRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const count = Math.floor(Math.random() * 4) + 3; // 3 to 4 characters
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random amount between 20 and 500
function getRandomAmount() {
    return Math.floor(Math.random() * 481) + 20; // Between 20 and 500
}

const HomeScreen = () => {
    const [transactions, setTransactions] = useState([]);

    // Function to generate initial transactions
    const generateInitialTransactions = () => {
        const initialTransactions = Array.from({ length: 50 }, (_, index) => ({
            id: index,
            accountID: `${getRandomNumber()}${getRandomString()}`,
            amount: getRandomAmount(),
        }));
        setTransactions(initialTransactions);
    };

    // Effect hook to generate initial transactions on mount
    useEffect(() => {
        generateInitialTransactions();
    }, []);

    // Function to add new transactions
    const addNewTransaction = () => {
        const newTransaction = {
            id: transactions.length,
            accountID: `${getRandomNumber()}${getRandomString()}`,
            amount: getRandomAmount(),
        };
        setTransactions([newTransaction,...transactions]);
    };

    // Simulate adding new tranasactions every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(addNewTransaction, 1000); // Adjust timing as needed
        return () => clearInterval(intervalId);
    }, [transactions]);

    return (
        <div style={{ height: '80vh', overflowY: 'scroll' }}>
            <List>
                {transactions.map((transaction) => (
                    <ListItem key={transaction.id}
                    sx={{
                        background: 'white',
                        mt: 1, p: 2,
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                        color: 'purple'

                    }}
                    >
                        {`${transaction.accountID} received KES ${transaction.amount}`}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default HomeScreen;
