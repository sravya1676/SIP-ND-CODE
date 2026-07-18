import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bookmark, Calendar, Coffee, Users } from 'lucide-react';
import AnimatedPage from '../../components/common/AnimatedPage';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import StatusBadge from '../../components/common/StatusBadge';
import SessionCard from '../../components/sessions/SessionCard';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';

export default function SessionDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { sessions, bookings, waitlist, saved, bookSession, joinWaitlist, cancelBooking, leaveWaitlist, toggleSaved } = useDemoData();
  const [modal, setModal] = useState(null);
  const session = sessions.find((item) => item.slug === slug);
  const related = useMemo(() => sessions.filter((item) => item.category === session?.category && item.id !== session?.id).slice(0, 3), [sessions, session]);
  if (!session) return <AnimatedPage className="bg-cream px-4 pb-20 pt-32"><div className="mx-auto max-w-4xl"><h1 className="font-display text-5xl">Session not found.</h1><Link to="/sessions">Back to sessions</Link></div></AnimatedPage>;

  const isBooked = currentUser && bookings.some((item) => item.userId === currentUser.id && item.sessionId === session.id);
  const isWaitlisted = currentUser && waitlist.some((item) => item.userId === currentUser.id && item.sessionId === session.id);
  const isSaved = currentUser && saved.some((item) => item.userId === currentUser.id && item.sessionId === session.id);
  const requireUser = () => {
    if (!currentUser) {
      navigate('/login');
      return false;
    }
    return true;
  };
  const act = (kind) => {
    if (!requireUser()) return;
    if (kind === 'book') setModal({ title: 'Booking update', message: bookSession(session.id, currentUser.id).message });
    if (kind === 'wait') setModal({ title: 'Waitlist update', message: joinWaitlist(session.id, currentUser.id).message });
    if (kind === 'cancel') { cancelBooking(session.id, currentUser.id); setModal({ title: 'Booking cancelled', message: 'Your seat has been released for another guest.' }); }
    if (kind === 'leave') { leaveWaitlist(session.id, currentUser.id); setModal({ title: 'Waitlist updated', message: 'You have left the waitlist.' }); }
  };

  return (
    <AnimatedPage className="bg-cream pb-20 pt-24">
      <div className="relative h-[46vh] min-h-[360px] overflow-hidden">
        <img className="h-full w-full object-cover" src={session.image} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
        <div className="absolute bottom-8 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4 text-white">
          <StatusBadge>{session.status}</StatusBadge>
          <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-7xl">{session.title}</h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px]">
        <article className="rounded-[2rem] bg-white p-7 shadow-soft">
          <p className="text-lg text-coffee/75">{session.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Info icon={Calendar} label="Date and time" value={`${session.date}, ${session.time}`} />
            <Info icon={Users} label="Capacity" value={`${session.seatsLeft}/${session.capacity} seats left`} />
            <Info icon={Coffee} label="Refreshments" value={session.refreshments} />
          </div>
          <h2 className="mt-10 font-display text-4xl">What you will leave with</h2>
          <div className="mt-4 grid gap-3">{session.outcomes.map((item) => <p key={item} className="rounded-2xl bg-cream p-4 font-semibold">{item}</p>)}</div>
          <h2 className="mt-10 font-display text-4xl">Session notes</h2>
          <ul className="mt-4 grid gap-2 text-coffee/75">{session.rules.map((item) => <li key={item}>• {item}</li>)}</ul>
        </article>
        <aside className="h-fit rounded-[2rem] bg-espresso p-6 text-cream shadow-soft">
          <p className="text-cream/60">Hosted by</p><h2 className="font-display text-3xl">{session.host}</h2>
          <p className="mt-4 text-3xl font-black">{session.price ? `₹${session.price}` : 'Free'}</p>
          <div className="mt-6 grid gap-3">
            {isBooked ? <button className="rounded-full bg-peach px-5 py-3 font-bold text-espresso" onClick={() => act('cancel')}>Cancel Booking</button> : session.seatsLeft > 0 ? <button className="rounded-full bg-peach px-5 py-3 font-bold text-espresso" onClick={() => act('book')}>Book Session</button> : null}
            {isWaitlisted ? <button className="rounded-full border border-cream/30 px-5 py-3 font-bold" onClick={() => act('leave')}>Leave Waitlist</button> : session.seatsLeft <= 0 && <button className="rounded-full bg-peach px-5 py-3 font-bold text-espresso" onClick={() => act('wait')}>Join Waitlist</button>}
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-5 py-3 font-bold" onClick={() => requireUser() && toggleSaved(session.id, currentUser.id)}><Bookmark fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save Session'}</button>
          </div>
        </aside>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 font-display text-4xl">Related sessions</h2>
        <div className="grid gap-6 md:grid-cols-3">{related.map((item) => <SessionCard key={item.id} session={item} />)}</div>
      </div>
      <ConfirmationModal open={Boolean(modal)} title={modal?.title} message={modal?.message} onClose={() => setModal(null)} />
    </AnimatedPage>
  );
}

function Info({ icon: Icon, label, value }) {
  return <div className="rounded-[1.25rem] bg-cream p-4"><Icon className="mb-4 text-terracotta" /><p className="text-xs font-bold uppercase text-coffee/50">{label}</p><p className="font-bold">{value}</p></div>;
}
