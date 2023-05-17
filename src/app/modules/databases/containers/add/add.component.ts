import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Database, DatabasesService } from '../../services/databases.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  public loading = false;

  constructor(
    private _databaseService: DatabasesService,
    private _router: Router
  ) {}

  public handleFormSubmitted(database: Partial<Database>): void {
    this.loading = true;
    this._databaseService.add(database).subscribe(() => {
      this._router.navigate(['/databases/browse']);
      this.loading = false;
    });
  }
}
