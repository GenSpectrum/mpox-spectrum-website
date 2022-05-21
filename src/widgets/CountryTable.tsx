import { CountryCountSampleDataset } from '../data/CountryCountSampleDataset';

type Props = {
  countryCounts: CountryCountSampleDataset;
};

export const CountryTable = ({ countryCounts }: Props) => {
  return (
    <>
      <table>
        <thead>
          <th>Country</th>
          <th>Number sequences</th>
        </thead>
        <tbody>
          {countryCounts.payload.map(({ country, count }) => (
            <tr key={country}>
              <td>{country ?? 'Unknown'}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
