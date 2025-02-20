import { AfterViewInit, Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export abstract class BaseChart<T> implements AfterViewInit {
  protected svg!: d3.Selection<SVGElement, T, HTMLElement, d3.PieArcDatum<T>>;
  protected width!: number;
  protected height!: number;
  protected data: T[] = [];
  protected selector!: string;

  abstract ngAfterViewInit(): void;
  abstract init(data: T[]): void;
  abstract update(data: T[], ...args: unknown[]): void;
  protected abstract createRootSvg(): void;

  protected resetState() {
    if (this.svg) {
      d3.select(this.selector).selectAll('*').remove();
    }
  }
}
