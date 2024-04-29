// src/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);

    const setTokens = (tokens) => {
        setAuthTokens(tokens);
        localStorage.setItem('authTokens', JSON.stringify(tokens));
    };

    return (
        <AuthContext.Provider value={{ authTokens, setTokens }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
