import { useCounterAnimation } from '@/hooks/useCounterAnimation';

function CheckerStats() {
    const todayCount = useCounterAnimation(50);
    const weekCount = useCounterAnimation(100);
    const monthCount = useCounterAnimation(1000);
    const totalCount = useCounterAnimation(1000);

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-center sm:text-left">
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">{todayCount}</span> Checked today
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">{weekCount}</span> Checked this week
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">{monthCount}</span> Checked this month
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">{totalCount}</span> Checked total
            </p>
        </div>
    );
}

export default CheckerStats;