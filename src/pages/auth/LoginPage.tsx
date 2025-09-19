import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Accesso non riuscito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Bentornato su Allowday</h1>
        <p className="text-sm text-slate-500">Inserisci le credenziali per ritrovare il tuo calendario di spesa.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Password
          <Input
            type="password"
            autoComplete="current-password"
            required
            containerClassName="mt-1 h-11 bg-[#f7f8fe]"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-[#f97068]">{error}</p> : null}
        <Button type="submit" disabled={loading} className="w-full rounded-2xl">
          {loading ? 'Accesso in corso…' : 'Accedi'}
        </Button>
      </form>
      <p className="text-sm text-slate-500">
        Prima volta qui?{' '}
        <Link to="/register" className="text-allow-primary font-semibold">
          Crea un account
        </Link>
      </p>
    </div>
  );
}
