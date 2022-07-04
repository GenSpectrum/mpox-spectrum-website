import { LocationSelect } from './LocationSelect';
import { LocationSelector } from '../data/LocationSelector';
import { CladeSelect } from './CladeSelect';
import { VariantSelector } from '../data/VariantSelector';
import { DateRangeSelect } from './DateRangeSelect';
import { DateRangeSelector } from '../data/DateRangeSelector';
import { HostSelect } from './HostSelect';
import { HostSelector } from '../data/HostSelector';
import { LineageSelect } from './LineageSelect';

type Props = {
  location: LocationSelector;
  setLocation: (location: LocationSelector) => void;
  variant: VariantSelector;
  setVariant: (variant: VariantSelector) => void;
  host: HostSelector;
  setHost: (host: HostSelector) => void;
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
  host,
  setHost,
  dateRange,
  setDateRange,
}: Props) => {
  return (
    <div className='flex flex-row flex-wrap justify-center'>
      <div className='w-72'>
        <LocationSelect selected={location} onSelect={newLocation => setLocation(newLocation)} />
      </div>
      <div className='w-72'>
        <CladeSelect selected={variant} onSelect={setVariant} />
      </div>
      <div className='w-72'>
        <LineageSelect selected={variant} onSelect={setVariant} />
      </div>
      <div className='w-72'>
        <HostSelect selected={host} onSelect={setHost} />
      </div>
      <div className='w-72'>
        <DateRangeSelect selected={dateRange} onSelect={setDateRange} />
      </div>
    </div>
  );
};
