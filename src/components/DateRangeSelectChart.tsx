import { DateCountSampleData, DateCountSampleDataset } from "../data/DateCountSampleDataset";
import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, ComposedChart, Brush } from "recharts";

type Props = {
  dateCounts: DateCountSampleDataset;
}

export const DateRangeSelectChart = ({dateCounts}: Props) => {
  const yearCounts = useMemo(
    () => (DateCountSampleData.toYearCountSampleEntries(dateCounts.payload)
      .filter(e => e.year) as {year: number, count: number}[])
      .sort((e1, e2) => e1.year - e2.year),
    [dateCounts]
  );
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();

  const updateBrush = (pos: {startIndex: number, endIndex: number}) => {
    console.log(timerId);
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      const z = { startIndex: pos.startIndex, endIndex: pos.endIndex };
      console.log(z);
      console.log(yearCounts[z.startIndex], yearCounts[z.endIndex])
    }, 1500);
    setTimerId(newTimerId);
  }


  return <>
    <div className='flex justify-center'>
      <div className='w-full h-24 mx-1 lg:mx-16'>
        <ResponsiveContainer>
          <ComposedChart data={yearCounts}>
            <Brush height={90} dataKey="year" stroke="#8884d8" onChange={(e: any) => updateBrush(e)}>
              <AreaChart data={yearCounts}>
                <XAxis dataKey="year" domain={['dataMin', 'dataMax']} type='number' />
                <Area type="monotone" dataKey="count" fill="#b8f6ff" isAnimationActive={false} />
              </AreaChart>
            </Brush>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>;
}
