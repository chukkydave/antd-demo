import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    date: string;
    imei: string;
    result: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'IMEI',
        dataIndex: 'imei',
        key: 'imei',
    },
    {
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
    },
];

const data: DataType[] = [
    {
        key: '1',
        date: '2023-03-15',
        imei: '123456789012345',
        result: 'Valid',
    },
    {
        key: '2',
        date: '2023-03-14',
        imei: '987654321098765',
        result: 'Invalid',
    },
];

const HistoryList = () => {
    return <Table columns={columns} dataSource={data} />;
};

export default HistoryList;
