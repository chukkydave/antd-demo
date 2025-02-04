'use client';

import { useState, useEffect } from 'react';
import { Modal, Tabs, Button, Select } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import QRCode from 'react-qr-code';
import { usePaystackPayment } from 'react-paystack';
import { juicePaymentService } from '../services/juiceApi';
import { toast } from 'react-hot-toast';
import { isUnlockService } from '@/utils/serviceHelpers';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    service: string;
    onSuccess: () => void;
    imei: string;
}

const PaymentModal = ({ isOpen, onClose, amount, service, onSuccess, imei }: PaymentModalProps) => {
    const [activeTab, setActiveTab] = useState('1');
    const [copied, setCopied] = useState(false);
    const [binanceFormData, setBinanceFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address_line1: '',
        city: '',
        state: '',
        country: '',
        zip_code: ''
    });
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const walletAddress = "YOUR_CRYPTO_WALLET_ADDRESS";

    // Paystack configuration
    const config = {
        reference: new Date().getTime().toString(),
        email: "user@example.com", // This should come from user context
        amount: amount * 100, // Convert to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    };

    const initializePayment = usePaystackPayment(config);

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    const handleCountryChange = (value: string) => {
        setBinanceFormData(prev => ({ ...prev, country: value, state: '', city: '' }));
        setStates(State.getStatesOfCountry(value));
        setCities([]);
    };

    const handleStateChange = (value: string) => {
        setBinanceFormData(prev => ({ ...prev, state: value, city: '' }));
        setCities(City.getCitiesOfState(binanceFormData.country, value));
    };

    const handlePaystackSuccess = () => {
        onSuccess();
        onClose();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBinanceFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBinanceFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBinancePayment = async () => {
        try {
            // Validate form data
            const requiredFields = Object.entries(binanceFormData);
            const emptyFields = requiredFields.filter(([_, value]) => !value.trim());

            if (emptyFields.length > 0) {
                toast.error('Please fill in all fields');
                return;
            }

            // Show loading state
            toast.loading('Processing payment...', { id: 'payment' });

            const session = await juicePaymentService.createPaymentSession({
                customer: {
                    first_name: binanceFormData.first_name,
                    last_name: binanceFormData.last_name,
                    email: binanceFormData.email,
                    phone_number: binanceFormData.phone_number,
                    billing_address: {
                        line1: binanceFormData.address_line1,
                        city: binanceFormData.city,
                        state: binanceFormData.state,
                        country: binanceFormData.country,
                        zip_code: binanceFormData.zip_code
                    }
                },
                description: `Payment for service: ${service}`,
                currency: "USD",
                amount: amount * 100,
                reference: `REF-${Date.now()}`,
                payment_method: {
                    type: "crypto address"
                },
                isLive: false,
                metadata: {
                    order: {
                        identifier: imei,
                        items: [{
                            name: `service: ${service}`,
                            type: "digital",
                        }]
                    }
                }
            });

            const payment = await juicePaymentService.capturePayment(session.data.payment.id);

            if (payment.data.links?.checkout_url) {
                window.location.href = payment.data.links.checkout_url;
            }
        } catch (error) {
            console.error('Binance Pay Error:', error);
            toast.error('Failed to initialize Binance Pay', { id: 'payment' });
        }
    };

    // Update the Binance Pay tab content
    const binancePayContent = (
        <div className="py-4">
            <div className="mb-4">
                <p className="text-lg font-medium mb-2">Pay ${amount} via Binance Pay</p>
                <p className="text-sm text-gray-600 mb-4">Note: Binance Pay only accepts USD payments</p>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={binanceFormData.first_name}
                        onChange={handleBinanceFormChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={binanceFormData.last_name}
                        onChange={handleBinanceFormChange}
                        className="p-2 border rounded"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={binanceFormData.email}
                    onChange={handleBinanceFormChange}
                    className="w-full p-2 border rounded"
                />
                <PhoneInput
                    country={'us'}
                    value={binanceFormData.phone_number}
                    onChange={(phone) => {
                        setBinanceFormData(prev => ({
                            ...prev,
                            phone_number: phone
                        }));
                    }}
                    containerClass="w-full"
                    inputClass="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="address_line1"
                    placeholder="Address"
                    value={binanceFormData.address_line1}
                    onChange={handleBinanceFormChange}
                    className="w-full p-2 border rounded"
                />

                <div className="grid grid-cols-2 gap-4">

                    <Select
                        className="w-full !rounded-none"
                        placeholder="Select Country"
                        value={binanceFormData.country || undefined}
                        onChange={(value) => {
                            setBinanceFormData(prev => ({
                                ...prev,
                                country: value,
                                state: '',
                                city: ''
                            }));
                            setStates(State.getStatesOfCountry(value));
                            setCities([]);
                        }}
                        options={countries.map(country => ({
                            value: country.isoCode,
                            label: country.name
                        }))}
                        showSearch
                        filterOption={(input, option) =>
                            option?.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                    <Select
                        placeholder="Select State"
                        value={binanceFormData.state || undefined}
                        onChange={(value) => {
                            setBinanceFormData(prev => ({
                                ...prev,
                                state: value,
                                city: ''
                            }));
                            setCities(City.getCitiesOfState(binanceFormData.country, value));
                        }}
                        options={states.map(state => ({
                            value: state.isoCode,
                            label: state.name
                        }))}
                        disabled={!binanceFormData.country}
                        showSearch
                        filterOption={(input, option) =>
                            option?.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />

                </div>
                <div className="grid grid-cols-2 gap-4">

                    <Select
                        placeholder="Select City"
                        value={binanceFormData.city || undefined}
                        onChange={(value) => setBinanceFormData(prev => ({ ...prev, city: value }))}
                        options={cities.map(city => ({
                            value: city.name,
                            label: city.name
                        }))}
                        disabled={!binanceFormData.state}
                        className="w-full rounded"
                        showSearch
                        filterOption={(input, option) =>
                            option?.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                    <input
                        type="text"
                        name="zip_code"
                        placeholder="ZIP/Postal Code"
                        value={binanceFormData.zip_code}
                        onChange={handleBinanceFormChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <Button
                    type="primary"
                    className="w-full bg-[#F0B90B] hover:bg-[#DCA70A] border-none h-12 text-lg font-medium"
                    onClick={handleBinancePayment}
                >
                    Pay with Binance
                </Button>
            </form>
        </div>
    );

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            title="Choose Payment Method"
            width={600} // Increased width to accommodate the form
        >
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: '1',
                        label: 'Card Payment',
                        children: (
                            <div className="py-4">
                                <p className="mb-4">Pay ${amount} via Paystack</p>
                                <Button
                                    type="primary"
                                    className="w-full bg-[#0BA4DB] hover:bg-[#0993C5] border-none h-12 text-lg font-medium"
                                    onClick={() => initializePayment({
                                        onSuccess: handlePaystackSuccess,
                                        onClose: onClose
                                    })}
                                >
                                    Pay with Paystack
                                </Button>
                            </div>
                        ),
                    },
                    {
                        key: '2',
                        label: 'Binance Pay',
                        children: binancePayContent
                    },
                    {
                        key: '3',
                        label: 'Crypto Payment',
                        children: (
                            <div className="py-4 flex flex-col items-center">
                                <QRCode value={walletAddress} size={200} />
                                <div className="mt-4 w-full">
                                    <div className="flex items-center gap-2 p-2 border rounded">
                                        <input
                                            type="text"
                                            value={walletAddress}
                                            readOnly
                                            className="flex-1 outline-none"
                                        />
                                        <Button
                                            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                            onClick={copyToClipboard}
                                            className={copied ? 'text-green-500' : ''}
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        - After transfer contact us by clicking on the whatsapp icon to confirm payment.
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </Modal>
    );
};

export default PaymentModal; 