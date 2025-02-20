import { createReducer, on } from '@ngrx/store';
import { resourcesInitialState } from './resources.state';
import { HISTORY_LENGTH } from '../../shared/constants/history-length';
import { selectResourceAction, uploadResourceAction } from './resources.action';

export const resourcesReducer = createReducer(
  resourcesInitialState,
  on(uploadResourceAction, (state, { payload }) => ({
    ...state,
    history: [payload, ...state.history].slice(0, HISTORY_LENGTH),
    selectedResource: payload,
  })),
  on(selectResourceAction, (state, { payload }) => ({
    ...state,
    selectedResource: payload,
  })),
);
