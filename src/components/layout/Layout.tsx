import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  searchComponent?: React.ReactNode;
}

export function Layout({ children, searchComponent }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return (
    <div className="bg-mesh relative flex min-h-screen flex-col">
      <div className="noise" aria-hidden="true" />
      <Header searchComponent={searchComponent} />
      <main className="relative flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
