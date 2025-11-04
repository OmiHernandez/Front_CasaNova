import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalApiService } from 'src/app/services/global-api.service';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor(private http: HttpClient, private api: GlobalApiService) {
  }

  getMapas(): Observable<any> {
    return this.http.get(this.api.getApiURL() + "/getMapas");
  }

  addMapa(mapa: any): Observable<any> {
    console.log(mapa, "Mapa");
    return this.http.post(this.api.getApiURL() + "/addMapa", mapa);
  }

  deleteMapa(id: string) {
    return this.http.delete(`http://localhost:5000/casNov/deleteMapa/${id}`,
      { responseType: 'text' }  // ← Esto soluciona el problema
    );
  }

  putCoordenadas(arr: any): Observable<any> {
    return this.http.put(this.api.getApiURL() + "/putCoordenadas", arr);
  }

  getMapaPorId(idMapa: String): Observable<any> {
    return this.http.get(this.api.getApiURL() + "/getMapaPorId/" + idMapa);
  }

  getimgmapas() {
    return this.http.get(this.api.getApiURL() + "/getImgMapas");
  }


  actualizarMapa(mapa: any): Observable<any> {
    return this.http.put(this.api.getApiURL() + "/actualizarMapa", mapa);
  }




}
