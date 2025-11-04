import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {



  constructor(private http: HttpClient, private api: GlobalApiService) { }


  addCoordenada(coord: any) {
    console.log(coord, 'Coorde');
    return this.http.post(this.api.getApiURL() + "/addCoordenada", coord);
  }

  deleteCoordenada(coord: any) {
    return this.http.delete(this.api.getApiURL() + "/deleteCoordenada", coord);
  }

  getCoordenadasPorIdMapa(idMapa: String) {
    return this.http.get(this.api.getApiURL() + "/getCoordenadas/" + idMapa);
  }

  getCoordenadaPorId(idCoord: any) {
    console.log(idCoord, "IDCOORD");
    return this.http.post(this.api.getApiURL() + "/postCoordenadaPorId", idCoord);
  }

  putNombreLote(nombreLote: any) {
    return this.http.put(this.api.getApiURL() + "/putNombreLote", nombreLote);
  }

  putIdInventario(idInventario: any) {
    return this.http.put(this.api.getApiURL() + "/putIdInventario", idInventario);
  }

  putEstadoLote(estadoLote: any) {
    return this.http.put(this.api.getApiURL() + "/putEstadoLote", estadoLote);
  }

  // En tu CoordenadasService, agrega estos métodos:

  actualizarCoordenada(id: string, coordenada: any): Observable<any> {
    return this.http.put(this.api.getApiURL() + "/actualizarCoordenada/" + id, coordenada);
  }

  eliminarCoordenada(id: string): Observable<any> {
    return this.http.delete(this.api.getApiURL() + "/eliminarCoordenada/" + id);
  }

}
