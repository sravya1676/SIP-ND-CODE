import { Coffee, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-espresso px-4 py-12 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 font-display text-3xl"><Coffee /> Cafe Aroma Meets</div>
          <p className="max-w-sm text-cream/70">Coffee, sessions and generous introductions for students, creators, founders and curious professionals.</p>
        </div>
        <div><h3 className="font-bold">Explore</h3><div className="mt-3 grid gap-2 text-cream/70"><Link to="/sessions">Sessions</Link><Link to="/cafe">Cafe</Link><Link to="/host-session">Host</Link></div></div>
        <div><h3 className="font-bold">Visit</h3><p className="mt-3 text-cream/70">Indiranagar, Bengaluru<br />Mon-Fri 8 AM - 10 PM<br />Sat-Sun 9 AM - 11 PM</p></div>
        <div><h3 className="font-bold">Social</h3><div className="mt-3 flex gap-3"><Instagram /><Linkedin /><Mail /></div><p className="mt-5 text-sm text-cream/50">Privacy · Terms · © 2026</p></div>
      </div>
    </footer>
  );
}
