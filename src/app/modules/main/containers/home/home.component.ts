import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { Observable, tap } from 'rxjs';
import {
  Backup,
  BackupService,
} from 'src/app/modules/backups/services/backup.service';
import {
  CronJob,
  CronsService,
} from 'src/app/modules/crons/services/cron.service';
import {
  Database,
  DatabasesService,
} from 'src/app/modules/databases/services/databases.service';
import { ITableRow } from 'src/app/modules/shared/components/items-list-widget/items-list-widget.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public databases$: Observable<Database[]> = this._databasesService.databases$;
  public backups$: Observable<Backup[]> = this._backupsService.backups$.pipe(
    tap((b) => (this.backupsWidget = this._backupsTable(b)))
  );
  public crons$: Observable<CronJob[]> = this._cronService.cronjobs$.pipe(
    tap((c) => (this.cronJobsWidget = this._cronjobsTable(c)))
  );

  public cronJobsWidget: ITableRow[] = [];
  public backupsWidget: ITableRow[] = [];

  constructor(
    private _backupsService: BackupService,
    private _databasesService: DatabasesService,
    private _cronService: CronsService
  ) {}

  ngOnInit(): void {}

  public refresh(table: 'cronjobs' | 'backups') {
    switch (table) {
      case 'cronjobs':
        this._cronService.getCronJobs().subscribe();
        break;
      case 'backups':
        this._backupsService.backups$.next([]);
        this._backupsService.getBackups().subscribe();
        break;
    }
  }

  private _backupsTable(backups: Backup[]) {
    return backups
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
      .filter((b, index) => index < 30)
      .map((backup) => ({
        column1: backup.cronJob?.alias,
        column2: format(new Date(backup.createdAt), 'dd/MM HH:mm'),
        column3:
          (
            (new Date(backup.dateEnd).valueOf() -
              new Date(backup.createdAt).valueOf()) /
            1000
          ).toFixed(2) + ' s',
      }));
  }

  private _cronjobsTable(crons: CronJob[]): ITableRow[] {
    return crons
      .map((cron) => ({
        column1: cron.alias,
        column2: format(
          this._cronService.cronJobToDate(cron.expression),
          'dd/MM HH:mm'
        ),
        column3: cron.databases.length,
      }))
      .sort((a, b) => (a.column2 > b.column2 ? 1 : -1));
  }
}
