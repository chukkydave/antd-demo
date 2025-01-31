import React from 'react';

interface ServiceToggleProps {
    activeService: 'checker' | 'unlock';
    onToggle: (service: 'checker' | 'unlock') => void;
}

const ServiceToggle = ({ activeService, onToggle }: ServiceToggleProps) => {
    return (
        <div className="flex justify-center space-x-8 mb-14">
            <button
                onClick={() => onToggle('checker')}
                className={`pb-2 px-4 font-medium transition-colors relative ${activeService === 'checker'
                    ? 'text-[#D62027] border-b-2 border-[#D62027]'
                    : 'text-gray-300 hover:text-gray-700'
                    }`}
            >
                Checker
            </button>
            <button
                onClick={() => onToggle('unlock')}
                className={`pb-2 px-4 font-medium transition-colors relative ${activeService === 'unlock'
                    ? 'text-[#D62027] border-b-2 border-[#D62027]'
                    : 'text-gray-300 hover:text-gray-700'
                    }`}
            >
                Unlock
            </button>
        </div>
    );
};

export default ServiceToggle;