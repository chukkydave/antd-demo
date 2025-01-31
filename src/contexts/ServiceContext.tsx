import { createContext, useContext, ReactNode } from 'react';

type ServiceType = 'checker' | 'unlock';

interface ServiceContextType {
    activeService: ServiceType;
    setActiveService: (service: ServiceType) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children, value }: { children: ReactNode; value: ServiceContextType }) {
    return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}

export function useService() {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useService must be used within a ServiceProvider');
    }
    return context;
} 