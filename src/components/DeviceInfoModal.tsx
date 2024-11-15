'use client';

import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';

interface DeviceInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

const DeviceInfoModal = ({ isOpen, onClose, data }: DeviceInfoModalProps) => {
    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    if (!isOpen) return null;

    const handleSave = async () => {
        setSaving(true);
        try {
            // Call your save endpoint here
            // const response = await axios.post('/api/save-device-info', data);
            setIsSaved(true);
            toast.success('Device information saved successfully');
        } catch (error) {
            toast.error('Failed to save device information');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white/90 w-full max-w-2xl rounded-lg shadow-xl p-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                    <button
                        onClick={handleSave}
                        disabled={saving || isSaved}
                        className="text-xl hover:text-[#D62027] transition-colors"
                    >
                        {isSaved ? (
                            <FaBookmark className="text-[#D62027]" />
                        ) : (
                            <FaRegBookmark className={saving ? 'opacity-50' : ''} />
                        )}
                    </button>
                    <h2 className="text-xl font-semibold">Device Info</h2>
                    <button
                        onClick={onClose}
                        className="text-xl hover:text-[#D62027] transition-colors"
                    >
                        <IoClose />
                    </button>
                </div>

                {/* Content */}
                <div className="mt-4">
                    <div
                        className="text-sm space-y-1"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.result.replace(/<br>/g, '<br />'))
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeviceInfoModal; 