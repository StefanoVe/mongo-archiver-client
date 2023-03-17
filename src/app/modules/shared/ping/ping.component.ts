import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss'],
})
export class PingComponent implements OnInit {
  @Input() iconClass = 'h-6 w-6';
  @Input() pingType: 'Express' | 'MongoDB' = 'Express';
  @Input() pingServer = new Observable<{
    url: string;
    apiKey?: string;
    mongodbUrl?: string;
  }>();

  public pingStatus: 'pending' | 'success' | 'error' = 'pending';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pingServer
      .pipe(
        switchMap((v) =>
          this.pingType === 'Express'
            ? this._pingExpress(v.url, v.apiKey)
            : this._pingMongoDB(v.mongodbUrl)
        ),
        tap(() => (this.pingStatus = 'success')),
        catchError(async () => this._catchError)
      )
      .subscribe();
  }

  private _pingExpress(url: string, apiKey?: string) {
    return this.httpClient.get(`${url}`, {
      headers: {
        'x-api-key': apiKey || '',
      },
    });
  }

  private _pingMongoDB(mongodbUrl?: string) {
    //connect to the route "/api/db/connection/test"
    //and return the response
    return this.httpClient.post(
      `${this.authService.apiKey}/api/db/connection/test`,
      {
        mongodbUrl: mongodbUrl || '',
      },
      {
        headers: this.authService.apiHeaders,
      }
    );
    return of();
  }

  private _catchError() {
    this.pingStatus = 'error';
  }
}
