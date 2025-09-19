import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export function RequireAuth({ children }) {
    const { user, token, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (_jsx("div", { className: "flex min-h-[60vh] items-center justify-center text-slate-300", children: "Caricamento in corso..." }));
    }
    if (!user || !token) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    return children;
}
