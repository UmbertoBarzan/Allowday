import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { PlannerProvider } from './context/PlannerContext';
import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CookiePage } from './pages/legal/CookiePage';
import { DisclaimerPage } from './pages/legal/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { RequireAuth } from './components/navigation/RequireAuth';
function App() {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(AuthLayout, { children: _jsx(LoginPage, {}) }) }), _jsx(Route, { path: "/register", element: _jsx(AuthLayout, { children: _jsx(RegisterPage, {}) }) }), _jsxs(Route, { element: _jsx(RequireAuth, { children: _jsx(PlannerProvider, { children: _jsx(MainLayout, {}) }) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "calendario", element: _jsx(CalendarPage, {}) }), _jsx(Route, { path: "insights", element: _jsx(InsightsPage, {}) }), _jsx(Route, { path: "impostazioni", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "onboarding", element: _jsx(OnboardingPage, {}) }), _jsxs(Route, { path: "legal", children: [_jsx(Route, { path: "privacy", element: _jsx(PrivacyPage, {}) }), _jsx(Route, { path: "termini", element: _jsx(TermsPage, {}) }), _jsx(Route, { path: "cookie", element: _jsx(CookiePage, {}) }), _jsx(Route, { path: "disclaimer", element: _jsx(DisclaimerPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] })] }) }));
}
export default App;
