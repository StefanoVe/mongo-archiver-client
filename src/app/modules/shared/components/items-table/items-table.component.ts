import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export interface TableCell {
  value?: string;
  url?: string;
  route?: string;
  badge?: 'available' | 'pending' | 'unavailable';
  html?: SafeHtml;
}

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent implements OnInit {
  @Input() headers: string[] = ['placeholder1', 'placeholder2', 'placeholder3'];
  @Input() rows: TableCell[][] = [];

  constructor() {}

  ngOnInit(): void {}
}
