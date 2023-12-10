import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from '../components/loading'

const SearchPage = lazy(() => import('../pages/searchPage'))
const LandingPage = lazy(() => import('../pages/landingPage'))

export const AppRouter = () => (
  <React.Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/search' element={<SearchPage />} />
    </Routes>
  </React.Suspense>
)
