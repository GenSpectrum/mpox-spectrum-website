import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { CountryCountSampleEntry } from './CountryCountSampleEntry';
import { fetchCountryCountSamples } from './api-lapis';

export type CountryCountSampleDataset = Dataset<LapisSelector, CountryCountSampleEntry[]>;

export class CountryCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<CountryCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchCountryCountSamples(selector, signal),
    };
  }
}
