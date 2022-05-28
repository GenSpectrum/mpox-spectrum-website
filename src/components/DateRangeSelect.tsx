import { Autocomplete, TextField } from '@mui/material';
import { DateRangeSelector } from '../data/DateRangeSelector';

export interface Props {
  selected: DateRangeSelector;
  onSelect: (dateRange: DateRangeSelector) => void;
}

export const DateRangeSelect = ({ selected, onSelect }: Props) => {
  const options = ['All times', '2022'];
  let selectedOption;
  if (!selected.dateFrom && !selected.dateTo && !selected.yearFrom) {
    selectedOption = 'All times';
  } else if (selected.yearFrom === 2022) {
    selectedOption = '2022';
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
        if (newValue === null || newValue === 'All times') {
          onSelect({});
        } else if (newValue === '2022') {
          onSelect({ yearFrom: 2022 });
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
