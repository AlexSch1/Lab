import { Component } from '@angular/core';
import { FileUploadComponent } from '../../features/file-upload/file-upload.component';
import { DataVisualizationComponent } from '../../features/data-visualization/data-visualization.component';
import { UploadHistoryComponent } from '../../features/upload-history/upload-history.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-home',
  imports: [FileUploadComponent, DataVisualizationComponent, UploadHistoryComponent, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {}
