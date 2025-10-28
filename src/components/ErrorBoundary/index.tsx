import { Component, ErrorInfo, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.titleWapper}>
          <h1 className={styles.title}>Something went Wrong</h1>
          <p className={styles.subTitle}>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
