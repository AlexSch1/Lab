import {Component, input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.less'
})
export class TooltipComponent {
  id = input();
}
