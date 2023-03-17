import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TailwindFormsService } from '../../services/tailwind-forms.service';

@Component({
  selector: 'golden-tailwind-dropdown',
  templateUrl: './tailwind-dropdown.component.html',
})
export class TailwindDropdownComponent implements OnChanges {
  @Input() parent!: FormGroup;
  @Input() label!: string;
  @Input() placeholder = "Scegli un'opzione";
  @Input() name!: string;
  @Input() options!: { name: string; value: string }[];
  @Input() validationErrors!: { [key: string]: string };

  public searchTerm = '';

  constructor(private tailwindFormService: TailwindFormsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validationErrors']) {
      this.validationErrors =
        this.tailwindFormService.fillValidationErrorsWithMissing(
          this.parent.get(this.name),
          this.validationErrors
        );
    }
  }

  public isSelected(value: string) {
    return this.parent.get(this.name)?.value === value;
  }

  public handleSelectItem(item: string) {
    //replace the first and last ' with empty string
    const validItem = item.split(':')[1].trim().slice(1, -1);

    if (this.isSelected(validItem)) {
      this.parent.get(this.name)?.setValue(null);
      return;
    }

    this.parent.get(this.name)?.setValue(validItem);
  }

  get hasErrors() {
    return this.parent.get(this.name)?.errors;
  }

  get touched() {
    return this.parent.get(this.name)?.touched;
  }

  get showValidationErrors() {
    return this.hasErrors && this.touched;
  }

  get validationErrorMessage() {
    if (!this.hasErrors) {
      return '';
    }

    return this.validationErrors[Object.keys(this.hasErrors)[0]];
  }

  public selectedOption() {
    return this.options.find(
      (option) => option.value === this.parent.get(this.name)?.value
    );
  }

  public onModelChange(value: string) {
    this.searchTerm = value;
  }

  public filteredItems() {
    if (!this.searchTerm.length) {
      return this.options;
    }

    return this.options.filter((i) =>
      String(i.name).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
