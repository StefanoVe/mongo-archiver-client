import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PingComponent } from './components/ping/ping.component';
import { ToggleDarkModeComponent } from './components/toggle-dark-mode/toggle-dark-mode.component';

@NgModule({
  declarations: [PingComponent, ToggleDarkModeComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PingComponent, ToggleDarkModeComponent],
})
export class SharedModule {}
