import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

test('renders CinemaFree header', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const logoElement = screen.getByText(/CinemaFree/i);
  expect(logoElement).toBeInTheDocument();
});
