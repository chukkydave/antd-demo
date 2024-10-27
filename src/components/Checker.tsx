'use client';

import React from 'react';
import { Input, Button, Select } from 'antd';
import { IoCamera } from "react-icons/io5";

const selectStyles = {
    borderRadius: '9999px',
    padding: '8px 16px',
};

function Checker() {
    return (
        <div className="w-3/4 relative flex justify-center items-center flex-col">
            <Input
                className="!rounded-full !pl-5"
                prefix={<IoCamera className="text-gray-400 w-6 h-6" />}
                placeholder="Enter your IMEI/Serial Number"
                suffix={<Button
                    className="!rounded-full !py-6 !px-8 !font-semibold !text-base !text-white !bg-[#D62027]"
                >
                    Check
                </Button>}
            />
            <Select
                className="!mt-4 !w-2/4 !h-12"
                showSearch
                placeholder="Please Choose Checker"
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                ]}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                size='large'
            />
        </div>
    );
}

export default Checker;
