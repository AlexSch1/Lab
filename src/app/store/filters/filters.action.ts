import { createAction, props } from '@ngrx/store';
import { FiltersState } from './filters.state';

export enum FiltersActionType {
  UPDATE = '[Update] Update Filter...',
}

export const updateFiltersAction = createAction(FiltersActionType.UPDATE, props<{ payload: FiltersState }>());
