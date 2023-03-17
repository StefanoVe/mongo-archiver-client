import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  @Output() pingServer = new EventEmitter<{
    url: string;
    apiKey: string;
  }>();

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

          this.pingServer.emit(v);
        })
      )
      .subscribe();
  }
}
