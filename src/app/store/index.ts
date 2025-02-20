import { ResourcesState } from './resources/resources.state';
import { resourcesReducer } from './resources/resources.reducer';
import { FiltersState } from './filters/filters.state';
import { filtersReducer } from './filters/filters.reducer';

export interface AppState {
  resources: ResourcesState;
  filters: FiltersState;
}

export const APP_STATE_REDUCER = {
  resources: resourcesReducer,
  filters: filtersReducer,
};

export const metaReducers = [];
