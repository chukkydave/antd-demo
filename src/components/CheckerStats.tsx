function CheckerStats() {
    return (
        <div className="flex gap-3">
            <p className="text-base font-light text-gray-500"> <span className="text-[#D62027] text-xl font-normal">50</span> Checked today</p> |
            <p className="text-base font-light text-gray-500"> <span className="text-[#D62027] text-xl font-normal">100</span> Checked this week</p> |
            <p className="text-base font-light text-gray-500"> <span className="text-[#D62027] text-xl font-normal">1000</span> Checked this month</p> |
            <p className="text-base font-light text-gray-500"> <span className="text-[#D62027] text-xl font-normal">1000</span> Checked total</p>
        </div>
    )
}

export default CheckerStats;