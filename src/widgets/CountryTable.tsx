import { CountryCountSampleDataset } from '../data/CountryCountSampleDataset';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {
  countryCounts: CountryCountSampleDataset;
};

export const CountryTable = ({ countryCounts }: Props) => {
  const columns: GridColDef[] = [
    { field: 'country', headerName: 'Country', minWidth: 250 },
    { field: 'count', headerName: 'Number sequences', minWidth: 200 },
  ];

  const rows = countryCounts.payload.map(({ country, count }, index) => ({
    id: index,
    country: country ?? 'Unknown',
    count,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        density={'compact'}
        hideFooterPagination={true}
        initialState={{
          sorting: {
            sortModel: [{ field: 'count', sort: 'desc' }],
          },
        }}
      />
    </div>
  );
};
