import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseChart } from '../base-chart/BaseChart';
import { skip, withLatestFrom } from 'rxjs';
import * as d3 from 'd3';
import { selectSelectedResource } from '../../../../store/resources/resources.selector';
import { selectFiltersState } from '../../../../store/filters/filters.selector';
import { DataEntry } from '../../../../store/resources/resources.state';
import { D3HelpersService } from '../../../../shared/services/d3-helpers.service';
import {TooltipComponent} from '../../../../components/tooltip/tooltip.component';

type PieArcData = d3.PieArcDatum<DataEntry>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Arc = d3.Arc<any, unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pie = d3.Pie<any, DataEntry>;
type Slices = d3.Selection<d3.BaseType | SVGPathElement, d3.PieArcDatum<DataEntry>, SVGElement, DataEntry>;

@Component({
  selector: 'app-pie-chart',
  imports: [
    TooltipComponent
  ],
  providers: [],
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent extends BaseChart<DataEntry> implements AfterViewInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private d3HelpersService = inject(D3HelpersService);
  private resource$ = this.store.select(selectSelectedResource);
  private filters$ = this.store.select(selectFiltersState);
  private selectorTooltip = '#pie-tooltip';
  private colors!: d3.ScaleOrdinal<string, string>;
  private margin = 5;
  private radius = 40;

  ngAfterViewInit(): void {
    this.resource$
      .pipe(withLatestFrom(this.filters$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([resource, filters]) => {
        this.resetState();
        this.data = resource?.data || [];
        this.init();
        this.update(this.d3HelpersService.applyFilters(filters, this.data));
      });

    this.filters$.pipe(takeUntilDestroyed(this.destroyRef), skip(1)).subscribe((filters) => {
      this.update(this.d3HelpersService.applyFilters(filters, this.data));
    });
  }

  init() {
    this.width = 400;
    this.height = 400;
    this.selector = 'figure#pie';
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
    this.createRootSvg();
    this.colors = this.createColors();
  }

  update(data: DataEntry[]) {
    const pie = this.createPieLayout();
    const arc = this.generateArc();
    const slices = this.svg
      .selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('d', arc)
      .attr('fill', (d: PieArcData) => this.colors(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 1)
      .call(this.addTooltip.bind(this));

    this.addPieChartAnimation(slices, arc);
    this.addTitles(arc, pie, data);
  }

  createRootSvg() {
    this.svg = d3
      .select<HTMLElement, DataEntry>(this.selector)
      .append<SVGElement>('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append<SVGElement>('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  private addTitles(arc: Arc, pie: Pie, data: DataEntry[]) {
    this.svg
      .selectAll('text')
      .data(pie(data))
      .style('opacity', 0)
      .join('text')
      .style('pointer-events', 'none')
      .text((d: PieArcData) => d.data.category)
      .attr('transform', (d: PieArcData) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 17)
      .transition()
      .duration(1000)
      .style('opacity', 1);
  }

  private addTooltip(slices: Slices) {
    const tooltip = d3.select(this.selectorTooltip);

    slices
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .style('opacity', 1)
          .style('transform', `translate(${event.pageX + 10}px, ${event.pageY - 20}px)`)
          .text(`${d.data.category}: ${d.data.value}`);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip.style('transform', `translate(${event.pageX + 10}px, ${event.pageY - 20}px)`);
      })
      .on('mouseout', (_event: MouseEvent) => {
        tooltip.style('display', 'none');
      });
  }

  private addPieChartAnimation(slices: Slices, arc: Arc) {
    slices
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1)
      .attrTween('d', (d: PieArcData): ((t: number) => string) => {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);

        return (t: number): string => arc(interpolate(t)) as string;
      });
  }

  private generateArc() {
    return d3.arc<unknown>().innerRadius(0).outerRadius(this.radius);
  }

  private createPieLayout() {
    return d3
      .pie<DataEntry>()
      .sort(null)
      .value((d) => d.value);
  }

  private createColors() {
    return d3
      .scaleOrdinal<string>()
      .domain(this.data.map((d) => d.category))
      .range(d3.schemeSet2);
  }
}
