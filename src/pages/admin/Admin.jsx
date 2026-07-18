import { useState } from 'react';
import { CalendarCheck, Coffee, ListChecks, RefreshCw, Users } from 'lucide-react';
import AnimatedPage from '../../components/common/AnimatedPage';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import StatusBadge from '../../components/common/StatusBadge';
import StatCard from '../../components/dashboard/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';

export default function Admin() {
  const { users } = useAuth();
  const { sessions, bookings, waitlist, reservations, proposals, updateProposal, updateReservation, upsertSession, resetDemo } = useDemoData();
  const [draft, setDraft] = useState({ title: '', category: 'Learn', description: '', host: 'Cafe Team', date: '', time: '', capacity: 20, price: 0, status: 'Upcoming', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', outcomes: [], rules: [], refreshments: 'Cafe menu available', published: true });
  const [confirm, setConfirm] = useState(false);
  const save = (event) => {
    event.preventDefault();
    upsertSession({ ...draft, capacity: Number(draft.capacity), price: Number(draft.price) });
    setDraft({ ...draft, title: '', description: '', date: '', time: '' });
  };
  return (
    <AnimatedPage className="bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-bold text-terracotta">Admin demo</p><h1 className="font-display text-6xl">Cafe operations board.</h1></div><button className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 font-bold text-white" onClick={() => setConfirm(true)}><RefreshCw size={18} /> Reset Demo Data</button></div>
        <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
          <StatCard label="Users" value={users.length} icon={Users} /><StatCard label="Sessions" value={sessions.length} icon={Coffee} /><StatCard label="Bookings" value={bookings.length} icon={CalendarCheck} /><StatCard label="Waitlisted" value={waitlist.length} icon={ListChecks} /><StatCard label="Pending proposals" value={proposals.filter((p) => p.status === 'Pending Review').length} icon={Coffee} /><StatCard label="Reservations" value={reservations.length} icon={CalendarCheck} />
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl">Add new session</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {['title', 'host', 'date', 'time', 'capacity', 'price'].map((key) => <label key={key} className="grid gap-2 font-bold capitalize">{key}<input className="rounded-2xl bg-cream px-4 py-3" type={['capacity', 'price'].includes(key) ? 'number' : key === 'date' ? 'date' : 'text'} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} required={['title', 'date', 'time'].includes(key)} /></label>)}
              <label className="grid gap-2 font-bold">Category<select className="rounded-2xl bg-cream px-4 py-3" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>{['Learn', 'Connect', 'Unwind'].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="grid gap-2 font-bold">Status<select className="rounded-2xl bg-cream px-4 py-3" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>{['Open', 'Few Seats Left', 'Full', 'Waitlist Open', 'Upcoming', 'Completed'].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="grid gap-2 font-bold sm:col-span-2">Description<textarea className="min-h-24 rounded-2xl bg-cream px-4 py-3" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></label>
            </div>
            <button className="mt-5 rounded-full bg-terracotta px-5 py-3 font-bold text-white">Publish Session</button>
          </form>
          <Board title="Sessions">{sessions.map((item) => <AdminRow key={item.id} title={item.title} meta={`${item.category} · ${item.date}`} status={item.published === false ? 'Unpublished' : item.status} action={item.published === false ? 'Publish' : 'Unpublish'} onClick={() => upsertSession({ ...item, published: item.published === false })} />)}</Board>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Board title="Bookings">{bookings.map((item) => <AdminRow key={item.id} title={item.id} meta={item.sessionId} status="Confirmed" />)}</Board>
          <Board title="Waitlists">{waitlist.map((item) => <AdminRow key={item.id} title={item.id} meta={item.sessionId} status="Pending" />)}</Board>
          <Board title="Reservations">{reservations.map((item) => <AdminRow key={item.id} title={item.name} meta={`${item.date} · ${item.guests} guests`} status={item.status} action="Confirm" secondAction="Reject" onClick={() => updateReservation(item.id, 'Confirmed')} onSecond={() => updateReservation(item.id, 'Rejected')} />)}</Board>
        </div>
        <div className="mt-6"><Board title="Host proposals">{proposals.map((item) => <AdminRow key={item.id} title={item.title} meta={item.summary} status={item.status} action="Approve" secondAction="Reject" onClick={() => updateProposal(item.id, 'Approved')} onSecond={() => updateProposal(item.id, 'Rejected')} />)}</Board></div>
      </div>
      <ConfirmationModal open={confirm} title="Reset demo data?" message="This restores seeded sessions, users, reservations and proposal data in localStorage." action="Reset" onAction={() => { resetDemo(); setConfirm(false); }} onClose={() => setConfirm(false)} />
    </AnimatedPage>
  );
}

function Board({ title, children }) { return <section className="max-h-[540px] overflow-auto rounded-[2rem] bg-white p-6 shadow-soft"><h2 className="mb-4 font-display text-3xl">{title}</h2><div className="grid gap-3">{children}</div></section>; }
function AdminRow({ title, meta, status, action, secondAction, onClick, onSecond }) { return <div className="rounded-2xl bg-cream p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{title}</p><p className="text-sm text-coffee/60">{meta}</p></div><StatusBadge>{status}</StatusBadge></div><div className="mt-3 flex gap-2">{action && <button className="rounded-full bg-white px-3 py-2 text-xs font-bold" onClick={onClick}>{action}</button>}{secondAction && <button className="rounded-full bg-espresso px-3 py-2 text-xs font-bold text-white" onClick={onSecond}>{secondAction}</button>}</div></div>; }
