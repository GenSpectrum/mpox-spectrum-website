/**
 * On the top-level, we can filter by the location, host and variant.
 */
import { LocationSelect } from './LocationSelect';
import { useState } from 'react';
import { LocationSelector } from '../data/LocationSelector';

export const TopFilterArea = () => {
  const [location, setLocation] = useState<LocationSelector>({});

  return (
    <>
      <div className='w-24'>
        <LocationSelect selected={location} onSelect={newLocation => setLocation(newLocation)} />
      </div>
    </>
  );
};
