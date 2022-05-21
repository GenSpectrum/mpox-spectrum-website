import { LapisInformation } from './LapisResponse';
import dayjs from 'dayjs';

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
