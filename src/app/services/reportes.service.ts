import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { GlobalApiService } from 'src/app/services/global-api.service';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient,private api:GlobalApiService) {
   }

   addReporte(rep:any):Observable<any>{
    return this.http.post(this.api.getApiURL() + "/addReporte",rep);
   }

   getReportes():Observable<any>{
      return this.http.get(this.api.getApiURL() + "/getReporte");
   }

   getReportesfin():Observable<any>{
      return this.http.get(this.api.getApiURL() + "/getReportesfin");
   }

   deleteReporte(rep:any):Observable<any>{
      return this.http.delete(this.api.getApiURL() + "/deleteReporte/"+rep);
   }

   

   getReportesCategoria():Observable<any>{
      return this.http.get(this.api.getApiURL() + "/getReportesCategoria");
   }

   setEstado(id:any, status:Boolean):Observable<any>{
      const idObject = { 'id': id, 'status': status};
      return this.http.post(this.api.getApiURL() + "/setEstado", idObject);
   }

   
   


}
