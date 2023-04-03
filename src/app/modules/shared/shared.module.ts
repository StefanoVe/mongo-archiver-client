import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeComponent } from './components/badge/badge.component';
import { ItemsListWidgetComponent } from './components/items-list-widget/items-list-widget.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import {
  PingComponent,
  PING_DATA_TOKEN,
} from './components/ping/ping.component';
import { StatComponent } from './components/stat/stat.component';
import { ToggleDarkModeComponent } from './components/toggle-dark-mode/toggle-dark-mode.component';

@NgModule({
  declarations: [
    PingComponent,
    ToggleDarkModeComponent,
    StatComponent,
    ItemsListWidgetComponent,
    ItemsTableComponent,
    BadgeComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [
    PingComponent,
    ToggleDarkModeComponent,
    StatComponent,
    ItemsListWidgetComponent,
    ItemsTableComponent,
    BadgeComponent,
    LoadingComponent,
  ],
  providers: [
    {
      provide: PING_DATA_TOKEN,
      useValue: {},
    },
  ],
})
export class SharedModule {}
