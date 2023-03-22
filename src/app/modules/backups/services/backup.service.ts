import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, tap } from 'rxjs';
import { ApiHttpService } from 'src/app/modules/api-http';
import { CronJob } from '../../crons/services/cron.service';
import { Database } from '../../databases/services/databases.service';
export enum EnumBackupStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Backup {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;

  cronJob: CronJob['expression'];
  databases: Database[];
  dateEnd: Date;
  data: Uint8Array | string;
  compression: string;
  backupStatus: EnumBackupStatus;
  //If there are references to IDs from other documents, use `Types.ObjectId`
}

@Injectable()
export class BackupService {
  public backups$: Subject<Backup[]> = new ReplaySubject<Backup[]>(1);

  private _backups: Backup[] = [];

  public get backups() {
    return this._backups;
  }

  constructor(private apiHttp: ApiHttpService) {
    this.getBackups().subscribe();
  }

  public getBackups<T = Backup[]>(id?: string) {
    return this.apiHttp.get<T>('api/backup/get/' + (id || '')).pipe(
      tap((r) => {
        if (id?.length) {
          return;
        }
        this._backups = r as unknown as Backup[];
        this.backups$.next(r as unknown as Backup[]);
      })
    );
  }
}
