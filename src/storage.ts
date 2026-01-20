import { PortfolioData, defaultData } from './types';

const STORAGE_KEY = 'portfolio_data';

export const storage = {
    // Get all portfolio data
    getData: (): PortfolioData => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
        return defaultData;
    },

    // Save all portfolio data
    saveData: (data: PortfolioData): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    },

    // Update specific section
    updateSection: <K extends keyof PortfolioData>(
        section: K,
        data: PortfolioData[K]
    ): void => {
        const current = storage.getData();
        current[section] = data;
        storage.saveData(current);
    },

    // Reset to default
    reset: (): void => {
        localStorage.removeItem(STORAGE_KEY);
    },

    // Export data as JSON
    exportData: (): string => {
        return JSON.stringify(storage.getData(), null, 2);
    },

    // Import data from JSON
    importData: (jsonString: string): boolean => {
        try {
            const data = JSON.parse(jsonString);
            storage.saveData(data);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
};
