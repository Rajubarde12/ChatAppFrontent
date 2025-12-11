export const formatMessageTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();

  const isSameDay = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (isSameDay(date, now)) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  if (diffDays === 1) {

    return 'Yesterday';
  }

  if (diffDays < 7) {

    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // 👉 Otherwise show full date like "11 Dec 2025"
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
