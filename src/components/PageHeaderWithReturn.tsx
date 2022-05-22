import styled from 'styled-components';
import { Button, ButtonVariant } from '../helpers/ui';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  to: string;
};

export const PageHeaderWithReturn = ({ title, to }: Props) => {
  return (
    <HeaderWrapper>
      <div className='pt-10 lg:pt-0 ml-1 md:ml-3 w-full relative'>
        <div className='absolute top-0 right-0 md:right-4'>
          <Link to={to}>
            <Button className='mt-2' variant={ButtonVariant.SECONDARY}>
              <div className='px-1 py-2'>Back to overview</div>
            </Button>
          </Link>
        </div>
        <div className='flex'>
          <div className='flex-grow flex flex-row flex-wrap items-end'>
            <h1 className='md:mr-2'>{title}</h1>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  padding: 15px;
`;
