import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { fetchCladeCountSamples } from './api-lapis';
import { CladeCountSampleEntry } from './CladeCountSampleEntry';

export type CladeCountSampleDataset = Dataset<LapisSelector, CladeCountSampleEntry[]>;

export class CladeCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<CladeCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchCladeCountSamples(selector, signal),
    };
  }
}
