import { MutationDataset, SequenceType } from '../data/MutationDataset';
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { useMemo, useState } from 'react';

type Props = {
  mutations: MutationDataset;
  sequenceType: SequenceType;
};

export const MutationList = ({ mutations }: Props) => {
  const { width } = useResizeDetector<HTMLDivElement>();
  const filteredMutations = useMemo(() => mutations.payload.filter(m => m.proportion > 0.05), [mutations]);
  const [show, setShow] = useState(filteredMutations.length < 100);

  return (
    <>
      <div>
        <b>Note:</b> The mutations are based on an initial alignment using "MPXV-UK_P2 MT903344.1" as the
        reference. There will likely be changes.
      </div>
      There are {filteredMutations.length} mutations with a proportion of at least 5%.{' '}
      {!show && (
        <button className='underline' onClick={() => setShow(true)}>
          Show the mutations.
        </button>
      )}
      {show && (
        <List width={width ?? 500}>
          {filteredMutations.map(({ mutation, proportion }) => (
            <MutationEntry key={mutation}>
              {mutation} ({(proportion * 100).toFixed(2)}%)
            </MutationEntry>
          ))}
        </List>
      )}
    </>
  );
};

interface ListProps {
  width: number;
}

const List = styled.ul<ListProps>`
  list-style-type: disc;
  margin-top: 10px;
  column-count: ${props => (Math.floor(props.width / 280) >= 1 ? Math.floor(props.width / 300) : 1)};
`;

const MutationEntry = styled.li`
  width: 260px;
  display: inline-block;
`;
