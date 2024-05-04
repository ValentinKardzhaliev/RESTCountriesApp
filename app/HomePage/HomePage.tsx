'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './../Navbar/NavBar';
import styles from './HomePage.module.css';
import SearchInput from '../SearchInput/SearchInput';
import CountryCard from '../CountryCard/CountryCard';
import RegionFilter from '../RegionFilter/RegionFilter';
import { useDarkMode } from '../contexts/useDarkMode';

const HomePage: React.FC = () => {
    const { darkMode } = useDarkMode();
    const [countries, setCountries] = useState<any[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) {
                    setFilteredCountries([])
                }
                const data = await response.json();
                setCountries(data);
                setFilteredCountries(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleRegionFilter = (region: string) => {
        if (region === '') {
            setFilteredCountries(countries);
        } else {
            const results = countries.filter(country =>
                country.region.toLowerCase() === region.toLowerCase()
            );
            setFilteredCountries(results);
        }
    };

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
            <Navbar />
            <div className={`${styles.content} ${darkMode ? styles.darkContent : ''}`}>
                <div className={styles.searchFilterContainer}>
                    <SearchInput onSearch={setFilteredCountries} />
                    <RegionFilter onSelectRegion={handleRegionFilter} />
                </div>
                <div className={styles.countryGrid}>
                    {filteredCountries.length > 0 ? filteredCountries.map(country => (
                        <CountryCard key={country.name.common} country={country} />
                    )) : <h1 className={styles.notFound}>No countries found matching that name</h1>}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
