import React, { createContext, useState, useContext } from 'react';

const UsuarioContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const login = (id) => {
        setUserId(id);
    };

    const logout = () => {
        setUserId(null);
      };

    return (
        <UsuarioContext.Provider value={{ userId, login, logout }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUser = () => useContext(UsuarioContext);
