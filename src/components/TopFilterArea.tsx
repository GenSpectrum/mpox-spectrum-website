import { LocationSelect } from './LocationSelect';
import { LocationSelector } from '../data/LocationSelector';
import { CladeSelect } from './CladeSelect';
import { VariantSelector } from '../data/VariantSelector';

type Props = {
  location: LocationSelector;
  setLocation: (location: LocationSelector) => void;
  variant: VariantSelector;
  setVariant: (variant: VariantSelector) => void;
};

/**
 * On the top-level, we can filter by the location, host and variant.
 */
export const TopFilterArea = ({ location, setLocation, variant, setVariant }: Props) => {
  return (
    <div className='flex flex-row flex-wrap'>
      <div className='w-72'>
        <LocationSelect selected={location} onSelect={newLocation => setLocation(newLocation)} />
      </div>
      <div className='w-72'>
        <CladeSelect selected={variant} onSelect={setVariant} />
      </div>
    </div>
  );
};
