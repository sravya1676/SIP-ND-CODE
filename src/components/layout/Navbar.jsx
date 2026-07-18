import { AnimatePresence, motion } from 'framer-motion';
import { Coffee, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  ['/', 'Home'],
  ['/sessions', 'Sessions'],
  ['/cafe', 'Cafe'],
  ['/about', 'Community'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-coffee text-white' : 'text-coffee/75 hover:bg-white/70 hover:text-coffee'}`;
  const signOut = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? 'bg-cream/90 shadow-sm backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl text-espresso">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-white"><Coffee size={20} /></span>
          Cafe Aroma Meets
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map(([to, label]) => <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>)}
          {currentUser ? <NavLink to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} className={linkClass}>Dashboard</NavLink> : <NavLink to="/login" className={linkClass}>Sign In</NavLink>}
          <Link to="/sessions" className="ml-2 rounded-full bg-terracotta px-4 py-2 text-sm font-bold text-white shadow-soft">Explore Sessions</Link>
          {currentUser && <button aria-label="Log out" onClick={signOut} className="rounded-full p-2 text-coffee hover:bg-white"><LogOut size={18} /></button>}
        </div>
        <button className="rounded-full bg-white/80 p-2 lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-cream p-5 lg:hidden" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Cafe Aroma Meets</span>
              <button aria-label="Close navigation" onClick={() => setOpen(false)}><X /></button>
            </div>
            <div className="mt-10 grid gap-3">
              {nav.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={linkClass}>{label}</NavLink>)}
              <NavLink to="/host-session" onClick={() => setOpen(false)} className={linkClass}>Host a Session</NavLink>
              <NavLink to={currentUser ? '/dashboard' : '/login'} onClick={() => setOpen(false)} className={linkClass}>{currentUser ? 'Dashboard' : 'Sign In'}</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
