import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'

const SearchPage = lazy(() => import('../../pages/SearchPage'))
const LandingPage = lazy(() => import('../../pages/LandingPage'))
const LoadingPage = lazy(() => import('../../pages/LoadingPage'))

export const AppRouter = () => (
  <React.Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  </React.Suspense>
)
