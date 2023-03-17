import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export type IPingStatus = 'pending' | 'success' | 'error' | '';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss'],
})
export class PingComponent implements OnInit, OnDestroy {
  @Input() iconClass = 'h-6 w-6';
  @Input() pingType: 'Express' | 'MongoDB' = 'Express';
  @Input() pingServer = new Observable<{
    url: string;
    apiKey?: string;
    mongodbUrl?: string;
  }>();

  @Output() pingResult = new EventEmitter<IPingStatus>();

  public pingStatus = new FormControl('');
  private _destroy$ = new Subject<void>();

  public get status() {
    return this.pingStatus.value;
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pingServer
      .pipe(
        takeUntil(this._destroy$),
        tap(() => this.pingStatus.setValue('pending')),
        switchMap((v) =>
          this.pingType === 'Express'
            ? this._pingExpress(v.url, v.apiKey)
            : this._pingMongoDB(v.mongodbUrl)
        ),

        catchError(async () => this._catchError())
      )
      .subscribe();

    this.pingStatus.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((v) => this.pingResult.emit(v));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _pingExpress(url: string, apiKey?: string) {
    return this.httpClient
      .get(url, {
        headers: {
          'x-api-key': apiKey || '',
        },
      })
      .pipe(
        tap(() => this._onSuccess()),
        catchError(async () => this._catchError())
      );
  }

  private _pingMongoDB(mongodbUrl?: string) {
    //connect to the route "/api/db/connection/test"
    //and return the response
    return this.httpClient
      .post(
        `${this.authService.apiKey}/api/db/connection/test`,
        {
          mongodbUrl: mongodbUrl || '',
        },
        this.authService.apiHeaders
      )
      .pipe(
        tap(() => this._onSuccess()),
        catchError(async () => this._catchError())
      );
  }

  private _onSuccess() {
    this.pingStatus.setValue('success');
  }

  private _catchError() {
    this.pingStatus.setValue('error');
  }
}
