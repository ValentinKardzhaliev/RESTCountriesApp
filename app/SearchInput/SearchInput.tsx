import React, { useState } from 'react';
import styles from './SearchInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../contexts/useDarkMode';

interface SearchInputProps {
    onSearch: (countries: any[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const { darkMode } = useDarkMode();

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
            if (!response.ok) {
                onSearch([])
            }
            const data = await response.json();
            onSearch(data);
        } catch (error) {
            onSearch([]);
            console.error('Error:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <input
                className={`${styles.searchInput} ${darkMode ? styles.darkMode : ''}`}
                type="text"
                placeholder="Search for a country..."
                value={query}
                onChange={handleInputChange}
            />
            <button className={`${styles.searchButton} ${darkMode ? styles.darkMode : ''}`} onClick={handleSearch} disabled={loading}>
                {<FontAwesomeIcon icon={faSearch} />}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SearchInput;
