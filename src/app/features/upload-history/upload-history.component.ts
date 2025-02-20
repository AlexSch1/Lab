import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { selectResources, selectSelectedResource } from '../../store/resources/resources.selector';
import { selectResourceAction } from '../../store/resources/resources.action';
import { DataResource } from '../../store/resources/resources.state';

@Component({
  selector: 'app-upload-history',
  imports: [TableModule, Card, AsyncPipe, DatePipe, Button, NoDataComponent],
  templateUrl: './upload-history.component.html',
})
export class UploadHistoryComponent {
  store = inject(Store);
  resources$ = this.store.select(selectResources);
  selectedResource$ = this.store.select(selectSelectedResource);

  onSelectResource(resource: DataResource) {
    this.store.dispatch(selectResourceAction({ payload: resource }));
  }
}
