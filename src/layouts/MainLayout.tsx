import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  CalendarRange,
  FileText,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const primaryNav = [
  { to: '/dashboard', label: 'Planner', icon: LayoutDashboard },
  { to: '/calendario', label: 'Calendario', icon: CalendarRange },
  { to: '/insights', label: 'Storico', icon: LineChart },
  { to: '/impostazioni', label: 'Impostazioni', icon: Settings },
];

const legalNav = [
  { to: '/legal/privacy', label: 'Privacy' },
  { to: '/legal/termini', label: 'Termini' },
  { to: '/legal/cookie', label: 'Cookie' },
  { to: '/legal/disclaimer', label: 'Disclaimer' },
];

export function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-allow-background text-slate-700">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-allow-primary"
      >
        Salta al contenuto
      </a>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-6 lg:flex-row lg:px-8 lg:py-10">
        <aside className="flex h-fit flex-col gap-6 rounded-3xl bg-white/90 p-6 shadow-soft lg:max-w-[270px]">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#5c6ac4] via-[#8d99ff] to-[#f59eb7] text-base font-black text-white shadow-soft">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-allow-primary">Allowday</p>
              <p className="text-xs text-slate-400">Piccoli passi, grande chiarezza</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#eef1ff] p-4">
            <p className="text-sm font-semibold text-allow-primary">Benvenuto{user?.fullName ? `, ${user.fullName}` : ''}</p>
            <p className="mt-1 text-xs text-slate-500">
              Inizia inserendo i tuoi numeri nella sezione Planner. Il calendario si colorerà da solo.
            </p>
          </div>

          <nav className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <NavItem key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="rounded-2xl bg-[#fdf2f3] p-5 text-xs text-slate-500">
            <div className="mb-2 flex items-center gap-2 text-allow-danger/80">
              <ShieldCheck className="h-4 w-4" />
              Sicurezza sempre attiva
            </div>
            I tuoi dati sono salvati in modo protetto. Puoi aggiornarli e cancellarli quando vuoi.
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#eef1ff] px-4 py-2 text-sm font-semibold text-allow-primary transition hover:bg-[#e1e6ff]"
          >
            <LogOut className="h-4 w-4" /> Esci
          </button>
        </aside>

        <div className="flex-1">
          <header className="sticky top-6 z-30 mb-6 rounded-3xl bg-white/90 p-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'rounded-2xl px-3 py-1.5 transition hover:bg-[#eef1ff] hover:text-allow-primary',
                        isActive && 'bg-[#5c6ac4]/10 text-allow-primary'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-slate-400">
                  <p className="font-semibold text-slate-600">{user?.fullName ?? user?.email}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
            </div>
          </header>

          <main id="contenuto" className="space-y-8 pb-12">
            <Outlet />
          </main>

          <footer className="mt-8 rounded-3xl bg-white/90 p-4 text-xs text-slate-400 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>© {new Date().getFullYear()} Allowday · Cresci con gentilezza.</p>
              <nav className="flex flex-wrap items-center gap-3">
                {legalNav.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      clsx('transition hover:text-allow-primary', isActive && 'text-allow-primary font-semibold')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href="mailto:ciao@allowday.it"
                  className="rounded-full bg-[#eef1ff] px-3 py-1 font-semibold text-allow-primary transition hover:bg-[#e1e6ff]"
                >
                  Supporto
                </a>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function NavItem({ to, icon: Icon, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-500 transition hover:bg-[#eef1ff] hover:text-allow-primary',
          isActive && 'bg-[#5c6ac4]/10 text-allow-primary'
        )
      }
    >
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#eef1ff] text-allow-primary">
        <Icon className="h-4 w-4" />
      </span>
      {children}
    </NavLink>
  );
}
