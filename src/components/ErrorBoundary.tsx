import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-tertiary rounded-lg p-6 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-secondary text-sm mb-4">
            We're sorry for the inconvenience. An unexpected error occurred.
          </p>
        </div>
        
        <div className="mb-6 p-4 bg-primary rounded border border-gray-600">
          <p className="text-red-400 text-xs font-mono break-all">
            {error.message}
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            Reload Page
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-secondary text-xs">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to console in development
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // In production, you might want to send this to an error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    // errorReportingService.captureException(error, { extra: errorInfo });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Reset any state or perform cleanup if needed
        window.location.hash = '';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;