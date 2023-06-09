import { Component, Input } from '@angular/core';

@Component({
  selector: 'golden-tailwind-submit-button',
  templateUrl: './tailwind-submit-button.component.html',
})
export class TailwindSubmitButtonComponent {
  @Input() label = 'Invia';
  @Input() invalid = true;
  @Input() loading = false;
  @Input() showCancelButton = false;
  @Input() cancelButtonRouterLink = '';
  @Input() cancelButtonLabel = 'Annulla';

  isDisabled() {
    return this.loading || this.invalid;
  }
}
