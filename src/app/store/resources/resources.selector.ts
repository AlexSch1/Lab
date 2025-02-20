import { AppState } from '../index';
import { createSelector } from '@ngrx/store';
import { ResourcesState } from './resources.state';

export const selectResourcesState = (state: AppState) => state.resources;

export const selectSelectedResource = createSelector(
  selectResourcesState,
  (state: ResourcesState) => state.selectedResource,
);

export const selectResources = createSelector(selectResourcesState, (state: ResourcesState) => state.history);
