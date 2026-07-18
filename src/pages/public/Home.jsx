import { lazy, Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, Coffee, Mic, Network, Sparkles, Users } from 'lucide-react';
import AnimatedPage from '../../components/common/AnimatedPage';
import MagneticButton from '../../components/common/MagneticButton';
import SessionCard from '../../components/sessions/SessionCard';
import SessionQuickView from '../../components/sessions/SessionQuickView';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { testimonials } from '../../data/testimonials';
import { adminMetrics } from '../../data/metrics';

const CoffeeScene = lazy(() => import('../../components/three/CoffeeScene'));

export default function Home() {
  const { sessions, bookSession, toggleSaved, saved } = useDemoData();
  const { currentUser } = useAuth();
  const [quick, setQuick] = useState(null);
  const [modal, setModal] = useState(null);
  const [testimonial, setTestimonial] = useState(0);
  const navigate = useNavigate();

  const book = (session) => {
    if (!currentUser) return navigate('/login');
    const result = bookSession(session.id, currentUser.id);
    setModal({ title: result.ok ? 'You are in' : 'Almost there', message: result.message });
    setQuick(null);
  };

  return (
    <AnimatedPage className="bg-cream">
      <section className="hero-texture relative overflow-hidden px-4 pb-20 pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-terracotta shadow-sm">Coffee meets community</span>
            <h1 className="mt-6 max-w-3xl font-display text-6xl leading-[0.95] text-espresso sm:text-7xl lg:text-8xl">Coffee. Conversations. Communities.</h1>
            <p className="mt-6 max-w-xl text-lg text-coffee/75">A cafe where good coffee meets meaningful sessions, fresh ideas and people who share your interests.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton as={Link} to="/sessions">Explore Sessions <ArrowRight size={18} /></MagneticButton>
              <Link className="rounded-full border border-coffee/20 px-5 py-3 font-bold text-coffee hover:bg-white" to="/host-session">Host a Session</Link>
              <Link className="rounded-full bg-white px-5 py-3 font-bold text-coffee shadow-sm hover:bg-cream" to="/cafe">Reserve a Table</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-4 text-sm text-coffee/75">
              <span className="rounded-2xl bg-white/80 p-4 shadow-sm"><b>{adminMetrics.communityMembers}+</b><br />community members</span>
              <span className="rounded-2xl bg-white/80 p-4 shadow-sm"><b>Next:</b><br />AI Project · Aug 2</span>
            </div>
          </motion.div>
          <div className="relative">
            <Suspense fallback={<div className="grid h-[420px] place-items-center rounded-[2rem] bg-white text-coffee/60 shadow-soft">Brewing the hero...</div>}>
              <CoffeeScene />
            </Suspense>
            {['Learn', 'Connect', 'Unwind'].map((label, index) => (
              <motion.span key={label} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 + index }} className={`absolute rounded-full bg-white px-4 py-2 text-sm font-black text-coffee shadow-soft ${index === 0 ? 'left-4 top-10' : index === 1 ? 'right-6 top-28' : 'bottom-8 left-12'}`}>{label}</motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="font-bold text-terracotta">Featured sessions</p><h2 className="font-display text-5xl text-espresso">Reserve a place at the table.</h2></div>
            <Link to="/sessions" className="font-bold text-coffee">View all sessions</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sessions.slice(0, 6).map((session) => (
              <SessionCard key={session.id} session={session} onQuickView={setQuick} onBook={book} saved={saved.some((item) => currentUser && item.userId === currentUser.id && item.sessionId === session.id)} onSave={() => currentUser ? toggleSaved(session.id, currentUser.id) : navigate('/login')} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-5xl text-espresso">Learn, connect, unwind.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[['Learn', Sparkles, 'Technology, design, finance and career workshops.'], ['Connect', Network, 'Founder meetups, student circles and professional conversations.'], ['Unwind', Mic, 'Open mics, games, art evenings and quiz nights.']].map(([title, Icon, text]) => (
              <motion.div key={title} whileHover={{ scale: 1.025 }} className="rounded-[2rem] bg-white p-7 shadow-soft">
                <Icon className="mb-12 text-terracotta" size={34} />
                <h3 className="font-display text-4xl text-espresso">{title}</h3>
                <p className="mt-3 text-coffee/70">{text}</p>
                <Link to={`/sessions?category=${title}`} className="mt-6 inline-flex items-center gap-2 font-bold text-terracotta">See sessions <ArrowRight size={16} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="font-bold text-terracotta">How it works</p><h2 className="font-display text-5xl">Simple enough for a spontaneous plan.</h2></div>
          <div className="grid gap-4 md:grid-cols-4">
            {['Discover a session', 'Reserve your place', 'Meet at the cafe', 'Learn, connect or unwind'].map((step, index) => (
              <div key={step} className="rounded-[1.5rem] bg-white p-5 shadow-sm"><span className="text-3xl font-black text-terracotta">0{index + 1}</span><p className="mt-6 font-bold">{step}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {['photo-1501339847302-ac426a4a7cbb', 'photo-1511081692775-05d0f180a065', 'photo-1559925393-8be0ec4767c8', 'photo-1509042239860-f550ce710b93'].map((id, index) => (
              <img key={id} className={`h-64 w-full rounded-[1.5rem] object-cover ${index === 1 ? 'mt-10' : ''}`} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`} alt="Cafe workspace" />
            ))}
          </div>
          <div className="self-center">
            <p className="font-bold text-terracotta">Cafe workspace</p>
            <h2 className="font-display text-5xl text-espresso">Comfortable corners for focused days and social evenings.</h2>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['Wi-Fi', 'Charging access', 'Quiet corners', 'Group tables', 'Coffee', 'Refreshments'].map((item) => <span key={item} className="rounded-full bg-cream px-4 py-3 font-bold text-coffee">{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="font-bold text-terracotta">Community</p>
              <h2 className="font-display text-5xl">Students, professionals, creators, founders and mentors.</h2>
              <div className="mt-8 flex -space-x-4">{['1494790108377-be9c29b29330', '1500648767791-00dcc994a43e', '1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d', '1544005313-94ddf0286df2'].map((id) => <img key={id} className="h-16 w-16 rounded-full border-4 border-cream object-cover" src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=160&q=80`} alt="Community member" />)}</div>
            </div>
            <div className="rounded-[2rem] bg-espresso p-8 text-cream">
              <Coffee className="mb-10 text-peach" />
              <h3 className="font-display text-4xl">Have an idea for a session?</h3>
              <p className="mt-3 text-cream/70">Suggest a workshop, circle, salon, open mic or practical clinic. The demo admin dashboard can review every proposal.</p>
              <Link to="/host-session" className="mt-7 inline-flex rounded-full bg-peach px-5 py-3 font-bold text-espresso">Host a Session</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-beige/70 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Users className="mx-auto mb-5 text-terracotta" />
          <p className="text-xl text-coffee/70">{testimonials[testimonial].text}</p>
          <h3 className="mt-5 font-display text-3xl">{testimonials[testimonial].name}</h3>
          <p className="text-coffee/60">{testimonials[testimonial].role}</p>
          <div className="mt-6 flex justify-center gap-2">{testimonials.map((item, index) => <button key={item.name} aria-label={`Show testimonial ${index + 1}`} onClick={() => setTestimonial(index)} className={`h-3 w-3 rounded-full ${index === testimonial ? 'bg-terracotta' : 'bg-white'}`} />)}</div>
        </div>
      </section>
      <SessionQuickView session={quick} open={Boolean(quick)} onClose={() => setQuick(null)} onBook={book} />
      <ConfirmationModal open={Boolean(modal)} title={modal?.title} message={modal?.message} onClose={() => setModal(null)} />
    </AnimatedPage>
  );
}
