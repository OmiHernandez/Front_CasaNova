import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderControlsService {

  private headerControlSubject: Subject<string> = new Subject<string>();
  headerControl$:Observable<any> =this.headerControlSubject.asObservable();

  constructor() { 
  
  }

  setHeaderControl(control:string){
    this.headerControlSubject.next(control);
  }




}
