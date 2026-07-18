import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="fixed left-0 top-0 z-[70] h-1 origin-left bg-terracotta" style={{ scaleX, width: '100%' }} />;
}
