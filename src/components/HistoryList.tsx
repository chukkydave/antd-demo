'use client';

import { Table, Badge } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    id: string;
    status: 'Completed' | 'Pending' | 'Rejected';
    service: string;
    imei: string;
    info: string;
    date: string;
}

interface HistoryListProps {
    activeTab: 'All' | 'Pending' | 'Completed' | 'Rejected';
    searchQuery: string;
    selectedDate: string;
}

const HistoryList = ({ activeTab, searchQuery, selectedDate }: HistoryListProps) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <div className="flex items-center space-x-2">
                    <Badge
                        status={status === 'Completed' ? 'success' : status === 'Pending' ? 'warning' : 'error'}
                    />
                    <p className={`text-sm ${status === 'Completed' ? 'text-green-600' :
                        status === 'Pending' ? 'text-yellow-600' :
                            'text-red-600'
                        }`}>{status}</p>
                </div>

            ),
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            width: 300,
        },
        {
            title: 'IMEI',
            dataIndex: 'imei',
            key: 'imei',
            width: 150,
        },
        {
            title: 'Info',
            dataIndex: 'info',
            key: 'info',
            width: 100,
            render: (info) => info === '---' ? info : (
                <button className="text-blue-600 hover:underline">
                    View result
                </button>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            id: '3749573',
            status: 'Completed',
            service: 'AT&T USA All iPhone Models Till 16 Pro Max Supported [Premium] - 100% Success',
            imei: '355135691693217',
            info: 'View',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '2',
            id: '3749574',
            status: 'Pending',
            service: 'iPhone | iPad Carrier + Full Warranty + FMI + US Blacklist By [IMEI/SN] - [Emergency Check]',
            imei: '355135691693218',
            info: '---',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '3',
            id: '3749575',
            status: 'Completed',
            service: 'Open Menu iCloud | Apple ID [Verification Failed - This person is Not Active] [NOTE: Must Know iCloud Password] - [18HRS] - Super Fast',
            imei: '355135691693219',
            info: 'View',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '4',
            id: '3749576',
            status: 'Completed',
            service: 'iPhone | iPad Carrier + Full Warranty + FMI + US Blacklist By [IMEI/SN] - [Emergency Check]',
            imei: '355135691693220',
            info: 'View',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '5',
            id: '3749577',
            status: 'Completed',
            service: 'AT&T USA All iPhone 15 Series Only [Past Due Status Only]',
            imei: '355135691693221',
            info: 'View',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '6',
            id: '3749578',
            status: 'Rejected',
            service: 'AT&T USA All iPhone Models Till 16 Pro Max Supported [Premium] - 100% Success',
            imei: '355135691693222',
            info: '---',
            date: '2024-11-23 15:22:38',
        },
        {
            key: '7',
            id: '3749579',
            status: 'Rejected',
            service: 'AT&T USA All iPhone Models Till 16 Pro Max Supported [Premium] - 100% Success',
            imei: '355135691693223',
            info: '---',
            date: '2024-11-23 15:22:38',
        }
    ];

    const filteredData = data.filter(item => {
        // Filter by tab
        const matchesTab = activeTab === 'All' ? true : item.status === activeTab;

        // Filter by search query
        const matchesSearch = searchQuery
            ? item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.imei.includes(searchQuery) ||
            item.id.includes(searchQuery)
            : true;

        // Filter by date
        const matchesDate = selectedDate
            ? item.date.startsWith(selectedDate)  // Assuming date format matches
            : true;

        return matchesTab && matchesSearch && matchesDate;
    });

    return (
        <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            className="rounded-lg"
        />
    );
};

export default HistoryList;
