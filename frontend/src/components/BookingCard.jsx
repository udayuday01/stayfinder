import { useMemo, useState } from 'react';

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  return Math.max(0, Math.round((end - start) / 86400000));
}

export default function BookingCard({ listing, onReserve }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const nights = nightsBetween(checkIn, checkOut);
  const valid = checkIn && checkOut && nights > 0;
  const subtotal = listing.pricePerNight * (valid ? nights : 1);
  const total = subtotal + listing.cleaningFee + listing.serviceFee;
  const dateMin = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function submit() {
    if (!checkIn || !checkOut) return onReserve({ error: 'Please choose check-in and checkout dates.' });
    if (nights <= 0) return onReserve({ error: 'Checkout must be after check-in.' });
    if (Number(guests) > listing.guests) return onReserve({ error: `This stay accommodates up to ${listing.guests} guests.` });
    onReserve({ checkIn, checkOut, guests: Number(guests), nights, total });
  }

  return (
    <aside className="booking-card">
      <div className="booking-price"><strong>₹{listing.pricePerNight.toLocaleString('en-IN')}</strong><span> night</span></div>
      <div className="booking-fields">
        <label><span>CHECK-IN</span><input type="date" min={dateMin} value={checkIn}
          onChange={e => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(''); }} /></label>
        <label><span>CHECKOUT</span><input type="date" min={checkIn || dateMin} value={checkOut}
          onChange={e => setCheckOut(e.target.value)} /></label>
        <label className="guest-select"><span>GUESTS</span>
          <select value={guests} onChange={e => setGuests(e.target.value)}>
            {Array.from({ length: listing.guests }, (_, i) => i + 1).map(n =>
              <option value={n} key={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </label>
      </div>
      <button className="reserve-button" onClick={submit}>Reserve</button>
      <p className="booking-note">You won't be charged yet</p>
      <div className="cost-row"><span>₹{listing.pricePerNight.toLocaleString('en-IN')} × {valid ? nights : 1} {valid && nights === 1 ? 'night' : 'nights'}</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
      <div className="cost-row"><span>Cleaning fee</span><span>₹{listing.cleaningFee.toLocaleString('en-IN')}</span></div>
      <div className="cost-row"><span>Service fee</span><span>₹{listing.serviceFee.toLocaleString('en-IN')}</span></div>
      <hr />
      <div className="cost-row total-row"><strong>Total before taxes</strong><strong>₹{total.toLocaleString('en-IN')}</strong></div>
    </aside>
  );
}
