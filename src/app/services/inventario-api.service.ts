import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InventarioApiService {

  constructor(private http:HttpClient,private api:GlobalApiService) { }



  addInventory(inv:any):Observable<any>{
    console.log(inv,"Add Inventario");
    return this.http.post(this.api.getApiURL() + "/addInventario",inv);
  }

  updateInventario(inv:any):Observable<any>{
    console.log(inv,"Add Inventario");
    return this.http.post(this.api.getApiURL() + "/updateInventario",inv);
  }
  borrarInv(id: any): Observable<any> {
    const idObject = { 'id': id };
    return this.http.post(this.api.getApiURL() + "/borrarInv", idObject);
  }

  getInventorys():Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getInventarios");
  }

  getInventariosDisponibles():Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getInventariosDisponibles");
  }

  getotalventas():Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getotalventas");
  }

  getConteoStatus():Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getConteoStatus");
  }

 

  getEtapasDesarrollo():Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getEtapasDesarrollo");
  }

  
  getInventarioById(id: string): Observable<any> {
    console.log("se usa " + id);
    return this.http.get(this.api.getApiURL() +"/getInventarioPorId/" +id);
  }

  addColindancia(col:any):Observable<any>{
    return this.http.post(this.api.getApiURL() + "/addColindancia",col);
  }

  asignarColindanciasArray(arr:any):Observable<any>{
    return this.http.put(this.api.getApiURL() + "/putColindancias",arr);
  }

  getColindanciasById(id:string):Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getColindanciasPorId/"+id);
  }

  getColindanciaById(id:string):Observable<any>{
    return this.http.get(this.api.getApiURL() + "/getColindanciaById/"+id);
  }

  asignarCoordenada(coord:any):Observable<any>{
    return this.http.put(this.api.getApiURL() + "/putIdInventario",coord);
  }


  putApartarInventario(est:any,id:string):Observable<any>{
    return this.http.put(this.api.getApiURL() + "/putCambiarEstado/"+id,est);
  }

  putCambiarVendido(vend:any):Observable<any>{
    return this.http.put(this.api.getApiURL() + "/putCambiarVendido/",vend);
  }

  putColindancia(col:any):Observable<any>{
    console.log(col,"Nuevo Cambio");
    return this.http.post(this.api.getApiURL() + "/postColindanciaById",col);
  }



  




}
