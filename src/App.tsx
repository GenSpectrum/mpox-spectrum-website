import React from 'react';
import { Header } from './Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';

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
    </BrowserRouter>
  );
}

export default App;
