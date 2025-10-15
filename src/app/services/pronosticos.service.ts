import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PronosticosService {

  constructor(private Api:GlobalApiService,private http:HttpClient) { }

  getPronostico():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getPronostico");
  }

  updatePronostico(tipo: any, valor: any): Observable<any> {
    const idObject = { 'tipo': tipo, 'valor': valor};
    return this.http.post(this.Api.getApiURL() + "/updatePronostico", idObject);
  }
}
