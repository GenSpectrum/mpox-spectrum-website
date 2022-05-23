import { LapisInformation, LapisResponse } from './LapisResponse';
import dayjs from 'dayjs';
import { addLapisSelectorToUrlSearchParams, LapisSelector } from './LapisSelector';
import { FullSampleAggEntry, FullSampleAggEntryRaw, parseFullSampleAggEntry } from './FullSampleAggEntry';
import { addOrderAndLimitToSearchParams, OrderAndLimitConfig } from './OrderAndLimitConfig';
import { LocationCountSampleEntry } from './LocationCountSampleEntry';
import { CountryCountSampleEntry } from './CountryCountSampleEntry';
import { SequenceType } from './MutationDataset';
import { MutationEntry } from './MutationEntry';
import { DetailsSampleEntry } from './DetailsSampleEntry';
import { globalDateCache } from '../helpers/date-cache';
import { CladeCountSampleEntry } from './CladeCountSampleEntry';
import { HostCountSampleEntry } from './HostCountSampleEntry';
import { DateCountSampleEntry } from "./DateCountSampleEntry";

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

export function getLinkTo(
  endpoint: string,
  selector: LapisSelector,
  orderAndLimit?: OrderAndLimitConfig,
  downloadAsFile?: boolean,
  dataFormat?: string,
  omitHost = false,
  minProportion?: string
): string {
  const params = new URLSearchParams();
  if (orderAndLimit) {
    addOrderAndLimitToSearchParams(params, orderAndLimit);
  }
  addLapisSelectorToUrlSearchParams(selector, params);
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

export async function fetchDateCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<DateCountSampleEntry[]> {
  return fetchAggSamples(selector, ['date'], signal);
}

export async function fetchCountryCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<CountryCountSampleEntry[]> {
  return fetchAggSamples(selector, ['country'], signal);
}

export async function fetchCladeCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<CladeCountSampleEntry[]> {
  return fetchAggSamples(selector, ['clade'], signal);
}

export async function fetchHostCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<HostCountSampleEntry[]> {
  return fetchAggSamples(selector, ['host'], signal);
}

export async function fetchLocationCountSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<LocationCountSampleEntry[]> {
  return fetchAggSamples(selector, ['division', 'country', 'region'], signal);
}

export async function fetchMutations(
  selector: LapisSelector,
  sequenceType: SequenceType,
  signal?: AbortSignal
): Promise<MutationEntry[]> {
  const link = await getLinkTo(`${sequenceType}-mutations`, selector, undefined, undefined, undefined, true);
  const res = await get(link, signal);
  if (!res.ok) {
    throw new Error('Error fetching new data!!');
  }
  const body = (await res.json()) as LapisResponse<MutationEntry[]>;
  return _extractLapisData(body);
}

export async function fetchDetailsSamples(
  selector: LapisSelector,
  signal?: AbortSignal
): Promise<DetailsSampleEntry[]> {
  const link = await getLinkTo(`details`, selector, undefined, undefined, undefined, true);
  const res = await get(link, signal);
  if (!res.ok) {
    throw new Error('Error fetching new data!!');
  }
  const rawBody = (await res.json()) as LapisResponse<any[]>;
  const rawData = _extractLapisData(rawBody);
  return rawData.map(x => ({
    strain: x.strain,
    sraAccession: x.sraAccession,
    date: x.date ? globalDateCache.getDay(x.date) : null,
    region: x.region,
    country: x.country,
    clade: x.clade,
    host: x.host,
  }));
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
