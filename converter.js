function generateICalFromParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title') || urlParams.get('t') || 'Untitled Event';
    const start = urlParams.get('start') || urlParams.get('s') || '20251001T100000';
    const end = urlParams.get('end') || urlParams.get('e') || '20251001T110000';
    const description = urlParams.get('description') || urlParams.get('d') || '';
    const location = urlParams.get('location') || urlParams.get('l') || '';
    const now = new Date().toISOString().replace(/[-:]/g, '').replace('Z', '').split('.')[0];
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Berlin Social Club//Calendar//EN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@bsc`,
        `DTSTAMP:${now}`,
        `DTSTART;TZID=Europe/Berlin:${start}`,
        `DTEND;TZID=Europe/Berlin:${end}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `LAST-MODIFIED:${now}`,
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meetup.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

generateICalFromParams();
