import { Dataset } from './Dataset';
import { LocationCountSampleEntry } from './LocationCountSampleEntry';
import { fetchLocationCountSamples } from './api-lapis';
import { LapisSelector } from './LapisSelector';

export type LocationCountSampleDataset = Dataset<LapisSelector, LocationCountSampleEntry[]>;

export class LocationCountSampleData {
  static async fromApi(selector: LapisSelector, signal?: AbortSignal): Promise<LocationCountSampleDataset> {
    return {
      selector: selector,
      payload: await fetchLocationCountSamples(selector, signal),
    };
  }

  static countByDivisionGroup(data: LocationCountSampleEntry[]): {
    divisionData: Map<string, number>;
    geoInfoArray: { country: string | null; region: string | null }[];
  } {
    let geoInfoArray: { country: string | null; region: string | null }[] = [];
    const output = new Map<string, number>();
    for (const entry of data) {
      if (entry.division === null) {
        continue;
      }

      const oldCount = output.get(entry.division) ?? 0;
      output.set(entry.division, oldCount + entry.count);
      geoInfoArray.push({ country: entry.country, region: entry.region });
    }
    return { divisionData: output, geoInfoArray: geoInfoArray };
  }

  static proportionByDivision(
    variant: LocationCountSampleEntry[],
    whole: LocationCountSampleEntry[]
  ): {
    divisionData: Map<string, { count: number; proportion?: number }>;
    geoInfoArray: { country: string | null; region: string | null }[];
  } {
    const variantCounts = LocationCountSampleData.countByDivisionGroup(variant).divisionData;
    const wholeCounts = LocationCountSampleData.countByDivisionGroup(whole).divisionData;

    let divisionData: Map<string, { count: number; proportion?: number }> = new Map(
      [...variantCounts.entries()].map(([k, v]) => {
        const wholeCount = wholeCounts.get(k);
        return [
          k,
          {
            count: v,
            proportion: wholeCount === undefined ? undefined : v / wholeCount,
          },
        ];
      })
    );

    return {
      divisionData: divisionData,
      geoInfoArray: LocationCountSampleData.countByDivisionGroup(variant).geoInfoArray,
    };
  }
}
