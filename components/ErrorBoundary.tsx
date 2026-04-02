import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let parsedError = null;
      try {
        parsedError = JSON.parse(this.state.errorMessage);
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-triangle-exclamation text-red-500 text-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-red-400 text-sm mb-6">
              {parsedError?.error || this.state.errorMessage || "An unexpected error occurred."}
            </p>
            {parsedError?.operationType && (
              <div className="text-left bg-black/40 p-4 rounded-xl text-xs text-slate-400 font-mono mb-6 overflow-auto">
                <p>Operation: {parsedError.operationType}</p>
                <p>Path: {parsedError.path}</p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
