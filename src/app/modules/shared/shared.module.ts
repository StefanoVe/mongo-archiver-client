import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PingComponent } from './components/ping/ping.component';
import { ToggleDarkModeComponent } from './components/toggle-dark-mode/toggle-dark-mode.component';
import { StatComponent } from './components/stat/stat.component';

@NgModule({
  declarations: [PingComponent, ToggleDarkModeComponent, StatComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PingComponent, ToggleDarkModeComponent, StatComponent],
})
export class SharedModule {}
