import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  errorInfo?: React.ErrorInfo;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary, errorInfo }) => {
  // Extract component stack for better debugging
  const getComponentStack = () => {
    if (!errorInfo?.componentStack) return null;
    
    // Parse component stack to extract file/component information
    const stack = errorInfo.componentStack
      .split('\n')
      .filter(line => line.trim())
      .slice(0, 5) // Show top 5 components in stack
      .map(line => line.trim());
    
    return stack;
  };

  // Extract file path from error stack if available
  const getErrorLocation = () => {
    if (!error.stack) return null;
    
    // Look for file references in the stack trace
    const stackLines = error.stack.split('\n');
    const fileMatch = stackLines.find(line => 
      line.includes('.tsx') || line.includes('.ts') || line.includes('.jsx') || line.includes('.js')
    );
    
    if (fileMatch) {
      // Extract just the file path and line number
      const match = fileMatch.match(/([^/\\]+\.(tsx?|jsx?)):(\d+):(\d+)/);
      if (match) {
        return {
          file: match[1],
          line: match[3],
          column: match[4]
        };
      }
    }
    
    return null;
  };

  const componentStack = getComponentStack();
  const errorLocation = getErrorLocation();
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-tertiary rounded-lg p-6 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            🚫 Application Error
          </h2>
          <p className="text-secondary text-sm mb-4">
            An unexpected error occurred. Here are the details:
          </p>
        </div>
        
        {/* Error Location Information */}
        {errorLocation && (
          <div className="mb-4 p-4 bg-red-900/20 rounded border border-red-500/30">
            <h3 className="text-red-400 font-semibold mb-2 flex items-center justify-center gap-2">
              📁 Error Location
            </h3>
            <div className="text-sm text-red-300 font-mono">
              <p><strong>File:</strong> {errorLocation.file}</p>
              <p><strong>Line:</strong> {errorLocation.line}, <strong>Column:</strong> {errorLocation.column}</p>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        <div className="mb-4 p-4 bg-primary rounded border border-gray-600">
          <h3 className="text-yellow-400 font-semibold mb-2 flex items-center justify-center gap-2">
            ⚠️ Error Message
          </h3>
          <p className="text-red-400 text-sm font-mono break-all">
            {error.message || 'Unknown error occurred'}
          </p>
        </div>

        {/* Component Stack (Development Only) */}
        {isDevelopment && componentStack && componentStack.length > 0 && (
          <div className="mb-4 p-4 bg-blue-900/20 rounded border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center justify-center gap-2">
              🔗 Component Stack
            </h3>
            <div className="text-xs text-blue-300 font-mono text-left max-h-32 overflow-y-auto">
              {componentStack.map((line, index) => (
                <div key={index} className="py-1 border-b border-blue-500/10 last:border-b-0">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Stack Trace (Development Only) */}
        {isDevelopment && error.stack && (
          <div className="mb-6 p-4 bg-gray-900/50 rounded border border-gray-500/30">
            <h3 className="text-gray-400 font-semibold mb-2 flex items-center justify-center gap-2">
              🔍 Stack Trace
            </h3>
            <details className="text-left">
              <summary className="cursor-pointer text-gray-300 text-sm hover:text-white transition-colors">
                Click to expand full stack trace
              </summary>
              <pre className="text-xs text-gray-400 font-mono mt-2 p-2 bg-black/30 rounded overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                {error.stack}
              </pre>
            </details>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            🔄 Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            🔃 Reload Page
          </button>
          
          {isDevelopment && (
            <button
              onClick={() => {
                console.clear();
                resetErrorBoundary();
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              🧹 Clear Console & Retry
            </button>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-secondary text-xs">
            {isDevelopment ? (
              <>👨‍💻 Development Mode: Full error details shown above</>
            ) : (
              <>If this problem persists, please contact support.</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  children, 
  fallbackComponent: FallbackComponent = ErrorFallback 
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Enhanced error logging with more context
    console.group('🚫 Error Boundary Caught an Error');
    console.error('Error:', error);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Info:', errorInfo);
    
    // Log the current URL and timestamp
    console.error('URL:', window.location.href);
    console.error('Timestamp:', new Date().toISOString());
    
    // Log user agent for device/browser debugging
    console.error('User Agent:', navigator.userAgent);
    console.groupEnd();
    
    // In production, you might want to send this to an error reporting service
    if (!import.meta.env.DEV) {
      // Example: Sentry, LogRocket, Bugsnag, etc.
      // errorReportingService.captureException(error, { 
      //   extra: { 
      //     ...errorInfo, 
      //     url: window.location.href,
      //     userAgent: navigator.userAgent,
      //     timestamp: new Date().toISOString()
      //   } 
      // });
    }
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={(props) => (
        <FallbackComponent {...props} errorInfo={props.errorInfo} />
      )}
      onError={handleError}
      onReset={() => {
        // Reset any state or perform cleanup if needed
        window.location.hash = '';
        console.clear();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;