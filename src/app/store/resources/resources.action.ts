import { createAction, props } from '@ngrx/store';
import { DataResource } from './resources.state';

export enum ResourcesActionType {
  UPLOAD = '[Resource Upload] Upload Resource...',
  SELECT = '[Resources History] Select Resource',
}

export const uploadResourceAction = createAction(ResourcesActionType.UPLOAD, props<{ payload: DataResource }>());

export const selectResourceAction = createAction(ResourcesActionType.SELECT, props<{ payload: DataResource }>());
