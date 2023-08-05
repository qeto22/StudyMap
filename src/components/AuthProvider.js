import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleInvalidToken = () => {
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        }

        const fetchUserData = async () => {
            // Set up the headers
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };

            try {
                const response = await axios.get('http://localhost:8080/api/v1/user', config);
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    handleInvalidToken()
                }
            } catch (error) {
                handleInvalidToken()
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};