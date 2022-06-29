import { Link, useLocation } from 'react-router-dom';
import { PageHeaderWithReturn } from '../components/PageHeaderWithReturn';
import { useQuery } from '../helpers/query-hook';
import { useExploreUrl } from '../helpers/explore-url';
import { DetailsSampleData } from '../data/DetailsSampleDataset';
import React, { useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { potentiallyPartialDateToString } from '../helpers/date-cache';
import { TopButtons } from '../components/TopButtons';
import { LapisSelector } from '../data/LapisSelector';

export const SampleListPage = () => {
  const searchString = useLocation().search;
  const { selector } = useExploreUrl();
  const { data } = useQuery(signal => DetailsSampleData.fromApi(selector, signal), [selector]);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'accession',
      headerName: 'Accession',
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<string>) =>
        params.value ? (
          <Link to={`${encodeURIComponent(params.value)}`}>
            <button className='underline'>
              <span className='w-60 text-ellipsis overflow-hidden block text-left'>{params.value}</span>
            </button>
          </Link>
        ) : (
          <></>
        ),
    },
    {
      field: 'strain',
      headerName: 'Strain',
      minWidth: 250,
    },
    { field: 'date', headerName: 'Date', minWidth: 150 },
    { field: 'dateSubmitted', headerName: 'Submission date', minWidth: 150 },
    { field: 'region', headerName: 'Region', minWidth: 200 },
    { field: 'country', headerName: 'Country', minWidth: 250 },
    { field: 'clade', headerName: 'Clade', minWidth: 150 },
    { field: 'host', headerName: 'Host', minWidth: 200 },
  ];

  const rows = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data.payload.map((d, index) => ({
      ...d,
      date: potentiallyPartialDateToString(d),
      dateSubmitted: d.dateSubmitted?.string,
      id: index,
    }));
  }, [data]);

  const accessions = useMemo((): LapisSelector => {
    if (selectionModel.length > 0 && rows) {
      let selected = selectionModel.map((i: number) => {
        return rows[i].accession;
      });
      return { identifier: { accession: selected } };
    }
    return { identifier: { accession: [] } };
  }, [selectionModel, rows]);

  if (!rows) {
    return <>Loading...</>;
  }

  return (
    <>
      <PageHeaderWithReturn title='Selected samples' to={`../explore${searchString}`} />
      {selectionModel.length > 0 && (
        <div className='m-8 flex flex-row flex-wrap'>
          <div className='mx-4 my-1' style={{ zIndex: 10 }}>
            <TopButtons selector={accessions} hideTaxonium={true} hideSequenceTableButton={true} />
          </div>
        </div>
      )}

      <div style={{ width: '100%' }}>
        <DataGrid
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={newSelection => {
            setSelectionModel(newSelection.map(i => Number(i)));
          }}
          rows={rows}
          columns={columns}
          density={'compact'}
          autoHeight={true}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          rowsPerPageOptions={[100, 200, 500, 1000]}
        />
      </div>
    </>
  );
};
