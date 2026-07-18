const styles = {
  Open: 'bg-sage/15 text-sage',
  'Few Seats Left': 'bg-terracotta/15 text-terracotta',
  Full: 'bg-espresso text-white',
  'Waitlist Open': 'bg-peach text-coffee',
  Upcoming: 'bg-beige text-coffee',
  Completed: 'bg-zinc-200 text-zinc-600',
  Confirmed: 'bg-sage/15 text-sage',
  Pending: 'bg-peach text-coffee',
  Rejected: 'bg-red-100 text-red-700',
  Approved: 'bg-sage/15 text-sage',
  Published: 'bg-sage/15 text-sage',
  Unpublished: 'bg-zinc-200 text-zinc-600',
};

export default function StatusBadge({ children }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[children] || 'bg-beige text-coffee'}`}>{children}</span>;
}
