import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-[1.5rem] bg-white p-5 shadow-soft">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-terracotta">{Icon && <Icon />}</div>
      <p className="text-3xl font-black text-espresso">{value}</p>
      <p className="text-sm font-semibold text-coffee/65">{label}</p>
    </motion.div>
  );
}
