import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemsListWidgetComponent } from './components/items-list-widget/items-list-widget.component';
import { PingComponent } from './components/ping/ping.component';
import { StatComponent } from './components/stat/stat.component';
import { ToggleDarkModeComponent } from './components/toggle-dark-mode/toggle-dark-mode.component';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [
    PingComponent,
    ToggleDarkModeComponent,
    StatComponent,
    ItemsListWidgetComponent,
    ItemsTableComponent,
    BadgeComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [
    PingComponent,
    ToggleDarkModeComponent,
    StatComponent,
    ItemsListWidgetComponent,
    ItemsTableComponent,
    BadgeComponent,
  ],
})
export class SharedModule {}
