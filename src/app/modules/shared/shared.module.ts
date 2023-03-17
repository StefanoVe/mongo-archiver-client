import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PingComponent } from './ping/ping.component';

@NgModule({
  declarations: [PingComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PingComponent],
})
export class SharedModule {}
