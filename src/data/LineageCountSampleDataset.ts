import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { fetchLineageCountSamples } from './api-lapis';
import { LineageCountSampleEntry } from './LineageCountSampleEntry';

export type LineageCountSampleDataset = Dataset<LapisSelector, LineageCountSampleEntry[]>;

export class LineageCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<LineageCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchLineageCountSamples(selector, signal),
    };
  }
}
