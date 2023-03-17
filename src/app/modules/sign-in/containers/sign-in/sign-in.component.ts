import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public pingSubject$ = new Subject<{
    url: string;
    apiKey: string;
  }>();

  constructor() {}

  ngOnInit(): void {}
}
