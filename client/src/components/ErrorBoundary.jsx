import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100">
                        <h1 className="text-3xl font-bold text-red-600 mb-4 font-heading">Something went wrong.</h1>
                        <p className="text-slate-600 mb-6">
                            The application encountered an unexpected error. Please refresh the page or try again later.
                        </p>

                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto mb-6">
                            <p className="text-red-400 font-mono text-sm mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre className="text-slate-400 font-mono text-xs">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </div>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
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

export default ErrorBoundary;
