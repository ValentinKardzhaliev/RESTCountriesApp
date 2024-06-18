"use client";
import React from 'react';
import CountryDetails from "../CountryDetails";

export default function CountryDetailsPage( { params } : any) {
    const id = params.id;
    

    return (
        <CountryDetails id={id} />
    );
}