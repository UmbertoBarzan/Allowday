import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../services/apiClient';
const STORAGE_KEY = 'allowday.auth';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setUser(parsed.user);
                setToken(parsed.token);
            }
            catch (error) {
                window.localStorage.removeItem(STORAGE_KEY);
            }
        }
        setLoading(false);
    }, []);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        if (token && user) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
        }
        else {
            window.localStorage.removeItem(STORAGE_KEY);
        }
    }, [token, user]);
    const login = async (email, password) => {
        const response = await apiClient.post('/auth/login', { email, password });
        setUser(response.user);
        setToken(response.token);
    };
    const register = async (email, password, fullName) => {
        const response = await apiClient.post('/auth/register', { email, password, fullName });
        setUser(response.user);
        setToken(response.token);
    };
    const logout = () => {
        setUser(null);
        setToken(null);
    };
    const value = useMemo(() => ({ user, token, loading, login, register, logout }), [user, token, loading]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth deve essere usato all’interno di AuthProvider');
    }
    return ctx;
}
