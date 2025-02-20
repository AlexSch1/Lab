import { createReducer, on } from '@ngrx/store';
import { filtersInitialState } from './filters.state';
import { updateFiltersAction } from './filters.action';

export const filtersReducer = createReducer(
  filtersInitialState,
  on(updateFiltersAction, (state, { payload }) => {
    return {
      ...state,
      ...payload,
    };
  }),
);
