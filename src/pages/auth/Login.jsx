import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/common/AnimatedPage';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: 'user@cafearoma.demo', password: 'user123', remember: true });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    const result = login(form);
    if (!result.ok) return setError(result.message);
    navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
  };
  return (
    <AnimatedPage className="grid min-h-screen place-items-center bg-cream px-4 py-28">
      <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-soft">
        <p className="font-bold text-terracotta">Demo sign in</p>
        <h1 className="font-display text-5xl">Welcome back.</h1>
        <p className="mt-4 rounded-2xl bg-cream p-4 text-sm text-coffee/70">This is a demo environment. Authentication is stored locally in your browser.</p>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <label className="mt-5 grid gap-2 font-bold">Email<input className="rounded-2xl bg-cream px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="mt-4 grid gap-2 font-bold">Password<span className="flex rounded-2xl bg-cream px-4 py-3"><input className="w-full bg-transparent outline-none" type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button type="button" aria-label="Toggle password visibility" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</button></span></label>
        <label className="mt-4 flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} /> Remember me</label>
        <button className="mt-6 w-full rounded-full bg-espresso px-5 py-3 font-bold text-white">Sign In</button>
        <p className="mt-5 text-center text-sm">Need an account? <Link className="font-bold text-terracotta" to="/signup">Create one</Link></p>
        <p className="mt-4 text-xs text-coffee/55">Admin: admin@cafearoma.demo / admin123<br />User: user@cafearoma.demo / user123</p>
      </form>
    </AnimatedPage>
  );
}
