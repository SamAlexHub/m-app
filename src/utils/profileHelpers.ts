export const getPhotoUrl = (
  photo: any,
  fallback = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
): string => {
  if (!photo) return fallback;
  if (typeof photo === 'string' && photo.trim()) return photo;
  if (typeof photo === 'object' && photo.url && typeof photo.url === 'string' && photo.url.trim()) {
    return photo.url;
  }
  return fallback;
};

export const getPhotoList = (photos: any[] = []): string[] => {
  if (!Array.isArray(photos)) return [];
  return photos.map((p) => getPhotoUrl(p)).filter(Boolean);
};

export const renderText = (val: any, fallback = 'Not specified'): string => {
  if (val === null || val === undefined || val === '') return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'object') {
    return val.label || val.name || val.value || val.background || val.father || val.mother || val.title || val.zodiac || fallback;
  }
  return fallback;
};
