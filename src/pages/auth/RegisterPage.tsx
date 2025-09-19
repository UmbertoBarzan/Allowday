import { FormEvent, useState } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(email, password, fullName);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrazione non riuscita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Crea il tuo spazio Allowday</h1>
        <p className="text-sm text-slate-500">Servono solo email e password. Il resto lo facciamo noi.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm text-slate-600">
          Nome (facoltativo)
          <Input
            containerClassName="mt-1 h-11 bg-[#f7f8fe]"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600">
          Email
          <Input
            type="email"
            autoComplete="email"
            required
            containerClassName="mt-1 h-11 bg-[#f7f8fe]"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="text-sm text-slate-600">
          Password (minimo 8 caratteri)
          <Input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            containerClassName="mt-1 h-11 bg-[#f7f8fe]"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-[#f97068]">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full rounded-2xl">
          {loading ? 'Creazione in corso…' : 'Registrati'}
        </Button>
      </form>
      <p className="text-sm text-slate-500">
        Hai già un account?{' '}
        <Link to="/login" className="text-allow-primary font-semibold">
          Accedi
        </Link>
      </p>
    </div>
  );
}
