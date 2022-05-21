import { addLocationSelectorToUrlSearchParams, LocationSelector } from './LocationSelector';
import { addDateRangeSelectorToUrlSearchParams, DateRangeSelector } from './DateRangeSelector';
import { addHostSelectorToUrlSearchParams, HostSelector } from './HostSelector';
import { addVariantSelectorToUrlSearchParams, VariantSelector } from './VariantSelector';

export type LapisSelector = {
  location?: LocationSelector;
  dateRange?: DateRangeSelector;
  variant?: VariantSelector;
  host?: HostSelector;
};

export function addLapisSelectorToUrlSearchParams(selector: LapisSelector, params: URLSearchParams) {
  if (selector.location) {
    addLocationSelectorToUrlSearchParams(selector.location, params);
  }
  if (selector.dateRange) {
    addDateRangeSelectorToUrlSearchParams(selector.dateRange, params);
  }
  if (selector.variant) {
    addVariantSelectorToUrlSearchParams(selector.variant, params);
  }
  if (selector.host) {
    addHostSelectorToUrlSearchParams(selector.host, params);
  }
}
