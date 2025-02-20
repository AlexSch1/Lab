import { Injectable } from '@angular/core';
import { FiltersState } from '../../store/filters/filters.state';
import { DataEntry } from '../../store/resources/resources.state';
import { filterMinValue } from '../../utils/filterMinValue';
import { sortData } from '../../utils/sortData';

@Injectable({
  providedIn: 'root',
})
export class D3HelpersService {
  applyFilters(filters: FiltersState, data: DataEntry[]) {
    let filteredData = [...data];

    if (filters.filterMinValue) {
      filteredData = filterMinValue(filteredData);
    }

    if (filters.direction) {
      filteredData = sortData(filteredData, filters.direction);
    }

    return filteredData;
  }
}
