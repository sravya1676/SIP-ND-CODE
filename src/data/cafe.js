export const cafeInfo = {
  hours: ['Mon-Fri 8:00 AM - 10:00 PM', 'Sat-Sun 9:00 AM - 11:00 PM'],
  amenities: ['Fast Wi-Fi', 'Charging access', 'Quiet corners', 'Group tables', 'Projector nook', 'Coffee bar'],
  menu: ['Cardamom cappuccino', 'Cold brew tonic', 'Cinnamon mocha', 'Paneer pesto toast', 'Millet brownie', 'Seasonal iced tea'],
};

export const seedReservations = [
  { id: 'RES-1024', userId: 'u-demo', name: 'Demo User', phone: '9876543210', date: '2026-08-03', time: '5:30 PM', guests: 3, seating: 'Window table', status: 'Confirmed', request: 'Near charging point' },
  { id: 'RES-1025', userId: 'u3', name: 'Nisha Kapoor', phone: '9876500001', date: '2026-08-07', time: '4:00 PM', guests: 2, seating: 'Quiet corner', status: 'Pending', request: '' },
  { id: 'RES-1026', userId: 'u4', name: 'Arjun Patel', phone: '9876500002', date: '2026-08-11', time: '7:00 PM', guests: 5, seating: 'Group table', status: 'Pending', request: 'Board game friendly' },
];

export const seedProposals = [
  { id: 'PROP-301', userId: 'u-demo', title: 'Portfolio Critique Brunch', category: 'Learn', date: '2026-08-28', capacity: 18, status: 'Pending Review', submittedAt: '2026-07-18', summary: 'Friendly design portfolio reviews.' },
  { id: 'PROP-302', userId: 'u3', title: 'Pitch Practice Cafe', category: 'Connect', date: '2026-09-03', capacity: 22, status: 'Pending Review', submittedAt: '2026-07-18', summary: 'Short startup pitches with mentor feedback.' },
  { id: 'PROP-303', userId: 'u4', title: 'Slow Chess Evening', category: 'Unwind', date: '2026-09-06', capacity: 16, status: 'Pending Review', submittedAt: '2026-07-18', summary: 'Beginner-friendly chess and coffee.' },
];
