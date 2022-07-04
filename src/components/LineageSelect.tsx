import { useQuery } from '../helpers/query-hook';
import { LineageCountSampleData } from '../data/LineageCountSampleDataset';
import { VariantSelector } from '../data/VariantSelector';
import { Autocomplete, TextField } from '@mui/material';

export interface Props {
  selected: VariantSelector;
  onSelect: (variant: VariantSelector) => void;
}

export const LineageSelect = ({ selected, onSelect }: Props) => {
  const { data: lineageDataset } = useQuery(signal => LineageCountSampleData.fromApi({}, signal), []);
  const allLineages = lineageDataset?.payload
    .filter(x => x.lineage)
    .map(x => x.lineage!)
    .sort();
  const allOptions = allLineages && ['All lineages', ...allLineages];

  return allOptions ? (
    <Autocomplete
      autoComplete
      includeInputInList
      value={selected.lineage ?? 'All lineages'}
      size='small'
      sx={{ mr: 1, minWidth: 250 }}
      id='grouped-demo'
      options={allOptions}
      onChange={(event: any, newValue: any) => {
        if (newValue === null || newValue === 'All lineages') {
          onSelect({ ...selected, lineage: undefined });
        } else {
          onSelect({ ...selected, lineage: newValue });
        }
      }}
      renderInput={params => (
        <TextField
          variant='standard'
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  ) : (
    <></>
  );
};
