export type LocationSelector = {
  region?: string;
  country?: string;
  division?: string;
};

export function addLocationSelectorToUrlSearchParams(selector: LocationSelector, params: URLSearchParams) {
  for (const k of ['region', 'country', 'division'] as const) {
    const value = selector[k];
    if (value !== undefined) {
      params.set(k, value);
    }
  }
}

/**
 * Examples:
 *  World -> {}
 *  Europe -> {region: Europe}
 *  Switzerland -> {country: Switzerland}
 *  Switzerland/Basel-Stadt -> {country: Switzerland, division: Basel-Stadt}
 */
export function decodeLocationSelectorFromSingleString(encoded: string): LocationSelector {
  if (encoded === 'World') {
    return {};
  }
  const regions = ['Africa', 'Europe', 'Asia', 'North America', 'South America', 'Oceania'];
  if (regions.includes(encoded)) {
    return { region: encoded };
  }
  if (!encoded.includes('/')) {
    return { country: encoded };
  } else {
    const [country, division] = encoded.split('/');
    return { country, division };
  }
}

export function encodeLocationSelectorToSingleString({
  region,
  country,
  division,
}: LocationSelector): string {
  if (!region && !country) {
    return 'World';
  }
  if (region && !country) {
    return region;
  }
  if (country && !division) {
    return country;
  }
  if (country && division) {
    return `${country}/${division}`;
  }
  throw new Error('This line should be impossible to reach.');
}
