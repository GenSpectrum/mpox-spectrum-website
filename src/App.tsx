import React from 'react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Header */}
        <div className='h-32 md:h-20'>
          <Header />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
