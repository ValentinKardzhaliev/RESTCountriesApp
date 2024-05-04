"use client";
import React, { useEffect, useState } from 'react';
import styles from './CountryDetails.module.css';
import Link from 'next/link';
import Navbar from '../Navbar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../contexts/useDarkMode';


interface CountryDetailsProps {
    id: any;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ id }) => {
    const { darkMode } = useDarkMode();
    const [countryData, setCountryData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${id}`)
            .then(res => res.json())
            .then(data => {
                const country = data[0];
                setCountryData(country);
                setLoading(false);
            })
            .catch(err => console.error('Error fetching data:', err));
    }, [id]);

    const keys = Object.keys(countryData?.name?.nativeName || {});
    const firstKey = keys[0];

    if (loading) {
        return <div className={styles.loader}>Loading...</div>;
    }

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
            <Navbar />
            <div className={styles.countryDetails}>
                <button className={`${styles.backButton} ${darkMode ? styles.darkBackButton : ''}`}>
                    <Link href={`/`} className={styles.backLink}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span className={styles.backButtonText}>
                            Back
                        </span>
                    </Link>
                </button>
                <div className={styles.countryInfo}>
                    <div className={styles.flagContainer}>
                        <img src={countryData?.flags?.svg} alt={`${countryData?.name?.common} Flag`} className={styles.flag} />
                    </div>
                    <div className={styles.textInfo}>
                        <h2 className={styles.countryName}>{countryData?.name?.common}</h2>
                        <div className={styles.detailsInfoContainer}>
                            <div className={styles.mainInfo}>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Native Name: </p>
                                    <p className={styles.detailValue}>{countryData?.name?.nativeName?.[firstKey]?.common}</p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Population: </p>
                                    <p className={styles.detailValue}>{countryData?.population}</p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Region: </p>
                                    <p className={styles.detailValue}>{countryData?.region}</p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Subregion: </p>
                                    <p className={styles.detailValue}>{countryData?.subregion}</p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Capital: </p>
                                    <p className={styles.detailValue}>{countryData?.capital?.[0]}</p>
                                </div>
                            </div>

                            <div className={styles.miscInfo}>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Top Level Domain:</p>
                                    <p className={styles.detailValue}>{countryData?.tld?.[0]}</p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Currencies:</p>
                                    <p className={styles.detailValue}>
                                        {Object.values(countryData?.currencies || {}).map((currency: any) => currency.name).join(', ')}
                                    </p>
                                </div>
                                <div className={styles.detailPair}>
                                    <p className={`${styles.detail} ${styles.detailLabel}`}>Languages:</p>
                                    <p className={styles.detailValue}>
                                        {Object.values(countryData?.languages || {}).join(', ')}
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className={`${styles.detailPair} ${styles.borderCountriesContainer}`}>
                            <p className={`${styles.detail} ${styles.detailLabel} ${styles.borderCountriesLabel}`}>Border Countries:</p>
                            <div className={styles.detailValue}>
                                {countryData?.borders?.length > 0 ? (
                                    countryData.borders.map((b: string, index: number) => (
                                        <React.Fragment key={index}>
                                            <button className={`${styles.borderCountryButton} ${darkMode ? styles.darkborderCountryButton : ''}`}>
                                                <Link href={`/country/${b}`} passHref className={styles.borderLink}>{b}</Link>
                                            </button>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p>This country has no border countries.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CountryDetails;
