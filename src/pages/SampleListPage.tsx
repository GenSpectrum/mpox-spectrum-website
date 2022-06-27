import { Link, useLocation } from 'react-router-dom';
import { PageHeaderWithReturn } from '../components/PageHeaderWithReturn';
import { useQuery } from '../helpers/query-hook';
import { useExploreUrl } from '../helpers/explore-url';
import { DetailsSampleData } from '../data/DetailsSampleDataset';
import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { potentiallyPartialDateToString } from '../helpers/date-cache';
import { getLinkTo } from '../data/api-lapis';
import { Button } from '@mui/material';

export const SampleListPage = () => {
  const searchString = useLocation().search;
  const { selector } = useExploreUrl();
  const { data } = useQuery(signal => DetailsSampleData.fromApi(selector, signal), [selector]);
  const [selectionModel, setSelectionModel] = useState<any>([]);
  const [accessions, setAccessions] = useState<any>({ identifier: { accession: [] } });

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

  function handleDownloads(type: string, infoText: string, dataFormat: string = '') {
    let fileURL =
      dataFormat === 'csv'
        ? getLinkTo(type, accessions, undefined, true, 'csv')
        : getLinkTo(type, accessions, undefined, true);
    let tempLink = document.createElement('a');
    tempLink.href = fileURL;
    tempLink.click();
  }

  useEffect(() => {
    if (selectionModel.length > 0 && rows) {
      let selected = selectionModel.map((i: number) => {
        return rows[i].accession;
      });
      setAccessions({ identifier: { accession: selected } });
    }
  }, [selectionModel, rows]);

  if (!rows) {
    return <>Loading...</>;
  }

  return (
    <>
      {selectionModel.length > 0 && (
        <div className='m-8'>
          <Button
            variant='contained'
            sx={{ ml: 2 }}
            color='secondary'
            size='small'
            onClick={() => handleDownloads('fasta-aligned', 'aligned sequences')}
          >
            Download FASTA (aligned)
          </Button>
          <Button
            variant='contained'
            sx={{ ml: 2 }}
            color='secondary'
            size='small'
            onClick={() => handleDownloads('fasta', 'unaligned sequences')}
          >
            Download FASTA (unaligned)
          </Button>
          <Button
            variant='contained'
            sx={{ ml: 2 }}
            color='secondary'
            size='small'
            onClick={() => handleDownloads('details', 'metadata', 'csv')}
          >
            Download metadata
          </Button>
        </div>
      )}

      <PageHeaderWithReturn title='Selected samples' to={`../explore${searchString}`} />
      <div style={{ width: '100%' }}>
        <DataGrid
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={newSelection => {
            let res = [];
            for (let i of newSelection) {
              res.push(i);
            }
            setSelectionModel(res);
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
