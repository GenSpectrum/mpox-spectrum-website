import { Dataset } from './Dataset';
import { LapisSelector } from './LapisSelector';
import { MutationEntry } from './MutationEntry';
import { fetchMutations } from './api-lapis';

export type MutationDataset = Dataset<LapisSelector, MutationEntry[]>;

export type SequenceType = 'nuc' | 'aa';

export class MutationData {
  static async fromApi(
    selector: LapisSelector,
    sequenceType: SequenceType,
    signal?: AbortSignal
  ): Promise<MutationDataset> {
    return {
      selector: selector,
      payload: await fetchMutations(selector, sequenceType, signal),
    };
  }
}
