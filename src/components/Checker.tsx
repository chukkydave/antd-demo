'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Select } from 'antd';
import { IoCamera } from "react-icons/io5";
import { checkerOptions, formatOptionLabel } from '../data/checkerOptions';
import toast from 'react-hot-toast';
import axios from 'axios';
import dynamic from 'next/dynamic';
import DeviceInfoModal from './DeviceInfoModal';
import PaymentModal from './PaymentModal';

interface CheckResponse {
    result: string;
    imei: string;
    balance: string;
    price: string;
    id: string;
    status: string;
    ip: string;
}

function Checker() {
    const [selectedService, setSelectedService] = useState<string>("0");
    const [imei, setImei] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    // Move initial setup into useEffect
    useEffect(() => {
        // Any initialization that might depend on browser APIs
        setSelectedService("0");
    }, []);

    // Dynamically import modals
    const DeviceInfoModalComponent = dynamic(() => import('./DeviceInfoModal'), {
        ssr: false
    });

    const PaymentModalComponent = dynamic(() => import('./PaymentModal'), {
        ssr: false
    });

    // Transform the data structure for Ant Design Select
    const transformedOptions = checkerOptions.map(option => {
        if ('label' in option) {
            return {
                label: option.label,
                options: option.options.map(subOption => ({
                    value: subOption.value,
                    label: formatOptionLabel(subOption)
                }))
            };
        }
        return {
            value: option.value,
            label: formatOptionLabel(option)
        };
    });

    const handleCheck = async () => {
        if (!imei.trim()) {
            toast.error('Please enter an IMEI number');
            return;
        }

        if (selectedService === "0") {
            toast.error('Please select a service');
            return;
        }

        // Find selected service price
        const service = checkerOptions.flatMap(option =>
            'options' in option ? option.options : [option]
        ).find(opt => opt.value === selectedService);

        if (service && service.price !== 'free') {
            setSelectedPrice(service.price);
            setShowPaymentModal(true);
            return;
        }

        // Proceed with free check
        await performCheck();
    };

    const performCheck = async () => {
        setLoading(true);
        setResult(null);
        setShowModal(false);

        try {
            const response = await axios.get<CheckResponse>(
                `/api/checker?imei=${imei.trim()}&service=${selectedService}`
            );
            setResult(response.data);
            setShowModal(true);
            toast.success('Check completed successfully');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to check IMEI';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full sm:w-[85%] md:w-3/4 relative flex justify-center items-center flex-col px-4 sm:px-0">
            <Input
                className="!rounded-full !pl-5 !text-black !h-14 sm:!h-16 !text-base sm:!text-lg"
                prefix={<IoCamera className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />}
                placeholder="Enter your IMEI/Serial Number"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                suffix={
                    <Button
                        onClick={handleCheck}
                        loading={loading}
                        className="!rounded-full !py-4 sm:!py-6 !px-6 sm:!px-10 !font-semibold !text-base sm:!text-lg !text-white !bg-[#D62027] !h-10 sm:!h-12"
                    >
                        Check
                    </Button>
                }
            />
            <Select
                className="!mt-4 !w-full sm:!w-3/4 !h-14 sm:!h-16 checker-select-selector !text-base"
                value={selectedService}
                onChange={setSelectedService}
                options={transformedOptions}
                placeholder="Please Choose Checker"
                optionFilterProp="label"
                showSearch
                size="large"
                popupClassName="checker-select-dropdown"
            />

            {/* Modal */}
            {result && (
                <DeviceInfoModalComponent
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    data={result}
                />
            )}

            <PaymentModalComponent
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                amount={selectedPrice || 0}
                service={selectedService}
                onSuccess={performCheck}
            />
        </div>
    );
}

export default Checker;
