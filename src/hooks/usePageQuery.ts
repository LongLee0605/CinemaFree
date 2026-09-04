import { useSearchParams } from 'react-router-dom';

export function usePageQuery(): number {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}
