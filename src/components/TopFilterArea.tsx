import { LocationSelect } from './LocationSelect';
import { LocationSelector } from '../data/LocationSelector';

type Props = {
  location: LocationSelector;
  setLocation: (location: LocationSelector) => void;
};

/**
 * On the top-level, we can filter by the location, host and variant.
 */
export const TopFilterArea = ({ location, setLocation }: Props) => {
  return (
    <div className='flex flex-row flex-wrap'>
      <div className='w-24'>
        <LocationSelect selected={location} onSelect={newLocation => setLocation(newLocation)} />
      </div>
    </div>
  );
};
