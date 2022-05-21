import { LocationSelector } from './LocationSelector';
import { DateRangeSelector } from './DateRangeSelector';
import { HostSelector } from './HostSelector';
import { VariantSelector } from './VariantSelector';

export type LapisSelector = {
  location?: LocationSelector;
  dateRange?: DateRangeSelector;
  variant?: VariantSelector;
  host?: HostSelector;
};
