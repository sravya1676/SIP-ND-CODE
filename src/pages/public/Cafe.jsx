import { useState } from 'react';
import AnimatedPage from '../../components/common/AnimatedPage';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { cafeInfo } from '../../data/cafe';

export default function Cafe() {
  const { currentUser } = useAuth();
  const { addReservation } = useDemoData();
  const [form, setForm] = useState({ date: '', time: '', guests: 2, seating: 'Window table', name: currentUser?.name || '', phone: '', request: '' });
  const [modal, setModal] = useState(null);
  const submit = (event) => {
    event.preventDefault();
    const reservation = addReservation({ ...form, userId: currentUser?.id || 'guest' });
    setModal({ title: 'Table requested', message: `Your demo reservation ID is ${reservation.id}. It is visible in the dashboard after sign in.` });
  };
  return (
    <AnimatedPage className="bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="font-bold text-terracotta">Cafe</p><h1 className="font-display text-6xl text-espresso">A warm workspace with very good coffee.</h1><p className="mt-5 text-lg text-coffee/70">Quiet corners in the morning, generous tables by evening and session energy when the lights get warmer.</p></div>
          <div className="grid grid-cols-2 gap-4">{['photo-1501339847302-ac426a4a7cbb', 'photo-1559925393-8be0ec4767c8', 'photo-1495474472287-4d71bcdd2085', 'photo-1511081692775-05d0f180a065'].map((id, index) => <img key={id} className={`h-60 w-full rounded-[1.5rem] object-cover ${index % 2 ? 'mt-8' : ''}`} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`} alt="Cafe interior" />)}</div>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Panel title="Menu preview" items={cafeInfo.menu} />
          <Panel title="Amenities" items={cafeInfo.amenities} />
          <Panel title="Opening hours" items={cafeInfo.hours} />
        </div>
        <form onSubmit={submit} className="mt-16 rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="font-display text-4xl">Reserve a cafe table</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input label="Date" type="date" value={form.date} onChange={(date) => setForm({ ...form, date })} required />
            <Input label="Time" value={form.time} onChange={(time) => setForm({ ...form, time })} placeholder="5:30 PM" required />
            <Input label="Guests" type="number" min="1" value={form.guests} onChange={(guests) => setForm({ ...form, guests })} required />
            <label className="grid gap-2 font-bold">Seating preference<select className="rounded-2xl bg-cream px-4 py-3" value={form.seating} onChange={(e) => setForm({ ...form, seating: e.target.value })}>{['Window table', 'Quiet corner', 'Group table', 'Coffee bar'].map((item) => <option key={item}>{item}</option>)}</select></label>
            <Input label="Name" value={form.name} onChange={(name) => setForm({ ...form, name })} required />
            <Input label="Phone" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} required />
            <label className="grid gap-2 font-bold md:col-span-2">Special request<textarea className="min-h-24 rounded-2xl bg-cream px-4 py-3" value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} /></label>
          </div>
          <button className="mt-6 rounded-full bg-espresso px-6 py-3 font-bold text-white">Request Reservation</button>
        </form>
      </div>
      <ConfirmationModal open={Boolean(modal)} title={modal?.title} message={modal?.message} onClose={() => setModal(null)} />
    </AnimatedPage>
  );
}

function Panel({ title, items }) { return <div className="rounded-[2rem] bg-white p-6 shadow-soft"><h2 className="font-display text-3xl">{title}</h2><div className="mt-4 grid gap-2">{items.map((item) => <span key={item} className="rounded-full bg-cream px-4 py-2 font-semibold">{item}</span>)}</div></div>; }
function Input({ label, value, onChange, ...props }) { return <label className="grid gap-2 font-bold">{label}<input className="rounded-2xl bg-cream px-4 py-3" value={value} onChange={(e) => onChange(e.target.value)} {...props} /></label>; }
