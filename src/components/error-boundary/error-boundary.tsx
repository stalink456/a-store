import NotFound from 'pages/not-found';
import React, { ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <NotFound />;
    }

    return this.props.children;
  }
}
