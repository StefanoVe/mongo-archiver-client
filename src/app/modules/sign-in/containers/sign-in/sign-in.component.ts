import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  public formSubmitted($event: { url: string; apiKey: string }) {
    this._authService.serverUrl = $event.url;
    this._authService.apiKey = $event.apiKey;

    window.location.reload();
  }
}
