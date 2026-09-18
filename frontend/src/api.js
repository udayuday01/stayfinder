const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export async function getListing() {
  try {
    const response = await fetch(`${API_BASE}/api/listing`);
    if (!response.ok) throw new Error(`Listing request failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.info('Using local listing fallback:', error.message);
    return null;
  }
}

export async function getQuote(payload) {
  const response = await fetch(`${API_BASE}/api/bookings/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Could not calculate quote');
  return data;
}
