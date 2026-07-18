import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ConfirmationModal({ open, title, message, onClose, action, onAction }) {
  useEffect(() => {
    const handler = (event) => event.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-espresso/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true">
          <motion.div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-soft" initial={{ y: 24, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 14, scale: 0.98 }}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-terracotta">Cafe Aroma</p>
                <h2 className="font-display text-3xl text-espresso">{title}</h2>
              </div>
              <button aria-label="Close modal" className="rounded-full p-2 hover:bg-cream" onClick={onClose}><X size={20} /></button>
            </div>
            <p className="text-coffee/75">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-full px-4 py-2 font-semibold text-coffee hover:bg-cream" onClick={onClose}>Close</button>
              {action && <button className="rounded-full bg-espresso px-4 py-2 font-semibold text-white" onClick={onAction}>{action}</button>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
