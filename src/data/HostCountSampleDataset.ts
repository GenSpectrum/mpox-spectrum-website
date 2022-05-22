import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { HostCountSampleEntry } from './HostCountSampleEntry';
import { fetchHostCountSamples } from './api-lapis';

export type HostCountSampleDataset = Dataset<LapisSelector, HostCountSampleEntry[]>;

export class HostCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<HostCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchHostCountSamples(selector, signal),
    };
  }
}
