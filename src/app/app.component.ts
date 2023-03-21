import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public darkMode: { strategy: 'class' | 'media'; enabled: boolean } = {
    strategy: 'media',
    enabled: true,
  };

  public handleDarkMode() {
    const hasDarkModeVar = localStorage.getItem('darkMode');

    if (!hasDarkModeVar) {
      return;
    }

    const isEnabled = hasDarkModeVar === 'true';
    this.darkMode = {
      strategy: 'class',
      enabled: isEnabled,
    };

    return this.darkMode;
  }
}
