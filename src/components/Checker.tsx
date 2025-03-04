'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Input, Button, Modal, Spin, message } from 'antd';
import { IoCamera } from "react-icons/io5";
import { checkerOptions, unlockOptions, formatOptionLabel } from '../data/checkerOptions';
import toast from 'react-hot-toast';
import axios from 'axios';
import dynamic from 'next/dynamic';
import DeviceInfoModal from './DeviceInfoModal';
import PaymentModal from './PaymentModal';
import ServiceToggle from './ServiceToggle';
import { useService } from '@/contexts/ServiceContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Select from './ui/Select';

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
    const router = useRouter();
    const { user } = useAuth();
    const { activeService, setActiveService } = useService();
    const { convertPrice, currentCurrency, setCurrentCurrency } = useCurrency();

    const [selectedService, setSelectedService] = useState<string>("0");
    const [imei, setImei] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        fetchServices();
        detectUserCurrency();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services');
            console.log('Services data:', response.data); // Log the response

            if (response.data['Service List']) {
                setServices(response.data['Service List']);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load services');
        } finally {
            setServicesLoading(false);
        }
    };

    const detectUserCurrency = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://ipapi.co/currency/');
            const detectedCurrency = await response.text();

            // Only set if it's USD or NGN
            if (['USD', 'NGN'].includes(detectedCurrency)) {
                setCurrentCurrency(detectedCurrency);
            } else {
                setCurrentCurrency('USD'); // Default to USD
            }
        } catch (error) {
            console.error('Failed to detect currency:', error);
            setCurrentCurrency('USD'); // Default to USD on error
        } finally {
            setIsLoading(false);
        }
    };

    // First, let's create a Set of unlock service IDs for efficient lookup
    const unlockServiceIds = new Set(unlockOptions
        .flatMap(option => 'options' in option ? option.options : [option])
        .map(service => service.value)
    );

    // Then modify the transformedOptions logic
    const transformedOptions = useMemo(() => {
        if (servicesLoading) {
            return [{ value: "loading", label: "Loading services..." }];
        }

        // Filter services based on whether their IDs exist in unlockServiceIds
        const checkerServices = services.filter(service =>
            !unlockServiceIds.has(service.service)
        );

        const unlockServices = services.filter(service =>
            unlockServiceIds.has(service.service)
        );

        if (activeService === 'checker') {
            return [
                { value: "checker_default", label: "Please choose checker" },
                ...checkerServices.map(service => ({
                    value: service.service,
                    label: `${service.name} - ${convertPrice(parseFloat(service.price))}`
                }))
            ];
        } else {
            return [
                { value: "unlock_default", label: "Please choose unlock service" },
                ...unlockServices.map(service => ({
                    value: service.service,
                    label: `${service.name} - ${convertPrice(parseFloat(service.price))}`
                }))
            ];
        }
    }, [services, servicesLoading, activeService, convertPrice]);

    // Also update the useEffect to not set the default value while loading
    useEffect(() => {
        if (!servicesLoading) {
            setSelectedService(activeService === 'checker' ? "checker_default" : "unlock_default");
        } else {
            setSelectedService("loading");
        }
    }, [activeService, servicesLoading]);

    const getPlaceholderText = () => {
        return activeService === 'checker'
            ? "Enter your IMEI/Serial Number"
            : "Enter your IMEI Number";
    };

    const getButtonText = () => {
        return activeService === 'checker' ? "Check" : "Unlock";
    };

    const getDescriptionText = () => {
        return activeService === 'checker'
            ? "Use our trusted IMEI checker to ensure your phone is legitimate and not blacklisted."
            : "Unlock your device with our reliable unlocking service.";
    };

    // Dynamically import modals
    const DeviceInfoModalComponent = dynamic(() => import('./DeviceInfoModal'), {
        ssr: false
    });

    const PaymentModalComponent = dynamic(() => import('./PaymentModal'), {
        ssr: false
    });

    const handleServiceAction = async () => {
        if (activeService === 'unlock' && !user) {
            toast.error('Please login to use unlock services');
            router.push('/login');
            return;
        }

        if (!selectedService || selectedService === "checker_default" || selectedService === "unlock_default") {
            toast.error('Please select a service');
            return;
        }

        if (!imei.trim()) {
            toast.error('Please enter IMEI number');
            return;
        }

        const selectedServiceData = services.find(service => service.service === selectedService);

        if (selectedServiceData && selectedServiceData.price !== '0.00') {
            setSelectedPrice(parseFloat(selectedServiceData.price));
            setShowPaymentModal(true);
            return;
        }

        await performServiceAction();
    };

    const performServiceAction = async () => {
        setLoading(true);
        try {
            if (activeService === 'unlock') {
                const response = await axios.post('/api/unlock/request', {
                    imei,
                    service: selectedService
                });

                Modal.success({
                    title: 'Unlock Request Submitted',
                    content: 'Please check your dashboard in 2-3 days for updates on your unlock status.',
                    onOk: () => router.push('/history')
                });
            } else {
                const result = await performCheck();
                setResult(result);
                setShowResult(true);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const performCheck = async () => {
        setLoading(true);
        setResult(null);
        setShowModal(false);

        try {
            const response = await axios.get<CheckResponse>(
                `/api/checker?imei=${imei.trim()}&service=${selectedService}&serviceType=${activeService}`
            );
            setResult(response.data);
            setShowModal(true);
            toast.success('Check completed successfully');
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to check IMEI';
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        setProcessingPayment(true);
        // Payment confirmation will be handled by webhook
        // Show loading state until webhook confirms payment
        Modal.info({
            title: 'Processing Payment',
            content: 'Please wait while we confirm your payment...',
            closable: false
        });
    };

    // This would be called by a global event listener for payment confirmation
    const handlePaymentConfirmation = () => {
        setProcessingPayment(false);
        Modal.destroyAll(); // Clear the processing modal

        if (activeService === 'unlock') {
            Modal.success({
                title: 'Payment Successful',
                content: 'Your unlock request has been submitted. Please check your dashboard in 2-3 days for updates.',
                onOk: () => router.push('/history')
            });
        } else {
            performServiceAction();
        }
    };

    return (
        <div className="w-full sm:w-[85%] md:w-3/4 relative flex justify-center items-center flex-col px-4 sm:px-0">
            <ServiceToggle
                activeService={activeService}
                onToggle={setActiveService}
            />
            <Input
                className="!rounded-full !pl-5 !text-black !h-14 sm:!h-16 !text-base sm:!text-lg"
                prefix={<IoCamera className="text-gray-400 mr-4 w-5 h-5 sm:w-6 sm:h-6" />}
                placeholder={getPlaceholderText()}
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                suffix={
                    <Button
                        onClick={handleServiceAction}
                        loading={loading}
                        className="!rounded-full !py-4 sm:!py-6 !px-6 sm:!px-10 !font-semibold !text-base sm:!text-lg !text-white !bg-[#D62027] !h-10 sm:!h-12 focus:!outline-none"
                    >
                        {getButtonText()}
                    </Button>
                }
            />
            <Select
                value={selectedService}
                onChange={setSelectedService}
                options={transformedOptions}
                placeholder={`Please Choose ${activeService === 'checker' ? 'Checker' : 'Unlock Service'}`}
                loading={servicesLoading}
                searchable
                className="!mt-4 !w-full sm:!w-3/4 mx-auto"
            />

            {/* Modal */}
            {showResult && result && (
                <DeviceInfoModalComponent
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    data={result}
                    imei={imei}
                    service={selectedService}
                />
            )}

            <PaymentModalComponent
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                amount={selectedPrice || 0}
                service={selectedService}
                imei={imei}
                onSuccess={handlePaymentSuccess}
            />

            {/* {showResult && checkerResult && (
                <CheckerResult
                    result={checkerResult}
                    imei={imei}
                    service={selectedService}
                    onClose={() => setShowResult(false)}
                />
            )} */}

            {/* Add a global event listener for payment confirmation */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('payment-confirmed', function(e) {
                        ${handlePaymentConfirmation.toString()}();
                    });
                `
            }} />
        </div>
    );
}

export default Checker;
