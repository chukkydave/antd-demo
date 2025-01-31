export const isUnlockService = (service: string): boolean => {
    return service.toLowerCase().includes('unlock');
}; 