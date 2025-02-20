import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  imports: [],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDataComponent {
  message = input('No data.');
}
