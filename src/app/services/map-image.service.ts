import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapImageService {
  private images: string[] = [];

  

  constructor(private http:HttpClient,private api:GlobalApiService) {
  }

  
  addUrlMapa(mapa:any){
    let params={
      url:mapa
    }
    return this.http.post(this.api.getApiURL() + "/addUrlMapa", params);
  }



  getUrlMapas(){
    return this.http.get(this.api.getApiURL() + "/getUrlMapas" );
  }



  


}
