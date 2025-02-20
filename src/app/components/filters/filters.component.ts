import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';
import { Select } from 'primeng/select';
import { SortDirection } from '../../shared/enums/sort-direction';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { updateFiltersAction } from '../../store/filters/filters.action';
import { selectSelectedResource } from '../../store/resources/resources.selector';

@Component({
  selector: 'app-filters',
  imports: [Card, FormsModule, Select, ReactiveFormsModule, ToggleButton],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.less',
})
export class FiltersComponent implements OnInit {
  options = [SortDirection.ASC, SortDirection.DESC];
  formBuilder: FormBuilder = inject(FormBuilder);
  formGroup: FormGroup = this.formBuilder.group({
    direction: null,
    filterMinValue: null,
  });
  private store = inject(Store);
  private resource$ = this.store.select(selectSelectedResource);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.handleFilterChanges();
    this.handleFormStatus();
  }

  private handleFormStatus() {
    this.resource$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((resource) => {
      if (resource) {
        this.formGroup.enable({ emitEvent: false });
      } else {
        this.formGroup.disable({ emitEvent: false });
      }
    });
  }

  private handleFilterChanges() {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.store.dispatch(updateFiltersAction({ payload: value }));
    });
  }
}
