import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-toggle-dark-mode',
  templateUrl: './toggle-dark-mode.component.html',
  styleUrls: ['./toggle-dark-mode.component.scss'],
})
export class ToggleDarkModeComponent {
  @Input() showLabel = true;

  public handleDarkMode() {
    const darkModeGetter = localStorage.getItem('darkMode');

    if (darkModeGetter === 'true') {
      localStorage.setItem('darkMode', 'false');
      return;
    }
    localStorage.setItem('darkMode', 'true');
  }

  public isDarkModeChecked() {
    const darkModeGetter = localStorage.getItem('darkMode');

    if (!darkModeGetter) {
      return true;
    }

    return darkModeGetter === 'true';
  }
}
