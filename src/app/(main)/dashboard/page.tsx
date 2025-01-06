'use client';

import HistoryList from '@/components/HistoryList';
import { IoSearchOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { useState } from 'react';

type TabType = 'All' | 'Pending' | 'Completed' | 'Rejected';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const tabs: TabType[] = ['All', 'Pending', 'Completed', 'Rejected'];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-24 sm:mt-32">
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col space-y-6">
                    {/* Tab navigation and search/date filter */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                        {/* Tabs */}
                        <div className="flex space-x-4 sm:space-x-6 border-b border-gray-200 w-full lg:w-auto overflow-x-auto pb-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap pb-2 px-1 ${activeTab === tab
                                        ? 'text-red-600 border-b-2 border-red-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search and Date filters */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-700 w-full sm:w-64"
                                />
                            </div>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-700 w-full"
                            />
                        </div>
                    </div>

                    {/* History list table */}
                    <div className="overflow-x-auto">
                        <HistoryList
                            activeTab={activeTab}
                            searchQuery={searchQuery}
                            selectedDate={selectedDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
