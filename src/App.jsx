import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollProgress from './components/common/ScrollProgress';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { AdminRoute, ProtectedRoute } from './components/layout/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DemoDataProvider } from './context/DemoDataContext';

const Home = lazy(() => import('./pages/public/Home'));
const Sessions = lazy(() => import('./pages/public/Sessions'));
const SessionDetails = lazy(() => import('./pages/public/SessionDetails'));
const Cafe = lazy(() => import('./pages/public/Cafe'));
const About = lazy(() => import('./pages/public/About'));
const HostSession = lazy(() => import('./pages/public/HostSession'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-cream text-coffee">Loading Cafe Aroma Meets...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:slug" element={<SessionDetails />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/about" element={<About />} />
          <Route path="/host-session" element={<HostSession />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/community" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DemoDataProvider>
        <ScrollProgress />
        <Navbar />
        <AppRoutes />
        <Footer />
      </DemoDataProvider>
    </AuthProvider>
  );
}
