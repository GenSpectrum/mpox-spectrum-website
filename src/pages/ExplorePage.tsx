import { TopFilterArea } from '../components/TopFilterArea';
import { useExploreUrl } from '../helpers/explore-url';

export const ExplorePage = () => {
  const { selector, setSelector } = useExploreUrl();

  return (
    <>
      <div className='m-8'>
        <TopFilterArea
          location={selector.location!}
          setLocation={newLocation => setSelector({ ...selector, location: newLocation })}
        />
      </div>
    </>
  );
};
