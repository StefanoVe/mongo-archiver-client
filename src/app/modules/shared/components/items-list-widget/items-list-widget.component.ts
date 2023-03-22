import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ITableRow {
  column1: string | number;
  column2: string | number;
  column3: string | number;
}

@Component({
  selector: 'app-items-list-widget',
  templateUrl: './items-list-widget.component.html',
  styleUrls: ['./items-list-widget.component.scss'],
})
export class ItemsListWidgetComponent {
  @Input() items: ITableRow[] = [];
  @Input() headers: Partial<[string, string, string]> = [];
  @Input() showMoreRoute = '';
  @Input() showMoreQueryParams: { [key: string]: string } = {};
  @Input() containerColor: string = 'muted';
  @Input() tableTitle = '';

  @Output() refreshData = new EventEmitter<void>();
}
