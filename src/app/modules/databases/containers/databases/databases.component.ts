import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { Subject, tap } from 'rxjs';
import { TableCell } from 'src/app/modules/shared/components/items-table/items-table.component';
import {
  IPingServer,
  PING_DATA_TOKEN,
  PingComponent,
} from 'src/app/modules/shared/components/ping/ping.component';
import { Database, DatabasesService } from '../../services/databases.service';

@Component({
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss'],
})
export class DatabasesComponent implements OnInit {
  public databases = this._databasesService.databases$.pipe(
    tap((dbs) => {
      this.table = this.backupsTable(dbs);

      //? doesn't work without this timeout, i don't know why
      setTimeout(() => {
        this.loading = false;
      }, 1);

      setTimeout(() => {
        this._checkStatus();
      }, 2);
    })
  );

  public loading = true;
  public table: TableCell[][] = [];
  public pingSubjects$: Subject<IPingServer>[] = [];

  constructor(
    private _databasesService: DatabasesService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  public backupsTable(dbs: Database[]) {
    return dbs
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
      .reduce((acc: TableCell[][], db) => {
        const _subj$: Subject<IPingServer> = new Subject<IPingServer>();
        this.pingSubjects$.push(_subj$);
        const row: TableCell[] = [
          {
            value: this._titlecase(db.alias) || 'N/A',
          },
          {
            value: format(new Date(db.createdAt), 'dd/MM/yyyy '),
          },
          {
            badge: db.enabled ? 'available' : 'unavailable',
          },
          {
            component: {
              component: PingComponent,
              data: {
                pingType: 'MongoDB',
                pingServer$: _subj$,
              },
              token: PING_DATA_TOKEN,
            },
          },
          {
            html: this._sanitizer
              .bypassSecurityTrustHtml(`<td class="px-6 py-4">
            <div class="flex justify-around space-x-4">
            <button class="hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button class="hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            </div>
          </td>`),
          },
          {
            data: db.uri,
          },
        ];
        return [...acc, row];
      }, []);
  }

  private _checkStatus() {
    this.pingSubjects$.forEach((ping$, i) => {
      ping$.next({
        url: this.table[i][this.table[i].length - 1].data,
      });
    });
  }

  private _titlecase = (str: string) => {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  };
}
