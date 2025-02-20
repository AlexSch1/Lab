import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { BaseChart } from '../base-chart/BaseChart';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip, withLatestFrom } from 'rxjs';
import * as d3 from 'd3';
import { selectSelectedResource } from '../../../../store/resources/resources.selector';
import { selectFiltersState } from '../../../../store/filters/filters.selector';
import { DataEntry } from '../../../../store/resources/resources.state';
import { D3HelpersService } from '../../../../shared/services/d3-helpers.service';
import {TooltipComponent} from '../../../../components/tooltip/tooltip.component';

type Slices = d3.Selection<d3.BaseType, DataEntry, SVGElement, DataEntry>;
type Axis = d3.Selection<SVGGElement, DataEntry, HTMLElement, d3.PieArcDatum<DataEntry>>;
type XScaleBand = d3.ScaleBand<string>;
type YScaleBand = d3.ScaleLinear<number, number>;

@Component({
  selector: 'app-bar-chart',
  imports: [
    TooltipComponent
  ],
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent extends BaseChart<DataEntry> implements AfterViewInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private d3HelpersService = inject(D3HelpersService);
  private resource$ = this.store.select(selectSelectedResource);
  private filters$ = this.store.select(selectFiltersState);
  private selectorTooltip = '#bar-tooltip';
  private margin = { top: 30, right: 30, bottom: 70, left: 60 };
  private x!: XScaleBand;
  private y!: YScaleBand;
  private xAxis!: Axis;
  private yAxis!: Axis;

  ngAfterViewInit() {
    this.resource$
      .pipe(withLatestFrom(this.filters$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([resource, filters]) => {
        this.resetState();
        this.init();
        this.data = resource?.data || [];
        this.update(this.d3HelpersService.applyFilters(filters, this.data), this.x, this.y, this.xAxis, this.yAxis);
      });

    this.filters$.pipe(takeUntilDestroyed(this.destroyRef), skip(1)).subscribe((filters) => {
      this.update(this.d3HelpersService.applyFilters(filters, this.data), this.x, this.y, this.xAxis, this.yAxis);
    });
  }

  init() {
    this.width = 400 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.selector = 'figure#bar';
    this.createRootSvg();
    this.xAxis = this.svg.append('g').attr('transform', `translate(0,${this.height})`);
    this.yAxis = this.svg.append('g').attr('class', 'myYaxis');
    this.x = d3.scaleBand().range([0, this.width]).padding(0.2);
    this.y = d3.scaleLinear().range([this.height, 0]);
  }

  createRootSvg() {
    this.svg = d3
      .select<HTMLElement, DataEntry>(this.selector)
      .append<SVGElement>('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append<SVGElement>('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  update(data: DataEntry[], x: XScaleBand, y: YScaleBand, xAxis: Axis, yAxis: Axis) {
    const slices = this.svg.selectAll('rect').data(data);

    x.domain(data.map((d) => d.category));
    xAxis.call(d3.axisBottom(x));
    y.domain([0, d3.max(data, (d): number => d.value)!]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    slices
      .join('rect')
      .call(this.addTooltip.bind(this))
      .transition()
      .duration(1000)
      .attr('x', (d) => x(d.category)!)
      .attr('y', (d) => y(Math.max(0, d.value)))
      .attr('width', x.bandwidth())
      .attr('height', (d) => Math.abs(y(d.value) - y(0)))
      .attr('fill', '#69b3a2');
  }

  private addTooltip(slices: Slices) {
    const tooltip = d3.select(this.selectorTooltip);

    slices
      .on('mouseover', (event: MouseEvent, d: DataEntry) => {
        tooltip
          .style('display', 'block')
          .style('opacity', 1)
          .style('transform', `translate(${event.pageX + 10}px, ${event.pageY - 20}px)`)
          .text(`${d.category}: ${d.value}`);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip.style('transform', `translate(${event.pageX + 10}px, ${event.pageY - 20}px)`);
      })
      .on('mouseout', (_event: MouseEvent) => {
        tooltip.style('display', 'none');
      });
  }
}
