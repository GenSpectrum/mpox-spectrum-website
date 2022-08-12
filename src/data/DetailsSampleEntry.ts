import { UnifiedDay } from '../helpers/date-cache';

export type DetailsSampleEntry = {
  accession: string;
  strain: string | null;
  sraAccession: string | null;
  date: UnifiedDay | null;
  year: number | null;
  month: number | null;
  dateSubmitted: UnifiedDay | null;
  region: string | null;
  country: string | null;
  division: string | null;
  clade: string | null;
  lineage: string | null;
  host: string | null;
};
