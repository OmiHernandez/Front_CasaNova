import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarControlsService {
  private toggle = new Subject<any>();
  toggle$ = this.toggle.asObservable();

  constructor() { }

  toggleSidebar() {
    this.toggle.next(null);
  }
}
