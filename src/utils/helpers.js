export const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const truncate = (text, length = 50) => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'amber',
    accepted: 'blue',
    out_for_delivery: 'purple',
    delivered: 'green',
    cancelled: 'red'
  };
  return colors[status] || 'gray';
};