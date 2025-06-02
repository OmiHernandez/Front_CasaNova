import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { GlobalApiService } from './global-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private globalApiService:GlobalApiService, private http:HttpClient) { }

  async registerUser(_username: string, _password: string,_type:string): Promise<boolean> {
    var credential = {
      username:_username,
      password:_password,
      userType:_type
    }
    
    const apiUrl = this.globalApiService.getApiURL() + '/addUser';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
        });

        if (!response.ok) {
            return false
            
          }

        const responseData = await response.json();
        console.log('usuario registrado:', responseData);
        return true
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        return false
    }
  }


  getUsers():Observable<any>{
    return this.http.get(this.globalApiService.getApiURL() + "/getUsers");
  }

  deleteUser(id:string):Observable<any>{
     return this.http.delete(this.globalApiService.getApiURL() + "/deleteUser/"+id);
  }

  getUsernameById(id:string):Observable<any>{
    return this.http.get(this.globalApiService.getApiURL() + "/getUsernameById/"+id);
  }


}
