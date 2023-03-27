import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'date-fns';
import { TableCell } from 'src/app/modules/shared/components/items-table/items-table.component';
import { Backup, BackupService, EnumBackupStatus } from '../../backup.service';

@Component({
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.scss'],
})
export class BackupsComponent implements OnInit {
  backups$ = this._backupsService.backups$;

  constructor(
    private _backupsService: BackupService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  public backupsTable(backups: Backup[]) {
    return backups
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
      .reduce((acc: TableCell[][], backup) => {
        const row: TableCell[] = [
          {
            value: backup.cronJob?.alias || 'N/A',
          },
          {
            value: format(new Date(backup.dateEnd), 'dd/MM/yyyy '),
          },
          {
            badge: this._statusToBadge(backup.backupStatus),
          },
          {
            value: backup.size ? backup.size + ' MB' : 'N/A',
          },
          {
            value: this._backupsService.ttc(backup),
          },
          {
            value: backup.databases.length.toString(),
          },
          {
            html: this._sanitizer
              .bypassSecurityTrustHtml(`<td class="px-6 py-4">
            <div class="flex justify-around space-x-4">
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
              <a>
              <a class="hover:text-purple-500" href="${this._backupsService.downloadUrl(
                backup
              )}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z" clip-rule="evenodd" />
                  <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                </svg>
            </a>
              </a>
            </div>
          </td>`),
          },
        ];
        return [...acc, row];
      }, []);
  }

  private _statusToBadge(status: EnumBackupStatus): TableCell['badge'] {
    switch (status) {
      case EnumBackupStatus.SUCCESS:
        return 'available';
      case EnumBackupStatus.PENDING:
        return 'pending';
      case EnumBackupStatus.ERROR:
        return 'unavailable';
      default:
        return 'pending';
    }
  }
}
