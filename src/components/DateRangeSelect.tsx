import { Autocomplete, TextField } from '@mui/material';
import { DateRangeSelector } from '../data/DateRangeSelector';
import { globalDateCache } from '../helpers/date-cache';

export interface Props {
  selected: DateRangeSelector;
  onSelect: (dateRange: DateRangeSelector) => void;
}

export const DateRangeSelect = ({ selected, onSelect }: Props) => {
  const options = ['All times', '2022-outbreak'];
  let selectedOption;
  if (!selected.dateFrom && !selected.dateTo) {
    selectedOption = 'All times';
  } else if (selected.dateFrom === globalDateCache.getDay('2022-01-01') && !selected.dateTo) {
    selectedOption = '2022-outbreak';
  } else {
    selectedOption = 'Custom';
  }

  return (
    <Autocomplete
      autoComplete
      includeInputInList
      value={selectedOption}
      size='small'
      sx={{ mr: 1, minWidth: 250 }}
      id='grouped-demo'
      options={options}
      onChange={(event: any, newValue: any) => {
        if (newValue === 'All times') {
          onSelect({});
        } else if (newValue === '2022-outbreak') {
          onSelect({ dateFrom: globalDateCache.getDay('2022-01-01') });
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
  );
};
