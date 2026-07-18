import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { makeId, storage } from '../services/localStorageService';

const DemoDataContext = createContext(null);

export function DemoDataProvider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [saved, setSaved] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [proposals, setProposals] = useState([]);

  const load = () => {
    storage.seed();
    setSessions(storage.get(storage.keys.sessions, []));
    setBookings(storage.get(storage.keys.bookings, []));
    setWaitlist(storage.get(storage.keys.waitlist, []));
    setSaved(storage.get(storage.keys.saved, []));
    setReservations(storage.get(storage.keys.reservations, []));
    setProposals(storage.get(storage.keys.proposals, []));
  };

  useEffect(load, []);

  const persist = (key, setter, value) => {
    setter(value);
    storage.set(key, value);
  };

  const bookSession = (sessionId, userId) => {
    if (bookings.some((item) => item.sessionId === sessionId && item.userId === userId)) return { ok: false, message: 'You already booked this session.' };
    if (waitlist.some((item) => item.sessionId === sessionId && item.userId === userId)) return { ok: false, message: 'Leave the waitlist before booking.' };
    const session = sessions.find((item) => item.id === sessionId);
    if (!session || session.seatsLeft <= 0) return { ok: false, message: 'This session is full. Join the waitlist instead.' };
    persist(storage.keys.bookings, setBookings, [...bookings, { id: makeId('BK'), userId, sessionId, createdAt: new Date().toISOString() }]);
    persist(storage.keys.sessions, setSessions, sessions.map((item) => (item.id === sessionId ? { ...item, seatsLeft: item.seatsLeft - 1, status: item.seatsLeft - 1 <= 2 ? 'Few Seats Left' : item.status } : item)));
    return { ok: true, message: 'Session booked.' };
  };

  const joinWaitlist = (sessionId, userId) => {
    if (bookings.some((item) => item.sessionId === sessionId && item.userId === userId)) return { ok: false, message: 'You already have a booking.' };
    if (waitlist.some((item) => item.sessionId === sessionId && item.userId === userId)) return { ok: false, message: 'You are already on the waitlist.' };
    persist(storage.keys.waitlist, setWaitlist, [...waitlist, { id: makeId('WL'), userId, sessionId, createdAt: new Date().toISOString() }]);
    return { ok: true, message: 'You joined the waitlist.' };
  };

  const cancelBooking = (sessionId, userId) => {
    persist(storage.keys.bookings, setBookings, bookings.filter((item) => !(item.sessionId === sessionId && item.userId === userId)));
    persist(storage.keys.sessions, setSessions, sessions.map((item) => (item.id === sessionId ? { ...item, seatsLeft: item.seatsLeft + 1, status: 'Open' } : item)));
  };

  const leaveWaitlist = (sessionId, userId) => persist(storage.keys.waitlist, setWaitlist, waitlist.filter((item) => !(item.sessionId === sessionId && item.userId === userId)));
  const toggleSaved = (sessionId, userId) => {
    const exists = saved.some((item) => item.sessionId === sessionId && item.userId === userId);
    persist(storage.keys.saved, setSaved, exists ? saved.filter((item) => !(item.sessionId === sessionId && item.userId === userId)) : [...saved, { sessionId, userId }]);
  };
  const addReservation = (reservation) => {
    const next = { ...reservation, id: makeId('RES'), status: 'Pending' };
    persist(storage.keys.reservations, setReservations, [...reservations, next]);
    return next;
  };
  const updateReservation = (id, status) => persist(storage.keys.reservations, setReservations, reservations.map((item) => (item.id === id ? { ...item, status } : item)));
  const addProposal = (proposal) => {
    const next = { ...proposal, id: makeId('PROP'), status: 'Pending Review', submittedAt: new Date().toISOString().slice(0, 10) };
    persist(storage.keys.proposals, setProposals, [...proposals, next]);
    return next;
  };
  const updateProposal = (id, status) => persist(storage.keys.proposals, setProposals, proposals.map((item) => (item.id === id ? { ...item, status } : item)));
  const upsertSession = (session) => {
    const next = session.id ? sessions.map((item) => (item.id === session.id ? session : item)) : [...sessions, { ...session, id: makeId('s'), slug: session.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), seatsLeft: Number(session.capacity), published: true }];
    persist(storage.keys.sessions, setSessions, next);
  };
  const resetDemo = () => {
    storage.reset();
    load();
  };

  const value = useMemo(() => ({ sessions, bookings, waitlist, saved, reservations, proposals, bookSession, joinWaitlist, cancelBooking, leaveWaitlist, toggleSaved, addReservation, updateReservation, addProposal, updateProposal, upsertSession, resetDemo }), [sessions, bookings, waitlist, saved, reservations, proposals]);
  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export const useDemoData = () => useContext(DemoDataContext);
