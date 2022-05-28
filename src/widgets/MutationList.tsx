import { MutationDataset, SequenceType } from '../data/MutationDataset';
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { useMemo, useState } from 'react';
import { sortListByNucMutation } from '../helpers/nuc-mutation';
import { ExternalLink } from '../components/ExternalLink';

type Props = {
  mutations: MutationDataset;
  sequenceType: SequenceType;
  hideProportions?: boolean;
};

export const MutationList = ({ mutations, hideProportions = false }: Props) => {
  const { width, ref } = useResizeDetector<HTMLDivElement>();
  const displayedMutations = useMemo(() => {
    const filtered = mutations.payload.filter(m => !m.mutation.endsWith('-') && m.proportion > 0.05);
    return sortListByNucMutation(filtered, x => x.mutation);
  }, [mutations]);
  const [show, setShow] = useState(displayedMutations.length < 100);
  return (
    <div ref={ref}>
      <div>
        <b>Note:</b> The mutations are based on an alignment using{' '}
        <ExternalLink url='https://nextclade.vercel.app'>Nextclade</ExternalLink> with "MPXV-UK_P2 MT903344.1"
        as the reference. The reference genome might change in the future.
      </div>
      There are {displayedMutations.length} mutations{!hideProportions && ' with a proportion of at least 5%'}
      .{' '}
      {!show && (
        <button className='underline' onClick={() => setShow(true)}>
          Show the mutations.
        </button>
      )}
      {show && (
        <List width={width ?? 1} columnWidth={hideProportions ? 'narrow' : 'normal'}>
          {displayedMutations.map(({ mutation, proportion }) => (
            <MutationEntry key={mutation}>
              {mutation} {!hideProportions && <>({(proportion * 100).toFixed(2)}%)</>}
            </MutationEntry>
          ))}
        </List>
      )}
    </div>
  );
};

interface ListProps {
  width: number;
  columnWidth: 'narrow' | 'normal';
}

const List = styled.ul<ListProps>`
  list-style-type: disc;
  margin-top: 10px;
  column-count: ${props => Math.floor(props.width / (props.columnWidth === 'normal' ? 280 : 150))};
`;

const MutationEntry = styled.li`
  width: 260px;
  display: inline-block;
`;
