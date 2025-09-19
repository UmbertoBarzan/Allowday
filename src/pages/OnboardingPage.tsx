import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const steps = [
  {
    title: 'Metti i numeri di base',
    description: 'Saldo attuale, spese fisse e quanti giorni vuoi coprire. Serve solo questo.',
  },
  {
    title: 'Registra la spesa del giorno',
    description: 'Un click e il calendario si colora da solo. Verde, giallo o rosso.',
  },
  {
    title: 'Controlla il calendario',
    description: 'Se vedi rosso, riduci spese o allunga i giorni. Tutto è aggiornato in tempo reale.',
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary">
          Come funziona?
        </span>
        <h1 className="text-3xl font-bold text-slate-800">Tre mosse e hai il tuo semaforo personale.</h1>
        <p className="text-sm text-slate-500">Segui questi step ogni mattina. Bastano due minuti per stare tranquillo tutto il giorno.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eef1ff] text-sm font-semibold text-allow-primary">
              {index + 1}
            </span>
            <h2 className="text-lg font-semibold text-slate-700">{step.title}</h2>
            <p className="text-sm text-slate-500">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-gradient-to-r from-[#eef1ff] to-[#fdf2f3] p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          Hai già fatto questi step? Torna alla Dashboard per aggiornare la spesa e vedere il calendario cambiare colore.
        </p>
        <Button type="button" variant="primary" size="sm" className="rounded-2xl" onClick={() => navigate('/dashboard')}>
          Vai alla Dashboard
        </Button>
      </div>
    </div>
  );
}
