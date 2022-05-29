import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { ContributorsSampleEntry } from './ContributorsSampleEntry';
import { fetchContributorsSamples } from './api-lapis';

export type ContributorsSampleDataset = Dataset<LapisSelector, ContributorsSampleEntry[]>;

export class ContributorsSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<ContributorsSampleDataset> {
    return {
      selector: selector,
      payload: await fetchContributorsSamples(selector, signal),
    };
  }
}
