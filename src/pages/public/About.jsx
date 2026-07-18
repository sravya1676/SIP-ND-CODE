import AnimatedPage from '../../components/common/AnimatedPage';
import { testimonials } from '../../data/testimonials';

export default function About() {
  return (
    <AnimatedPage className="bg-cream px-4 pb-20 pt-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-bold text-terracotta">Community/About</p>
        <h1 className="font-display text-6xl text-espresso">A neighborhood cafe shaped around useful introductions.</h1>
        <p className="mt-6 max-w-3xl text-lg text-coffee/70">Cafe Aroma Meets brings together students, professionals, creators, founders, mentors and people exploring new interests through warm, hosted sessions.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{['Students', 'Professionals', 'Creators', 'Founders', 'Mentors', 'New explorers'].map((item) => <div key={item} className="rounded-[2rem] bg-white p-8 font-display text-3xl shadow-soft">{item}</div>)}</div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">{testimonials.map((item) => <blockquote key={item.name} className="rounded-[2rem] bg-white p-7 shadow-soft"><p className="text-coffee/75">{item.text}</p><footer className="mt-5 font-bold text-espresso">{item.name} · {item.role}</footer></blockquote>)}</div>
      </div>
    </AnimatedPage>
  );
}
