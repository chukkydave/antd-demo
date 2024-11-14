function CheckerStats() {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-center sm:text-left">
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">50</span> Checked today
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">100</span> Checked this week
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">1000</span> Checked this month
            </p>
            <span className="hidden sm:inline">|</span>
            <p className="text-sm sm:text-base font-light text-gray-500">
                <span className="text-[#D62027] text-lg sm:text-xl font-normal">1000</span> Checked total
            </p>
        </div>
    )
}

export default CheckerStats;