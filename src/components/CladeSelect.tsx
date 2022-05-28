import { useQuery } from '../helpers/query-hook';
import { CladeCountSampleData } from '../data/CladeCountSampleDataset';
import { VariantSelector } from '../data/VariantSelector';
import { Autocomplete, TextField } from '@mui/material';

export interface Props {
  selected: VariantSelector;
  onSelect: (variant: VariantSelector) => void;
}

export const CladeSelect = ({ selected, onSelect }: Props) => {
  const { data: cladeDataset } = useQuery(signal => CladeCountSampleData.fromApi({}, signal), []);
  const allClades = cladeDataset?.payload.filter(x => x.clade).map(x => x.clade!);
  const allOptions = allClades && ['All clades', ...allClades];

  return allOptions ? (
    <Autocomplete
      autoComplete
      includeInputInList
      value={selected.clade ?? 'All clades'}
      size='small'
      sx={{ mr: 1, minWidth: 250 }}
      id='grouped-demo'
      options={allOptions}
      onChange={(event: any, newValue: any) => {
        if (newValue === null || newValue === 'All clades') {
          onSelect({});
        } else {
          onSelect({ clade: newValue });
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
