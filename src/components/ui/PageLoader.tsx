import React from 'react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 bg-[#FAFAFA] z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D62027]"></div>
        </div>
    );
};

export default PageLoader; 