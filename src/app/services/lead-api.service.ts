import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LeadApiService {
  

  constructor(private Api:GlobalApiService,private http:HttpClient) { }

  getLeads():Observable<any>{
    console.log(this.Api.getApiURL(),"LA URL");
    return this.http.get(this.Api.getApiURL() + "/getLeads");
  }

  getLeadsVendorMes():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsVendorMes");
  }

  getLeadById(id:string):Observable<any>{
    console.log(id);
    return this.http.get(this.Api.getApiURL() + "/getLead/"+id);
  }

  getVendors():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getVendors");
  }

  getCategoryLeads():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getCategoryLeads");
  }

  addLead(lead:any):Observable<any>{
    console.log(lead,"ADDLEAD");
    return this.http.post(this.Api.getApiURL() + "/addLead",lead);
  }

  getLeadsByVendor(id: any): Observable<any> {
    const idObject = { 'id': id };
    return this.http.post(this.Api.getApiURL() + "/getLeadsByVendor", idObject);
  }

  cambiarVendorLead(id: any, username: any, vid: any): Observable<any> {
    const idObject = { 'id': id, 'username': username , 'vid': vid };
    return this.http.post(this.Api.getApiURL() + "/cambiarVendorLead", idObject);
  }

  getUserById(id: any): Observable<any> {
    const idObject = { 'id': id };
    return this.http.post(this.Api.getApiURL() + "/getUserById", idObject);
  }
  

  getHitrateApartado():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getHitrateApartado");
  }
 

  anvanzarLead(id: any): Observable<any> {
    const idObject = { 'id': id };
    console.log(idObject);
    return this.http.post(this.Api.getApiURL() + "/anvanzarLead", idObject);
  }

  popApartado(id: any): Observable<any> {
    const idObject = { 'id': id };
    return this.http.post(this.Api.getApiURL() + "/popApartado", idObject);
  }


  setApartado(id: any, currentinteres:any, modelotarget:any): Observable<any> {
    const idObject = { 'id': id ,
      'currentinteres':currentinteres,
      'modelotarget':modelotarget
    };
    return this.http.post(this.Api.getApiURL() + "/setApartado", idObject);
  }

  regresarLead(id: any): Observable<any> {
    const idObject = { 'id': id };
    console.log(idObject);
    return this.http.post(this.Api.getApiURL() + "/regresarLead", idObject);
  }

  

  getApartadoPorprototipo():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getApartadoPorprototipo");
  }

  getApartadoPorCanal():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getApartadoPorCanal");
  }

  getVendorAcomulado():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getVendorAcomulado");
  }

  getLeadsProspectos():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsProspectos");
  }

  getLeadsLeads():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsLeads");
  }

  getLeadsNotarial():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsNotarial");
  }

  getLeadsListoNotarial():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsListoNotarial");
  }



  getLeadsContrato():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsContrato");
  }

  getLeadsEntregado():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsEntregado");
  }

  getLeadsFirmado():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsFirmado");
  }

  getLeadsCotizado():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsCotizado");
  }
  getLeadsApartados():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsApartados");
  }
  

  getLeadsMes():Observable<any>{
    return this.http.get(this.Api.getApiURL() + "/getLeadsMes");
  }



}
