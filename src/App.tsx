import React from 'react';
import { Header } from './Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';
import { getCurrentLapisDataVersionDate } from './data/api-lapis';
import dayjs from 'dayjs';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Header */}
        <div className='h-32 md:h-20'>
          <Header />
        </div>
        {/* Main content */}
        <Routes>
          <Route path='/' element={<Navigate to='explore' />} />
          <Route path='explore' element={<ExplorePage />} />
          <Route path='about' element={<AboutPage />} />
        </Routes>
      </div>
      {/* Footer */}
      <footer className='text-center mt-20 border-t'>
        <div>The sequence data was updated: {dayjs(getCurrentLapisDataVersionDate()).calendar()}</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
