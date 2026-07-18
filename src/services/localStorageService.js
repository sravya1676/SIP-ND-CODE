import { sessions } from '../data/sessions';
import { seedUsers } from '../data/users';
import { seedReservations, seedProposals } from '../data/cafe';

const keys = {
  users: 'cam_users',
  currentUser: 'cam_current_user',
  sessions: 'cam_sessions',
  bookings: 'cam_bookings',
  waitlist: 'cam_waitlist',
  saved: 'cam_saved',
  reservations: 'cam_reservations',
  proposals: 'cam_proposals',
};

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const storage = {
  keys,
  seed() {
    if (!localStorage.getItem(keys.users)) write(keys.users, seedUsers);
    if (!localStorage.getItem(keys.sessions)) write(keys.sessions, sessions);
    if (!localStorage.getItem(keys.bookings)) write(keys.bookings, [{ id: 'BK-1001', userId: 'u-demo', sessionId: 's1', createdAt: '2026-07-18' }]);
    if (!localStorage.getItem(keys.waitlist)) write(keys.waitlist, [{ id: 'WL-2001', userId: 'u-demo', sessionId: 's7', createdAt: '2026-07-18' }]);
    if (!localStorage.getItem(keys.saved)) write(keys.saved, [{ userId: 'u-demo', sessionId: 's5' }]);
    if (!localStorage.getItem(keys.reservations)) write(keys.reservations, seedReservations);
    if (!localStorage.getItem(keys.proposals)) write(keys.proposals, seedProposals);
  },
  get: read,
  set: write,
  reset() {
    Object.values(keys).forEach((key) => localStorage.removeItem(key));
    this.seed();
  },
};

export const makeId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString().slice(-3)}`;
