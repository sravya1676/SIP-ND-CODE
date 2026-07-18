import { Coffee } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here yet', text = 'Try adjusting your filters or come back soon.' }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-coffee/20 bg-white/70 p-10 text-center">
      <Coffee className="mx-auto mb-3 text-terracotta" />
      <h3 className="font-display text-2xl text-espresso">{title}</h3>
      <p className="mt-2 text-coffee/70">{text}</p>
    </div>
  );
}
