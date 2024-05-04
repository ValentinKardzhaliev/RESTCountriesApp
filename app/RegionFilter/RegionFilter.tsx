import React from 'react';
import styles from './RegionFilter.module.css';
import { useDarkMode } from '../contexts/useDarkMode'; // Import useDarkMode hook

interface RegionFilterProps {
    onSelectRegion: (region: string) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ onSelectRegion }) => {
    const { darkMode } = useDarkMode(); // Access darkMode state from context

    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRegion = e.target.value;
        if (selectedRegion === 'All') {
            onSelectRegion('');
        } else {
            onSelectRegion(selectedRegion);
        }
    };

    return (
        <div className={styles.filterContainer}>
            <select className={`${styles.regionFilter} ${darkMode ? styles.darkRegionFilter : ''}`} onChange={handleRegionChange}>
                {regions.map((region, index) => (
                    <option key={index} value={region}>{region}</option>
                ))}
            </select>
        </div>
    );
};

export default RegionFilter;
