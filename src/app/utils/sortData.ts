import { SortDirection } from '../shared/enums/sort-direction';
import {DataEntry} from '../store/resources/resources.state';

export const sortData = (data: DataEntry[], direction: SortDirection): DataEntry[] => {
  return data.sort((a, b) => {
    if (direction === SortDirection.ASC) {
      return a.category.localeCompare(b.category);
    } else if (direction === SortDirection.DESC) {
      return b.category.localeCompare(a.category);
    }

    return 0;
  });
};
