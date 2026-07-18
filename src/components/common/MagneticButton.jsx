import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className = '', as: Component = 'button', ...props }) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 15 });
  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };
  return (
    <motion.div style={{ x, y }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} className="inline-flex">
      <Component className={`inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-60 ${className}`} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}
