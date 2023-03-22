import { Injectable } from '@angular/core';
import { parseExpression } from 'cron-parser';
import { ReplaySubject, Subject, tap } from 'rxjs';
import { ApiHttpService } from '../../api-http';
import { Database } from '../../databases/services/databases.service';

export interface CronJob {
  _id: string;
  __v: number;
  alias: string;
  createdAt: Date;
  updatedAt: Date;
  expression: string;
  databases: Database[];
  enabled: boolean;
  compression: string;
  //If there are references to IDs from other documents, use `Types.ObjectId`
}

@Injectable()
export class CronsService {
  public cronjobs$: Subject<CronJob[]> = new ReplaySubject<CronJob[]>(1);

  private _cronjobs: CronJob[] = [];

  constructor(private apiHttp: ApiHttpService) {
    this.getCronJobs().subscribe();
  }

  public get cronjobs() {
    return this._cronjobs;
  }

  public getCronJobs<T = CronJob[]>(id?: string) {
    return this.apiHttp.get('api/cron/get').pipe(
      tap((r) => {
        if (id?.length) {
          return;
        }
        this._cronjobs = r as unknown as CronJob[];
        this.cronjobs$.next(r as unknown as CronJob[]);
      })
    );
  }

  public cronJobToDate(cronJob: string) {
    //convert a cron expression to the nearest date of execution
    return parseExpression(cronJob).next().toDate();
  }
}
