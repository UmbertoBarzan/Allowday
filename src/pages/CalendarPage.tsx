import { PlanCalendar } from '../components/PlanCalendar';
import { usePlannerContext } from '../context/PlannerContext';

export function CalendarPage() {
  const { plan } = usePlannerContext();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-allow-primary">
          Il tuo calendario
        </span>
        <h1 className="text-3xl font-bold text-slate-800">Un colpo d’occhio e capisci come sta andando.</h1>
        <p className="text-sm text-slate-500">
          Guarda ogni giorno su un vero calendario: verde vai, giallo vai piano, rosso stop.
        </p>
      </header>

      <PlanCalendar plan={plan} />

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard title="Modalità hard">
          Sposta subito l’eccesso sul giorno dopo. Ottima se vuoi regole rigide e ripartire pulito.
        </InfoCard>
        <InfoCard title="Modalità soft">
          Spalma tutto sui giorni successivi. Ideale se preferisci piccole correzioni quotidiane.
        </InfoCard>
        <InfoCard title="Regole lampo">
          Cerca di restare almeno all’80% della quota. Se scendi, pianifica un giorno spesa zero.
        </InfoCard>
      </section>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 text-sm text-slate-500 shadow-soft">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <p className="mt-2 text-xs text-slate-500">{children}</p>
    </div>
  );
}
