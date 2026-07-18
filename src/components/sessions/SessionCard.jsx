import { Bookmark, Calendar, Clock, Eye, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

export default function SessionCard({ session, onQuickView, onBook, saved, onSave }) {
  return (
    <motion.article layout whileHover={{ y: -8 }} className="group overflow-hidden rounded-[1.6rem] bg-white shadow-soft">
      <div className="relative h-52 overflow-hidden">
        <img className="h-full w-full object-cover transition duration-700 group-hover:scale-110" src={session.image} alt="" />
        <div className="absolute left-4 top-4"><StatusBadge>{session.status}</StatusBadge></div>
        <button aria-label="Save session" onClick={() => onSave?.(session)} className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-coffee shadow">
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-terracotta">{session.category}</span>
          <span className="text-sm font-bold text-coffee">{session.price ? `₹${session.price}` : 'Free'}</span>
        </div>
        <h3 className="font-display text-2xl text-espresso">{session.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-coffee/70">{session.description}</p>
        <div className="mt-4 grid gap-2 text-sm text-coffee/70">
          <span className="flex items-center gap-2"><Calendar size={16} /> {session.date}</span>
          <span className="flex items-center gap-2"><Clock size={16} /> {session.time} · {session.host}</span>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-semibold"><span>{session.seatsLeft} seats left</span><span>{session.capacity} total</span></div>
          <div className="h-2 rounded-full bg-beige"><div className="h-full rounded-full bg-sage" style={{ width: `${Math.max(6, (session.seatsLeft / session.capacity) * 100)}%` }} /></div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to={`/sessions/${session.slug}`} className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2 text-sm font-bold text-white"><Eye size={16} /> Details</Link>
          <button onClick={() => onQuickView?.(session)} className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-coffee">Quick View</button>
          <button disabled={session.seatsLeft <= 0} onClick={() => onBook?.(session)} className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-bold text-white disabled:opacity-50"><Ticket size={16} /> Book</button>
        </div>
      </div>
    </motion.article>
  );
}
