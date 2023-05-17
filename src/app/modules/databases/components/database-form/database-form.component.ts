import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Database } from '../../services/databases.service';

@Component({
  selector: 'app-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss'],
})
export class DatabaseFormComponent implements OnInit {
  @Input() public database?: Database;
  @Input() public loading = false;

  @Output() formSubmitted = new EventEmitter<Partial<Database>>();

  public form = new FormGroup({
    alias: new FormControl(this.database?.alias || '', [Validators.required]),
    uri: new FormControl(this.database?.uri || '', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  public submitForm(): void {
    if (!this.form.valid) {
      return;
    }
    this.formSubmitted.emit(this.form.value);
  }
}
