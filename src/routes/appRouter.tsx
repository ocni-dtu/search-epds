import React from 'react';
import { Route, Routes } from 'react-router';
import { LandingPage, SearchPage } from '../pages';

export const AppRouter = () => (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    );
