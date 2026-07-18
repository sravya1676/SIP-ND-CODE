import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../../components/common/AnimatedPage';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';

const initial = { title: '', category: 'Learn', summary: '', description: '', hostBio: '', date: '', startTime: '', duration: '60', capacity: 20, paid: 'Free', price: 0, requirements: '', equipment: '', refreshments: '', cover: '', notes: '' };

export default function HostSession() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [modal, setModal] = useState(null);
  const { currentUser } = useAuth();
  const { addProposal } = useDemoData();
  const navigate = useNavigate();
  const submit = () => {
    if (!currentUser) return navigate('/login');
    const proposal = addProposal({ ...form, userId: currentUser.id });
    setModal({ title: 'Proposal submitted', message: `${proposal.id} is now pending review in your dashboard and the admin demo.` });
  };
  const fields = [
    [['title', 'Title'], ['category', 'Category'], ['summary', 'Summary']],
    [['description', 'Description'], ['hostBio', 'Host bio'], ['requirements', 'Requirements']],
    [['date', 'Date'], ['startTime', 'Start time'], ['duration', 'Duration'], ['capacity', 'Capacity'], ['paid', 'Free or paid'], ['price', 'Price']],
    [['equipment', 'Equipment'], ['refreshments', 'Refreshments'], ['cover', 'Cover-image preview URL'], ['notes', 'Additional notes']],
  ];
  return (
    <AnimatedPage className="bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <p className="font-bold text-terracotta">Host a session</p>
        <h1 className="font-display text-6xl">Turn a good idea into a cafe gathering.</h1>
        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="mb-6 flex gap-2">{['Basic details', 'Experience', 'Date and capacity', 'Review'].map((item, index) => <button key={item} onClick={() => setStep(index)} className={`rounded-full px-4 py-2 text-sm font-bold ${step === index ? 'bg-espresso text-white' : 'bg-cream text-coffee'}`}>{item}</button>)}</div>
          <div className="grid gap-4">
            {fields[step].map(([key, label]) => key === 'category' || key === 'paid' ? (
              <label key={key} className="grid gap-2 font-bold">{label}<select className="rounded-2xl bg-cream px-4 py-3" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>{(key === 'category' ? ['Learn', 'Connect', 'Unwind'] : ['Free', 'Paid']).map((item) => <option key={item}>{item}</option>)}</select></label>
            ) : (
              <label key={key} className="grid gap-2 font-bold">{label}{['description', 'hostBio', 'notes'].includes(key) ? <textarea className="min-h-28 rounded-2xl bg-cream px-4 py-3" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /> : <input type={key === 'date' ? 'date' : key === 'capacity' || key === 'price' ? 'number' : 'text'} className="rounded-2xl bg-cream px-4 py-3" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />}</label>
            ))}
          </div>
          <div className="mt-6 flex justify-between"><button className="rounded-full bg-cream px-5 py-3 font-bold" onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < 3 ? <button className="rounded-full bg-espresso px-5 py-3 font-bold text-white" onClick={() => setStep(step + 1)}>Next</button> : <button className="rounded-full bg-terracotta px-5 py-3 font-bold text-white" onClick={submit}>Submit Proposal</button>}</div>
        </div>
      </div>
      <ConfirmationModal open={Boolean(modal)} title={modal?.title} message={modal?.message} onClose={() => setModal(null)} />
    </AnimatedPage>
  );
}
