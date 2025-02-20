export interface DataEntry {
  category: string;
  value: number;
}

export interface DataResource {
  id: string;
  fileName: string;
  uploadedDate: Date;
  data: DataEntry[];
}

export interface ResourcesState {
  history: DataResource[];
  selectedResource: DataResource | null;
}

export const resourcesInitialState: ResourcesState = {
  history: [],
  selectedResource: null,
};
