import { Link } from 'react-router-dom';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f8fe] via-white to-[#fce9f0] text-slate-700">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-10">
        <header className="mb-10 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#5c6ac4] via-[#8d99ff] to-[#f59eb7] text-base font-black text-white shadow-soft">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-allow-primary">Allowday</p>
            <p className="text-xs text-slate-400">Piccoli passi, grande chiarezza</p>
          </div>
        </header>
        <main className="rounded-3xl border border-white/70 bg-white/90 p-10 shadow-soft backdrop-blur">
          {children}
        </main>
        <footer className="mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Allowday · <Link to="/legal/privacy" className="text-allow-primary underline">Privacy</Link>
        </footer>
      </div>
    </div>
  );
}
