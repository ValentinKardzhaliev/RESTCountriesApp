import React from 'react';
import Link from 'next/link';
import styles from './CountryCard.module.css';
import { useDarkMode } from '../contexts/useDarkMode';

interface CountryCardProps {
    country: {
        flags: {
            svg: string;
        };
        name: {
            common: string;
        };
        population: number;
        region: string;
        capital: string;
        cca2: string;
    };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const { darkMode } = useDarkMode();

    const { name, population, region, capital, cca2 } = country;
    const commonName = name.common;

    return (
        <Link href={`/country/${cca2}`} passHref className={styles.countryDetailsLink}>
            <div className={`${styles.card} ${darkMode ? styles.darkCard : ''}`}>
                <img src={country.flags.svg} alt={`${commonName} Flag`} className={styles.flag} />
                <div className={styles.details}>
                    <h2 className={styles.name}>{commonName}</h2>
                    <p>Population: {population}</p>
                    <p>Region: {region}</p>
                    <p>Capital: {capital}</p>
                </div>
            </div>
        </Link>
    );
};

export default CountryCard;
