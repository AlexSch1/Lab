import { SortDirection } from '../../shared/enums/sort-direction';

export interface FiltersState {
  direction: SortDirection | null;
  filterMinValue: boolean;
}

export const filtersInitialState: FiltersState = {
  direction: null,
  filterMinValue: false,
};
