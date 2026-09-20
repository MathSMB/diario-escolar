/**
 * Generates a Google Calendar event creation URL for medications or medical appointments
 */
export const createGoogleCalendarUrl = ({
  title,
  details,
  location,
  startDate,
  time,
}: {
  title: string;
  details: string;
  location?: string;
  startDate?: string;
  time?: string;
}): string => {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

  // Format date and time
  const now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let day = String(now.getDate()).padStart(2, '0');

  if (startDate && startDate.includes('/')) {
    const parts = startDate.split('/');
    if (parts.length === 3) {
      day = parts[0].padStart(2, '0');
      month = parts[1].padStart(2, '0');
      year = parseInt(parts[2], 10);
    }
  }

  let startIso = `${year}${month}${day}`;
  let endIso = `${year}${month}${day}`;

  if (time && time.includes(':')) {
    const [hours, minutes] = time.split(':');
    const hNum = parseInt(hours, 10);
    const mNum = parseInt(minutes, 10);
    const endH = (hNum + 1) % 24;

    startIso += `T${String(hNum).padStart(2, '0')}${String(mNum).padStart(2, '0')}00`;
    endIso += `T${String(endH).padStart(2, '0')}${String(mNum).padStart(2, '0')}00`;
  } else {
    startIso += 'T080000';
    endIso += 'T083000';
  }

  const params = new URLSearchParams({
    text: title,
    details: details,
    location: location || 'Em casa / Rotina Familiar',
    dates: `${startIso}/${endIso}`,
  });

  return `${base}&${params.toString()}`;
};
