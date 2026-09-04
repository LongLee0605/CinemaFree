export const formatDateTimeVN = (isoDate?: string): string => {
  if (!isoDate) return 'Không rõ';

  try {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return 'Không rõ';

    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(date);
  } catch {
    return 'Không rõ';
  }
};

export const formatYear = (year?: number): string => {
  if (!year) return '';
  return year.toString();
};
