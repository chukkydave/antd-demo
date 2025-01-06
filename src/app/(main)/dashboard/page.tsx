import HistoryList from '@/components/HistoryList';

export default function HistoryPage() {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Check History</h1>
            <HistoryList />
        </div>
    );
}
