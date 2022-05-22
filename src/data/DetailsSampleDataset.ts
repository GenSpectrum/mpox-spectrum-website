import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { DetailsSampleEntry } from './DetailsSampleEntry';
import { fetchDetailsSamples } from './api-lapis';

export type DetailsSampleDataset = Dataset<LapisSelector, DetailsSampleEntry[]>;

export class DetailsSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<DetailsSampleDataset> {
    return {
      selector: selector,
      payload: await fetchDetailsSamples(selector, signal),
    };
  }
}
