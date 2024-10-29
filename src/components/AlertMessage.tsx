'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface AlertMessageProps {
    message: string;
    onClose: () => void;
    onLogin: () => void;
}

const AlertMessage = ({ message, onClose, onLogin }: AlertMessageProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000); // Auto close after 5 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return createPortal(
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
                <p className="text-gray-700">{message}</p>
                <button
                    onClick={onLogin}
                    className="text-[#D62027] hover:underline font-medium"
                >
                    Login here
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                >
                    ×
                </button>
            </div>
        </div>,
        document.body
    );
};

export default AlertMessage; 