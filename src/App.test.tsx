import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

test('renders CinemaFree header', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  const logoElement = screen.getByText(/CinemaFree/i);
  expect(logoElement).toBeInTheDocument();

  expect(consoleError).not.toHaveBeenCalled();
  expect(consoleWarn).not.toHaveBeenCalled();

  consoleError.mockRestore();
  consoleWarn.mockRestore();
});
