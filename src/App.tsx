import React from 'react';
import { Header } from './Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';
import { getCurrentLapisDataVersionDate } from './data/api-lapis';
import dayjs from 'dayjs';
import { SampleListPage } from './pages/SampleListPage';
import { ExternalLink } from './components/ExternalLink';
import { SamplePage } from './pages/SamplePage';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <div>
          {/* Header */}
          <div className='h-32 md:h-20'>
            <Header />
          </div>
          {/* Main content */}
          <Routes>
            <Route path='/' element={<Navigate to='explore?yearFrom=2022' />} />
            <Route path='explore' element={<ExplorePage />} />
            <Route path='samples' element={<SampleListPage />} />
            <Route path='samples/:sampleName' element={<SamplePage />} />
            <Route path='about' element={<AboutPage />} />
          </Routes>
        </div>
        {/* Footer */}
        <footer className='text-center mt-20 border-t'>
          <div>The sequence data was updated: {dayjs(getCurrentLapisDataVersionDate()).calendar()}</div>
          <div className='flex flex-wrap justify-center items-center my-4 mt-8'>
            <ExternalLink url='https://ethz.ch'>
              <img className='h-5 mx-6' alt='ETH Zurich' src='/img/ethz.png' />
            </ExternalLink>
            <ExternalLink url='https://bsse.ethz.ch/cevo'>
              <img className='h-7 mx-6' alt='Computational Evolution Group' src='/img/cEvo.png' />
            </ExternalLink>
            <ExternalLink url='https://nextstrain.org'>
              <img className='h-8 mx-6' alt='Nextstrain' src='/img/nextstrain.png' />
            </ExternalLink>
            <ExternalLink url='https://www.sib.swiss/'>
              <img className='h-7 mx-6' alt='SIB Swiss Institute of Bioinformatics' src='/img/sib.svg' />
            </ExternalLink>
            <ExternalLink url='https://vercel.com/?utm_source=cov-spectrum&utm_campaign=oss'>
              <img className='h-6 mx-6' alt='Powered by Vercel' src='/img/powered-by-vercel.svg' />
            </ExternalLink>
          </div>
        </footer>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
  palette: {
    secondary: {
      main: '#9ca3af',
      contrastText: '#fff',
    },
  },
});

export default App;
