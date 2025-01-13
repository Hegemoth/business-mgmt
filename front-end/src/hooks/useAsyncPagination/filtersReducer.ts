import { FilterAction } from '../../types/api';
import { getFilterName } from '../../utils/data-utils';

export const filtersReducer = (
  state: string[],
  action: { type: FilterAction; filters: string[] }
): string[] => {
  switch (action.type) {
    case 'add':
      return (state || []).concat(action.filters);

    case 'replace':
      const toBeReplaced = action.filters.map((f) => getFilterName(f));
      return state
        ?.reduce((acc, curr) => {
          if (toBeReplaced.includes(getFilterName(curr))) return acc;
          return [curr, ...acc];
        }, [] as string[])
        .concat(action.filters);

    case 'remove':
      const toBeRemoved = action.filters.map((f) => getFilterName(f));
      return state?.reduce((acc, curr) => {
        if (toBeRemoved.includes(getFilterName(curr))) return acc;
        return [curr, ...acc];
      }, [] as string[]);

    case 'reset':
      return action.filters;

    default:
      throw Error('Nieprawidłowa akcja');
  }
};
