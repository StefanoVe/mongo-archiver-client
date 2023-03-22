import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public backups$: Observable<Backup[]> = this._backupsService.backups$;
  public databases$: Observable<Database[]> = this._databasesService.databases$;
  public crons$: Observable<CronJob[]> = this._cronService.cronjobs$;

  constructor(
    private _backupsService: BackupService,
    private _databasesService: DatabasesService,
    private _cronService: CronsService
  ) {}

  ngOnInit(): void {}
}
