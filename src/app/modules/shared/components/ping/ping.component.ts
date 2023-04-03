import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, merge, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export type IPingStatus = 'pending' | 'success' | 'error' | '';

export interface IPingServer {
  url?: string;
  apiKey?: string;
}

interface IContext {
  pingType?: 'Express' | 'MongoDB';
  pingServer$?: Subject<IPingServer>;
}

export const PING_DATA_TOKEN = new InjectionToken<any>('pingDataToken');
@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss'],
})
export class PingComponent implements OnInit, OnDestroy {
  @Input() iconClass = 'h-6 w-6';
  @Input() pingType: 'Express' | 'MongoDB';
  @Input() pingServer$: Subject<IPingServer>;

  @Output() pingResult = new EventEmitter<IPingStatus>();

  public ping$ = new Subject<IPingServer>();
  private _destroy$ = new Subject<void>();

  public pingStatus = new FormControl('');
  public latestPing: IPingServer | null = null;

  public get status() {
    return this.pingStatus.value;
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    @Inject(PING_DATA_TOKEN) public context: IContext
  ) {
    this.pingType = this.context.pingType || 'Express';
    this.pingServer$ = this.context.pingServer$ || new Subject<IPingServer>();
  }

  ngOnInit(): void {
    const _subj$ = [this.pingServer$, this.ping$];

    merge(..._subj$)
      .pipe(
        takeUntil(this._destroy$),
        tap(() => this.pingStatus.setValue('pending')),
        tap((v) => (this.latestPing = v)),
        switchMap((v) =>
          this.pingType === 'Express'
            ? this._pingExpress(v?.url || '', v.apiKey)
            : this._pingMongoDB(v.url)
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
        `${this.authService.serverUrl}api/db/connection/test`,
        {
          url: mongodbUrl || '',
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
