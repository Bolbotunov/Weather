import { Component, ErrorInfo, PropsWithChildren } from 'react';

import { BoundaryState } from '@/types/types';

import styles from './styles.module.scss';

export class ErrorBoundary extends Component<PropsWithChildren, BoundaryState> {
  state: BoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): BoundaryState {
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
