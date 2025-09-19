import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const from = location.state?.from?.pathname ?? '/dashboard';
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Accesso non riuscito');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Bentornato su Allowday" }), _jsx("p", { className: "text-sm text-slate-500", children: "Inserisci le credenziali per ritrovare il tuo calendario di spesa." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("label", { className: "text-sm text-slate-600", children: ["Email", _jsx(Input, { type: "email", autoComplete: "email", required: true, containerClassName: "mt-1 h-11 bg-[#f7f8fe]", value: email, onChange: (event) => setEmail(event.target.value) })] }), _jsxs("label", { className: "text-sm text-slate-600", children: ["Password", _jsx(Input, { type: "password", autoComplete: "current-password", required: true, containerClassName: "mt-1 h-11 bg-[#f7f8fe]", value: password, onChange: (event) => setPassword(event.target.value) })] }), error ? _jsx("p", { className: "text-sm text-[#f97068]", children: error }) : null, _jsx(Button, { type: "submit", disabled: loading, className: "w-full rounded-2xl", children: loading ? 'Accesso in corso…' : 'Accedi' })] }), _jsxs("p", { className: "text-sm text-slate-500", children: ["Prima volta qui?", ' ', _jsx(Link, { to: "/register", className: "text-allow-primary font-semibold", children: "Crea un account" })] })] }));
}
