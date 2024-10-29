'use client';

import { useState, useEffect, useRef } from 'react';

interface ContactPopoverProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactPopover = ({ isOpen, onClose }: ContactPopoverProps) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Handle form submission logic here
            console.log('Submitted:', { email, message });
            setEmail('');
            setMessage('');
            onClose();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={popoverRef} className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg p-4 z-20">

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D62027]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D62027]"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#D62027] text-white py-2 rounded-md hover:bg-[#D62027]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D62027] ${loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactPopover; 