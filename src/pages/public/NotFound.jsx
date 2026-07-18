import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/common/AnimatedPage';

export default function NotFound() {
  return (
    <AnimatedPage className="grid min-h-screen place-items-center bg-cream px-4 py-28 text-center">
      <div>
        <p className="font-bold text-terracotta">404</p>
        <h1 className="font-display text-6xl">This table is not reserved.</h1>
        <Link className="mt-6 inline-flex rounded-full bg-espresso px-5 py-3 font-bold text-white" to="/">Back home</Link>
      </div>
    </AnimatedPage>
  );
}
