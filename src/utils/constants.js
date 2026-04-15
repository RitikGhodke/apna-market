export const CATEGORIES = [
  { id: 'kirana', label: 'Kirana', emoji: '🛒', color: '#16a34a' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛', color: '#0284c7' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎', color: '#dc2626' },
  { id: 'food', label: 'Food', emoji: '🍱', color: '#d97706' },
  { id: 'medical', label: 'Medical', emoji: '💊', color: '#7c3aed' },
  { id: 'fashion', label: 'Fashion', emoji: '👗', color: '#db2777' },
  { id: 'electronics', label: 'Electronics', emoji: '📱', color: '#0891b2' },
];

export const ORDER_STATUS = {
  pending: { label: 'Pending', color: 'amber' },
  accepted: { label: 'Accepted', color: 'blue' },
  out_for_delivery: { label: 'Out for Delivery', color: 'purple' },
  delivered: { label: 'Delivered', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';