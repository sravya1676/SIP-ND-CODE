import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import AnimatedPage from '../../components/common/AnimatedPage';
import EmptyState from '../../components/common/EmptyState';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import SessionCard from '../../components/sessions/SessionCard';
import SessionQuickView from '../../components/sessions/SessionQuickView';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';

export default function Sessions() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('All');
  const [price, setPrice] = useState('All');
  const [sort, setSort] = useState('Soonest');
  const [quick, setQuick] = useState(null);
  const [modal, setModal] = useState(null);
  const category = params.get('category') || 'All';
  const { sessions, bookSession, toggleSaved, saved } = useDemoData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const results = useMemo(() => {
    return sessions
      .filter((session) => session.published !== false)
      .filter((session) => category === 'All' || session.category === category)
      .filter((session) => session.title.toLowerCase().includes(search.toLowerCase()) || session.description.toLowerCase().includes(search.toLowerCase()))
      .filter((session) => availability === 'All' || (availability === 'Available' ? session.seatsLeft > 0 : session.seatsLeft <= 0))
      .filter((session) => price === 'All' || (price === 'Free' ? session.price === 0 : session.price > 0))
      .sort((a, b) => sort === 'Seats' ? b.seatsLeft - a.seatsLeft : new Date(a.date) - new Date(b.date));
  }, [sessions, category, search, availability, price, sort]);

  const book = (session) => {
    if (!currentUser) return navigate('/login');
    const result = bookSession(session.id, currentUser.id);
    setModal({ title: result.ok ? 'Booked' : 'Notice', message: result.message });
    setQuick(null);
  };

  return (
    <AnimatedPage className="min-h-screen bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold text-terracotta">Sessions</p>
        <h1 className="font-display text-6xl text-espresso">Find your next table conversation.</h1>
        <div className="mt-8 grid gap-3 rounded-[2rem] bg-white p-4 shadow-soft lg:grid-cols-[1fr_auto_auto_auto_auto]">
          <label className="flex items-center gap-2 rounded-full bg-cream px-4"><Search size={18} /><input className="w-full bg-transparent py-3 outline-none" placeholder="Search sessions" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
          <select className="rounded-full bg-cream px-4 py-3" value={category} onChange={(e) => setParams(e.target.value === 'All' ? {} : { category: e.target.value })}>{['All', 'Learn', 'Connect', 'Unwind'].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="rounded-full bg-cream px-4 py-3" value={availability} onChange={(e) => setAvailability(e.target.value)}>{['All', 'Available', 'Full'].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="rounded-full bg-cream px-4 py-3" value={price} onChange={(e) => setPrice(e.target.value)}>{['All', 'Free', 'Paid'].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="rounded-full bg-cream px-4 py-3" value={sort} onChange={(e) => setSort(e.target.value)}>{['Soonest', 'Seats'].map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="flex items-center gap-2 font-bold text-coffee"><SlidersHorizontal size={18} /> {results.length} results</p>
          <button onClick={() => { setSearch(''); setAvailability('All'); setPrice('All'); setSort('Soonest'); setParams({}); }} className="rounded-full bg-white px-4 py-2 font-bold">Clear filters</button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((session) => <SessionCard key={session.id} session={session} onQuickView={setQuick} onBook={book} saved={saved.some((item) => currentUser && item.userId === currentUser.id && item.sessionId === session.id)} onSave={() => currentUser ? toggleSaved(session.id, currentUser.id) : navigate('/login')} />)}
        </div>
        {!results.length && <div className="mt-10"><EmptyState title="No matching sessions" text="Clear a filter or search for another cafe plan." /></div>}
      </div>
      <SessionQuickView session={quick} open={Boolean(quick)} onClose={() => setQuick(null)} onBook={book} />
      <ConfirmationModal open={Boolean(modal)} title={modal?.title} message={modal?.message} onClose={() => setModal(null)} />
    </AnimatedPage>
  );
}
