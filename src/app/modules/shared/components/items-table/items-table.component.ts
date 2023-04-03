import {
  Component,
  EventEmitter,
  InjectionToken,
  Injector,
  Input,
  OnInit,
  Output,
  Type,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export interface TableCell {
  value?: string;
  url?: string;
  route?: string;
  badge?: 'available' | 'pending' | 'unavailable';
  html?: SafeHtml;
  button?: SafeHtml;
  component?: {
    component: Type<any>;
    data: Record<string, unknown>;
    token: InjectionToken<any>;
  };
  data?: any;
}

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent implements OnInit {
  @Input() headers: string[] = ['placeholder1', 'placeholder2', 'placeholder3'];
  @Input() rows: TableCell[][] = [];

  @Output() buttonClicked = new EventEmitter<{
    index: number;
    row: TableCell[];
  }>();

  public injectors: Injector[] = [];

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    //fill injectors with n empty injectors (one for each row)
    this.injectors = Array(this.rows.length).fill(null);

    //create injector for each row
    this.rows.forEach((row, index) => {
      const context = row.find((cell) => cell.component);
      if (context) {
        this.createInjector(context.component, index);
      }
    });
  }

  public createInjector(context: TableCell['component'], index: number) {
    if (!context) {
      this.injectors[index] = Injector.create({
        parent: this.injector,
        providers: [],
      });
      return;
    }

    const _context = context?.data;

    const providers = [
      {
        provide: context.token,
        useValue: _context,
      },
    ];

    this.injectors[index] = Injector.create({
      providers,
      parent: this.injector,
    });
  }
}
