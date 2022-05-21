import { LapisInformation, LapisResponse } from './LapisResponse';
import dayjs from 'dayjs';
import { LapisSelector } from './LapisSelector';
import { addLocationSelectorToUrlSearchParams } from './LocationSelector';
import { addDateRangeSelectorToUrlSearchParams } from './DateRangeSelector';
import { addHostSelectorToUrlSearchParams } from './HostSelector';
import { addVariantSelectorToUrlSearchParams } from './VariantSelector';
import { FullSampleAggEntry, FullSampleAggEntryRaw, parseFullSampleAggEntry } from './FullSampleAggEntry';
import { addOrderAndLimitToSearchParams, OrderAndLimitConfig } from './OrderAndLimitConfig';
import { LocationCountSampleEntry } from './LocationCountSampleEntry';

const HOST = process.env.REACT_APP_LAPIS_HOST;

let currentLapisDataVersion: number | undefined = undefined;

export const get = async (endpoint: string, signal?: AbortSignal) => {
  let url = HOST + endpoint;
  if (currentLapisDataVersion !== undefined) {
    url += '&dataVersion=' + currentLapisDataVersion;
  }
  const res = await fetch(url, {
    method: 'GET',
    signal,
  });
  if (res.status === 410) {
    window.location.reload();
  }
  return res;
};

export async function fetchLapisDataVersionDate(signal?: AbortSignal) {
  const res = await get('/sample/info', signal);
  if (!res.ok) {
    throw new Error('Error fetching info');
  }
  const info = (await res.json()) as LapisInformation;
  currentLapisDataVersion = info.dataVersion;
}

export function getCurrentLapisDataVersionDate(): Date | undefined {
  return currentLapisDataVersion !== undefined ? dayjs.unix(currentLapisDataVersion).toDate() : undefined;
}

export async function getLinkTo(
  endpoint: string,
  selector: LapisSelector,
  orderAndLimit?: OrderAndLimitConfig,
  downloadAsFile?: boolean,
  dataFormat?: string,
  omitHost = false,
  minProportion?: string
): Promise<string> {
  const params = new URLSearchParams();
  if (orderAndLimit) {
    addOrderAndLimitToSearchParams(params, orderAndLimit);
  }
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
  if (downloadAsFile) {
    params.set('downloadAsFile', 'true');
  }
  if (dataFormat) {
    params.set('dataFormat', 'csv');
  }
  if (minProportion) {
    params.set('minProportion', minProportion);
  }
  if (omitHost) {
    return `/sample/${endpoint}?${params.toString()}`;
  } else {
    return `${HOST}/sample/${endpoint}?${params.toString()}`;
  }
}

export async function fetchAggSamples(
  selector: LapisSelector,
  fields: string[],
  signal?: AbortSignal
): Promise<FullSampleAggEntry[]> {
  const linkPrefix = await getLinkTo('aggregated', selector, undefined, undefined, undefined, true);
  const additionalParams = new URLSearchParams();
  additionalParams.set('fields', fields.join(','));
  const res = await get(`${linkPrefix}&${additionalParams}`, signal);
  if (!res.ok) {
    throw new Error('Error fetching new samples data!!');
  }
  const body = (await res.json()) as LapisResponse<FullSampleAggEntryRaw[]>;
  return _extractLapisData(body).map(raw => parseFullSampleAggEntry(raw));
}

export async function fetchLocationCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<LocationCountSampleEntry[]> {
  return fetchAggSamples(selector, ['division', 'country', 'region'], signal);
}

function _extractLapisData<T>(response: LapisResponse<T>): T {
  if (response.errors.length > 0) {
    throw new Error('LAPIS returned an error: ' + JSON.stringify(response.errors));
  }
  if (currentLapisDataVersion === undefined) {
    currentLapisDataVersion = response.info.dataVersion;
  } else if (currentLapisDataVersion !== response.info.dataVersion) {
    // Refresh the website if there are new data
    window.location.reload();
    throw new Error(
      `LAPIS has new data. Old version: ${currentLapisDataVersion}, new version: ${response.info.dataVersion}. ` +
        `The website will be reloaded.`
    );
  }
  return response.data;
}
