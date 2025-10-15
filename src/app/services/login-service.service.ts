import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalApiService } from './global-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  private credencialesSubject: Subject<any> = new Subject<any>();
  credenciales$: Observable<any> = this.credencialesSubject.asObservable();

  constructor(private Api:GlobalApiService,private http:HttpClient) {
    // this.checkLocalStorage();
  }



login(user: any): Observable<any> {
  console.log('Enviando a:', this.Api.getApiURL() + "/authUser"); // Verifica la URL
  console.log('Datos enviados:', user); // Verifica el objeto user
  return this.http.post(this.Api.getApiURL() + "/authUser", user);
}

  saveCredentials(user:any):void{
    const credencialString = JSON.stringify(user);
    localStorage.setItem('credential', credencialString);
  }

  // LOGOUT
  clearCredentials(): void {
    localStorage.removeItem('credential');
  }


  getCredentials(): any | null {
    var json = localStorage.getItem('credential');
    if (json)
      return JSON.parse(json);
    else
      return null;
  }


  private checkLocalStorage(): void {
    const storedCredential = localStorage.getItem('credential');
    if (storedCredential) {

      const credential = JSON.parse(storedCredential);
      this.credencialesSubject.next(credential);
    }
  }
}


  // // LOGIN
  // async saveCredentials(_username: string, _password: string, _type: string): Promise<boolean> {
  //   var credential = {
  //     username: _username,
  //     password: _password,
  //     type: _type
  //   }

  //   const apiUrl = 'http://localhost:4000/casNov/authUser';

  //   const jsonData = {
  //     username: _username,
  //     password: _password
  //   };

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(jsonData),
  //     });

  //     if (!response.ok) {
  //       return false
  //       throw new Error(`Error al realizar la solicitud. Estado: ${response.status}`);

  //     }

  //     const responseData = await response.json();
  //     console.log('Datos obtenidos:', responseData);

  //     const accountId = responseData._id;

  //     // Guardar el ID de la cuenta en el localStorage
  //     localStorage.setItem('credential', accountId);

  //     return true
  //   } catch (error) {
  //     console.error('Error al realizar la solicitud:');
  //     return false
  //   }
  // }
