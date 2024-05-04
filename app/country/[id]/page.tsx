"use client";
import React, { useState } from 'react';
import CountryDetails from "../CountryDetails";

export default function CountryDetailsPage( { params } : any) {
    const [darkMode, setDarkMode] = useState(false);
    const id = params.id;
    
    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    };

    return (
        <CountryDetails id={id} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    );
}