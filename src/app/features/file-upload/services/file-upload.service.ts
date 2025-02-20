import { inject, Injectable } from '@angular/core';
import { FileReaderService } from '../../../shared/services/file-reader.service';
import { Store } from '@ngrx/store';
import { DataEntry } from '../../../store/resources/resources.state';
import { v4 as uuidv4 } from 'uuid';
import { uploadResourceAction } from '../../../store/resources/resources.action';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private toastService = inject(ToastService);
  private fileReaderService = inject(FileReaderService);
  private store = inject(Store);

  async fileUpload(file: File) {
    try {
      const data = await this.fileReaderService.readJsonFile<DataEntry[]>(file);

      this.store.dispatch(
        uploadResourceAction({
          payload: {
            data,
            fileName: file.name,
            uploadedDate: new Date(),
            id: uuidv4(),
          },
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        this.toastService.error(error.message);
      }
    }
  }
}
