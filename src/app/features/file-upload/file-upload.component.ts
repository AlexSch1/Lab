import { Component, inject } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  imports: [FileUpload, HttpClientModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.less'],
})
export class FileUploadComponent {
  private fileUploadService = inject(FileUploadService);

  async uploadHandler(event: FileUploadHandlerEvent) {
    this.fileUploadService.fileUpload(event.files[0]);
  }
}
