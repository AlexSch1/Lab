import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { VisualizationModeComponent } from './components/visualization-mode/visualization-mode.component';
import { PreviewMode } from '../../shared/enums/preview-mode';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { selectResources } from '../../store/resources/resources.selector';

@Component({
  selector: 'app-data-visualization',
  imports: [Card, VisualizationModeComponent, PieChartComponent, AsyncPipe, NoDataComponent, BarChartComponent, NgIf],
  templateUrl: './data-visualization.component.html',
  styleUrl: './data-visualization.component.less',
})
export class DataVisualizationComponent {
  mode: PreviewMode = PreviewMode.Pie;
  PreviewMode = PreviewMode;
  store = inject(Store);
  resources$ = this.store.select(selectResources);
}
