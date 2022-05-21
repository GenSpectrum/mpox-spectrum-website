import { addLapisSelectorToUrlSearchParams, LapisSelector } from '../data/LapisSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export type ExploreUrl = {
  selector: LapisSelector;
  setSelector: (selector: LapisSelector) => void;
};

export function useExploreUrl(): ExploreUrl {
  const searchString = useLocation().search;
  const searchParam = useMemo(() => new URLSearchParams(searchString), [searchString]);

  const selector: LapisSelector = useMemo(
    () => ({
      location: {
        region: searchParam.get('region') ?? undefined,
        country: searchParam.get('country') ?? undefined,
        division: searchParam.get('division') ?? undefined,
      },
      host: searchParam.get('host')?.split(','),
    }),
    [searchParam]
  );

  const navigate = useNavigate();
  const setSelector = useCallback(
    (selector: LapisSelector) => {
      const newParams = new URLSearchParams();
      addLapisSelectorToUrlSearchParams(selector, newParams);
      navigate(`.?${newParams.toString()}`);
    },
    [navigate]
  );

  return { selector, setSelector };
}
