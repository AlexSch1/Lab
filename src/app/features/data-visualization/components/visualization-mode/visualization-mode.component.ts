import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButton, RadioButtonClickEvent } from 'primeng/radiobutton';
import { PreviewMode } from '../../../../shared/enums/preview-mode';

@Component({
  selector: 'app-visualization-mode',
  imports: [FormsModule, RadioButton],
  templateUrl: './visualization-mode.component.html',
  styleUrl: './visualization-mode.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationModeComponent {
  modeChanged = output<PreviewMode>();
  mode = signal(PreviewMode.Pie);
  PreviewMode = PreviewMode;

  changeMode({ value }: RadioButtonClickEvent) {
    this.mode.set(value);
    this.modeChanged.emit(this.mode());
  }
}
