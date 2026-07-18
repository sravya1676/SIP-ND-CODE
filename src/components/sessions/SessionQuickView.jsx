import ConfirmationModal from '../common/ConfirmationModal';

export default function SessionQuickView({ session, open, onClose, onBook }) {
  return (
    <ConfirmationModal
      open={open}
      title={session?.title || 'Session'}
      message={session ? `${session.description} Hosted by ${session.host} on ${session.date} at ${session.time}. ${session.seatsLeft} seats remain.` : ''}
      action={session?.seatsLeft > 0 ? 'Book Session' : 'Join Waitlist'}
      onAction={() => onBook?.(session)}
      onClose={onClose}
    />
  );
}
