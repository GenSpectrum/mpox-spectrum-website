import { LocationSelect } from './LocationSelect';
import { LocationSelector } from '../data/LocationSelector';
import { CladeSelect } from './CladeSelect';
import { VariantSelector } from '../data/VariantSelector';
import { DateRangeSelect } from './DateRangeSelect';
import { DateRangeSelector } from '../data/DateRangeSelector';

type Props = {
  location: LocationSelector;
  setLocation: (location: LocationSelector) => void;
  variant: VariantSelector;
  setVariant: (variant: VariantSelector) => void;
  dateRange: DateRangeSelector;
  setDateRange: (dateRange: DateRangeSelector) => void;
};

/**
 * On the top-level, we can filter by the location, host and variant.
 */
export const TopFilterArea = ({
  location,
  setLocation,
  variant,
  setVariant,
  dateRange,
  setDateRange,
}: Props) => {
  return (
    <div className='flex flex-row flex-wrap'>
      <div className='w-72'>
        <LocationSelect selected={location} onSelect={newLocation => setLocation(newLocation)} />
      </div>
      <div className='w-72'>
        <CladeSelect selected={variant} onSelect={setVariant} />
      </div>
      <div className='w-72'>
        <DateRangeSelect selected={dateRange} onSelect={setDateRange} />
      </div>
    </div>
  );
};
