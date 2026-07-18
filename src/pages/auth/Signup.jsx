import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/common/AnimatedPage';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', interests: 'Design, Coffee' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (form.password.length < 6) return setError('Use at least 6 characters for this demo password.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    const result = signup({ ...form, interests: form.interests.split(',').map((item) => item.trim()).filter(Boolean) });
    if (!result.ok) return setError(result.message);
    navigate('/dashboard');
  };
  return (
    <AnimatedPage className="grid min-h-screen place-items-center bg-cream px-4 py-28">
      <form onSubmit={submit} className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-soft">
        <p className="font-bold text-terracotta">Create demo account</p>
        <h1 className="font-display text-5xl">Join the community.</h1>
        <p className="mt-4 rounded-2xl bg-cream p-4 text-sm text-coffee/70">This is a demo environment. Authentication is stored locally in your browser.</p>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Full name" value={form.name} onChange={(name) => setForm({ ...form, name })} required />
          <Input label="Email" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} required />
          <label className="grid gap-2 font-bold">Password<span className="flex rounded-2xl bg-cream px-4 py-3"><input className="w-full bg-transparent outline-none" type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button type="button" onClick={() => setShow(!show)} aria-label="Toggle password visibility">{show ? <EyeOff /> : <Eye />}</button></span></label>
          <Input label="Confirm password" type={show ? 'text' : 'password'} value={form.confirm} onChange={(confirm) => setForm({ ...form, confirm })} required />
          <Input label="Interests" value={form.interests} onChange={(interests) => setForm({ ...form, interests })} />
        </div>
        <button className="mt-6 w-full rounded-full bg-espresso px-5 py-3 font-bold text-white">Sign Up</button>
        <p className="mt-5 text-center text-sm">Already have an account? <Link className="font-bold text-terracotta" to="/login">Sign in</Link></p>
      </form>
    </AnimatedPage>
  );
}

function Input({ label, value, onChange, ...props }) { return <label className="grid gap-2 font-bold">{label}<input className="rounded-2xl bg-cream px-4 py-3" value={value} onChange={(e) => onChange(e.target.value)} {...props} /></label>; }
