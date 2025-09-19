import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
export function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register(email, password, fullName);
            navigate('/dashboard', { replace: true });
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Registrazione non riuscita');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Crea il tuo spazio Allowday" }), _jsx("p", { className: "text-sm text-slate-500", children: "Servono solo email e password. Il resto lo facciamo noi." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("label", { className: "text-sm text-slate-600", children: ["Nome (facoltativo)", _jsx(Input, { containerClassName: "mt-1 h-11 bg-[#f7f8fe]", value: fullName, onChange: (event) => setFullName(event.target.value) })] }), _jsxs("label", { className: "text-sm text-slate-600", children: ["Email", _jsx(Input, { type: "email", autoComplete: "email", required: true, containerClassName: "mt-1 h-11 bg-[#f7f8fe]", value: email, onChange: (event) => setEmail(event.target.value) })] }), _jsxs("label", { className: "text-sm text-slate-600", children: ["Password (minimo 8 caratteri)", _jsx(Input, { type: "password", autoComplete: "new-password", required: true, minLength: 8, containerClassName: "mt-1 h-11 bg-[#f7f8fe]", value: password, onChange: (event) => setPassword(event.target.value) })] }), error ? _jsx("p", { className: "text-sm text-[#f97068]", children: error }) : null, _jsx(Button, { type: "submit", disabled: loading, className: "w-full rounded-2xl", children: loading ? 'Creazione in corso…' : 'Registrati' })] }), _jsxs("p", { className: "text-sm text-slate-500", children: ["Hai gi\u00E0 un account?", ' ', _jsx(Link, { to: "/login", className: "text-allow-primary font-semibold", children: "Accedi" })] })] }));
}
