const DEFAULT_IMAGE_CDN = 'https://phimimg.com';

export const IMAGE_CDN = import.meta.env.VITE_IMAGE_CDN || DEFAULT_IMAGE_CDN;

export function getImageUrl(path?: string | null): string {
  if (!path) return '/logo192.png';

  // Nếu đã là URL tuyệt đối, giữ nguyên
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Nếu là đường dẫn tương đối, ghép với CDN
  const base = IMAGE_CDN.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
