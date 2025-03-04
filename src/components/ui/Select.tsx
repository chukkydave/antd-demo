import React, { useState, useRef, useEffect } from 'react';
import { IoSearch, IoChevronDown } from "react-icons/io5";
import { Spin } from 'antd';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    loading?: boolean;
    searchable?: boolean;
    error?: string;
}

const Select = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className = "",
    loading = false,
    searchable = false,
    error
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable) {
            searchInputRef.current?.focus();
        }
    }, [isOpen, searchable]);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(option => option.value === value);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative w-full" ref={selectRef}>
            <div
                tabIndex={0}
                role="combobox"
                aria-expanded={isOpen}
                aria-controls="select-dropdown"
                aria-haspopup="listbox"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={`
          flex items-center justify-between w-full px-5 h-10 sm:h-12
          bg-white border rounded-full cursor-pointer
          ${error ? 'border-red-500' : 'border-gray-300'}
          hover:border-[#D62027] focus:outline-none focus:border-[#D62027]
          focus:ring-[0.5] focus:ring-[#D62027]
          ${className}
        `}
            >
                <span className={`text-sm sm:text-base ${!selectedOption ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <IoChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 
          ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div
                    id="select-dropdown"
                    role="listbox"
                    className={`absolute left-1/2 -translate-x-1/2 z-50 mt-2 bg-white border border-gray-200 rounded-lg ${className}`}
                >
                    {searchable && (
                        <div className="p-3 border-b border-gray-200">
                            <div className="relative">
                                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full
                    focus:outline-none focus:border-[#D62027] focus:ring-[0.5] focus:ring-[#D62027]"
                                    placeholder="Search..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-h-60 overflow-y-auto overscroll-contain">
                        {loading ? (
                            <div className="flex items-center justify-center p-4">
                                <Spin />
                            </div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No options found
                            </div>
                        ) : (
                            <div className="py-2">
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        role="option"
                                        aria-selected={value === option.value}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange(option.value);
                                            setIsOpen(false);
                                            setSearchTerm("");
                                        }}
                                        className={`
                      px-5 py-3 cursor-pointer text-base transition-colors
                      hover:bg-gray-50 hover:text-[#D62027]
                      ${value === option.value ?
                                                'bg-red-50 text-[#D62027] font-medium' :
                                                'text-gray-700'
                                            }
                    `}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select; 