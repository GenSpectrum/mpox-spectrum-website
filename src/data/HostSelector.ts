export type HostSelector = string[];

export function addHostSelectorToUrlSearchParams(selector: HostSelector, params: URLSearchParams) {
  params.delete('host');
  if (selector.length > 0) {
    // TODO We assume that the names of the hosts do not have a ",". Is it safe?
    //  This is currently the case for all of our data.
    params.set('host', selector.join(','));
  }
}
