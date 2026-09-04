import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorFallback } from './ui/ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback
            title="Đã xảy ra lỗi"
            message={this.state.error?.message || 'Ứng dụng gặp sự cố không mong muốn.'}
            onRetry={() => this.setState({ hasError: false, error: null })}
          />
        )
      );
    }

    return this.props.children;
  }
}
