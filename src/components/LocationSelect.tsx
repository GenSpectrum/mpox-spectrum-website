import { Autocomplete, Box, TextField } from '@mui/material';
import {
  decodeLocationSelectorFromSingleString,
  encodeLocationSelectorToSingleString,
  LocationSelector,
} from '../data/LocationSelector';
import { LocationService } from '../services/LocationService';

export interface Props {
  selected: LocationSelector;
  onSelect: (location: LocationSelector) => void;
}

export const LocationSelect = ({ selected, onSelect }: Props) => {
  const geoOptions: { group: string; place: string; code?: string }[] = [{ group: 'World', place: 'World' }];
  geoOptions.push(
    ...LocationService.getCountries().map(country => ({
      group: 'Countries',
      place: country,
      code: LocationService.getIsoAlpha2Code(country),
    }))
  );

  return (
    <>
      <Autocomplete
        autoComplete
        includeInputInList
        value={[...new Set(geoOptions)].find(x => x.place === encodeLocationSelectorToSingleString(selected))}
        isOptionEqualToValue={(option, value) => option.place === value.place}
        size='small'
        sx={{ mr: 1, minWidth: 250 }}
        id='grouped-demo'
        options={[...new Set(geoOptions)]}
        groupBy={option => option.group}
        getOptionLabel={option => option.place}
        onChange={(event: any, newValue: any) => {
          if (newValue !== null && newValue.place) {
            onSelect(decodeLocationSelectorFromSingleString(newValue.place));
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
        renderOption={(props, option) => (
          <Box component='li' {...props} sx={{ '& > img': { flexShrink: 0 } }}>
            {option.code && option.group === 'Countries' ? (
              <>
                <img
                  loading='lazy'
                  width='20'
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=''
                  className='mr-3 pl-0 ml-0'
                />{' '}
                <span>{option.place}</span>
              </>
            ) : !option.code && option.group === 'Countries' ? (
              <p style={{ marginLeft: '20px' }}>
                <span>{option.place}</span>
              </p>
            ) : (
              <span>{option.place}</span>
            )}
          </Box>
        )}
      />
    </>
  );
};
