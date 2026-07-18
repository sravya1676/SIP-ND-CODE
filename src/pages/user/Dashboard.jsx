import { useState } from 'react';
import { Bookmark, CalendarCheck, Coffee, Lightbulb, ListChecks, Users } from 'lucide-react';
import AnimatedPage from '../../components/common/AnimatedPage';
import StatCard from '../../components/dashboard/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';

export default function Dashboard() {
  const { currentUser, updateProfile } = useAuth();
  const { sessions, bookings, waitlist, reservations, proposals, saved, cancelBooking, leaveWaitlist, updateReservation } = useDemoData();
  const [profile, setProfile] = useState({ name: currentUser.name, interests: currentUser.interests?.join(', ') || '' });
  const mine = (list) => list.filter((item) => item.userId === currentUser.id);
  const sessionFor = (id) => sessions.find((item) => item.id === id);
  return (
    <AnimatedPage className="bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-6xl">Hi, {currentUser.name}.</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Bookings" value={mine(bookings).length} icon={CalendarCheck} />
          <StatCard label="Waitlist" value={mine(waitlist).length} icon={ListChecks} />
          <StatCard label="Reservations" value={mine(reservations).length} icon={Coffee} />
          <StatCard label="Proposals" value={mine(proposals).length} icon={Lightbulb} />
          <StatCard label="Saved" value={mine(saved).length} icon={Bookmark} />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Section title="Upcoming bookings">{mine(bookings).map((item) => <Row key={item.id} title={sessionFor(item.sessionId)?.title} meta={sessionFor(item.sessionId)?.date} action="Cancel" onClick={() => cancelBooking(item.sessionId, currentUser.id)} />)}</Section>
          <Section title="Waitlist entries">{mine(waitlist).map((item) => <Row key={item.id} title={sessionFor(item.sessionId)?.title} meta="Waitlist open" action="Leave" onClick={() => leaveWaitlist(item.sessionId, currentUser.id)} />)}</Section>
          <Section title="Cafe reservations">{mine(reservations).map((item) => <Row key={item.id} title={`${item.date} · ${item.time}`} meta={`${item.guests} guests · ${item.seating}`} status={item.status} action="Cancel" onClick={() => updateReservation(item.id, 'Cancelled')} />)}</Section>
          <Section title="Hosted-session proposals">{mine(proposals).map((item) => <Row key={item.id} title={item.title} meta={item.summary} status={item.status} />)}</Section>
          <Section title="Saved sessions">{mine(saved).map((item) => <Row key={item.sessionId} title={sessionFor(item.sessionId)?.title} meta={sessionFor(item.sessionId)?.category} />)}</Section>
          <section className="rounded-[2rem] bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl">Profile</h2>
            <label className="mt-4 grid gap-2 font-bold">Name<input className="rounded-2xl bg-cream px-4 py-3" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label>
            <label className="mt-4 grid gap-2 font-bold">Interests<input className="rounded-2xl bg-cream px-4 py-3" value={profile.interests} onChange={(e) => setProfile({ ...profile, interests: e.target.value })} /></label>
            <button className="mt-5 rounded-full bg-espresso px-5 py-3 font-bold text-white" onClick={() => updateProfile({ name: profile.name, interests: profile.interests.split(',').map((item) => item.trim()) })}>Update Profile</button>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
}

function Section({ title, children }) { return <section className="rounded-[2rem] bg-white p-6 shadow-soft"><h2 className="mb-4 font-display text-3xl">{title}</h2><div className="grid gap-3">{children?.length ? children : <p className="rounded-2xl bg-cream p-4 text-coffee/65">Nothing here yet.</p>}</div></section>; }
function Row({ title, meta, status, action, onClick }) { return <div className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-4"><div><p className="font-bold">{title}</p><p className="text-sm text-coffee/60">{meta}</p>{status && <div className="mt-2"><StatusBadge>{status}</StatusBadge></div>}</div>{action && <button className="rounded-full bg-white px-4 py-2 text-sm font-bold" onClick={onClick}>{action}</button>}</div>; }
