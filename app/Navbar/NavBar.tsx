'use client';
import React from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../contexts/useDarkMode'

const Navbar: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <nav className={`${styles.navbar} ${darkMode ? styles.darkNavbar : ''}`}>
            <div className={styles.contentContainer}>
                <div className={styles.title}>Where in the world?</div>
                <button className={styles.toggleButton} onClick={toggleDarkMode}>
                    {darkMode ? (
                        <>
                            <FontAwesomeIcon icon={faSun} /> Dark Mode
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faMoon} /> Dark Mode
                        </>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
