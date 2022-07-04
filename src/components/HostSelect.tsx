import { useQuery } from '../helpers/query-hook';
import { HostCountSampleData } from '../data/HostCountSampleDataset';
import { Autocomplete, TextField } from '@mui/material';
import { HostSelector } from '../data/HostSelector';

export interface Props {
  selected: HostSelector;
  onSelect: (host: HostSelector) => void;
}

export const HostSelect = ({ selected, onSelect }: Props) => {
  const { data: hostDataset } = useQuery(signal => HostCountSampleData.fromApi({}, signal), []);
  const allHosts = hostDataset?.payload
    .filter(x => x.host)
    .map(x => x.host!)
    .sort();
  const allOptions = allHosts && ['All hosts', ...allHosts];

  return allOptions ? (
    <Autocomplete
      autoComplete
      includeInputInList
      value={selected[0] ?? 'All hosts'}
      size='small'
      sx={{ mr: 1, minWidth: 250 }}
      id='grouped-demo'
      options={allOptions}
      onChange={(event: any, newValue: any) => {
        if (newValue === null || newValue === 'All hosts') {
          onSelect([]);
        } else {
          onSelect([newValue]);
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
