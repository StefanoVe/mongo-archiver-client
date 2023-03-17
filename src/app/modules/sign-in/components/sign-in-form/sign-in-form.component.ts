import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, tap } from 'rxjs';
import { IPingStatus } from 'src/app/modules/shared/ping/ping.component';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<{
    url: string;
    apiKey: string;
  }>();

  public pingSubject$ = new Subject<{
    url: string;
    apiKey: string;
  }>();
  public pingResult: IPingStatus = '';

  public form: FormGroup = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(http|https):\/\/[^ "]+$/),
    ]),
    apiKey: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    //subscribe to form changes
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        tap((v) => {
          //if the form is valid, emit the event
          if (!this.form.valid) {
            return;
          }

          console.log('emitting', v);
          this.pingSubject$.next(v);
        })
      )
      .subscribe();
  }

  public onSubmit() {
    if (!this.form.valid || this.pingResult !== 'success') {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmitted.emit(this.form.value);
  }
}
