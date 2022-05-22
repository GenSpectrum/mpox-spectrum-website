import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from './components/ExternalLink';
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Button, ButtonVariant } from './helpers/ui';

const letters = [
  { color: 'darkgray', text: 'mpox' },
  { color: '#0D4A70', text: 'S' },
  { color: '#245C70', text: 'P' },
  { color: '#3A6E6F', text: 'E' },
  { color: '#67916E', text: 'C' },
  { color: '#AC8D3A', text: 'T' },
  { color: '#CF8B20', text: 'R' },
  { color: '#E08A13', text: 'U' },
  { color: '#F18805', text: 'M' },
];

const Logo = () => {
  let redirectLink = '/';

  return (
    <a href={redirectLink} className='flex flex-row items-center hover:no-underline md:mb-0.5'>
      <div>
        {letters.map((l: { color: string; text: string }, i) => (
          <span key={i} style={{ color: l.color, fontWeight: 'bold', fontSize: '1.75rem' }}>
            {l.text}
          </span>
        ))}
      </div>
    </a>
  );
};

export const Header = () => {
  const location = useLocation();

  const getButtonClasses = (path?: string): string =>
    `${
      path && location.pathname === path ? 'text-gray-800' : 'text-gray-400 hover:text-gray-800'
    } px-3 mr-4 rounded-md text-sm font-medium`;

  const getDropdownButtonClasses = (path?: string): string =>
    `${
      path && location.pathname === path ? 'text-gray-800' : 'text-gray-400 hover:text-gray-800'
    } mr-4 rounded-md text-lg font-medium`;

  const FilterDropdown = () => {
    const [infoOpen, setInfoOpen] = useState(false);

    return (
      <div className='flex'>
        <div id='info-dropdown' className='relative text-left ml-3 lg:hidden'>
          {' '}
          <div>
            <button
              type='button'
              className='border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full rounded-md  px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500'
              id='options-menu'
              onClick={() => {
                setInfoOpen(!infoOpen);
              }}
            >
              <div className={infoOpen ? 'fill-current animate-pulse bg-red' : ''}>
                <BsFillInfoCircleFill />
              </div>
            </button>
          </div>
          {infoOpen && (
            <div className='origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5'>
              <div
                className='py-2 px-4 flex flex-col items-start'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <div className='flex w-full justify-between items-center mb-2'>
                  <h2>Links</h2>
                  <Button
                    variant={ButtonVariant.SECONDARY}
                    onClick={() => {
                      setInfoOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
                <a className={getDropdownButtonClasses('/about')} href='/about'>
                  About
                </a>
                <a
                  className={getDropdownButtonClasses('')}
                  href='https://twitter.com/genSpectrum'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Twitter
                </a>
                <a
                  className={getDropdownButtonClasses('')}
                  href='https://github.com/cevo-public/mpox-spectrum-website'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Github
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className='flex h-full content-center shadow-md z-50 bg-white '>
        <div className='w-full mx-auto px-2 md:px-0 flex content-center'>
          <div className='md:mx-4 w-full justify-between'>
            <div className='w-full h-full flex justify-center md:justify-between items-center'>
              <div id='logo-and-search' className='flex h-full md:flex-row flex-column justify-center'>
                <div id='logo-and-gsid' className='flex flex-column items-center justify-center md:pr-4'>
                  <div>
                    <Logo />
                  </div>
                </div>
              </div>
              <div className='flex items-center z-20 mt-2 md:mt-0'>
                <FilterDropdown />
              </div>
              <div id='right-nav-buttons' className='items-center justify-center hidden lg:block'>
                <div className='ml-1 flex items-center'>
                  <a className={getButtonClasses('/about')} href='/about'>
                    About
                  </a>
                  <ExternalLink url='https://twitter.com/genSpectrum'>
                    <AiOutlineTwitter
                      className='hidden md:block fill-current rounded-xl filter shadow-xl cursor-pointer ml-1 lg:ml-8 hover:opacity-70'
                      size={'1.5em'}
                      style={{ color: '#1d9bf0' }}
                    />
                  </ExternalLink>
                  <ExternalLink url='https://github.com/cevo-public/mpox-spectrum-website'>
                    <AiOutlineGithub
                      className='hidden md:block fill-current hover:text-gray-500 rounded-xl filter shadow-xl cursor-pointer ml-1 lg:ml-8 text-black'
                      size={'1.5em'}
                    />
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
