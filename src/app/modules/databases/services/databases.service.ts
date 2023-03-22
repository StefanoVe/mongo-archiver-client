import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, tap } from 'rxjs';
import { ApiHttpService } from '../../api-http';

export interface Database {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  alias: string;
  uri: string;
  enabled: boolean;
  //If there are references to IDs from other documents, use `Types.ObjectId`
}

@Injectable()
export class DatabasesService {
  public databases$: Subject<Database[]> = new ReplaySubject<Database[]>(1);

  private _databases: Database[] = [];

  public get databases() {
    return this._databases;
  }

  constructor(private apiHttp: ApiHttpService) {
    this.getDatabases().subscribe();
  }

  public getDatabases<T = Database[]>(id?: string) {
    return this.apiHttp.get<T>('api/db/get/' + (id || '')).pipe(
      tap((r) => {
        if (id?.length) {
          return;
        }
        this._databases = r as unknown as Database[];
        this.databases$.next(r as unknown as Database[]);
      })
    );
  }
}
