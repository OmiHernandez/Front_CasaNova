import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {
  private apiUrl: string;

  constructor() {
    const savedApiUrl = localStorage.getItem('apiUrl'); // Revisa si hay una URL guardada en localStorage
    this.apiUrl = savedApiUrl ? savedApiUrl : 'http://192.168.100.14:5000/casNov'; // Usa la guardada o la default
    console.log(this.apiUrl, "URL inicializada");
  }

  getApiURL(): string {
    return this.apiUrl;
  }

  changeApi(newApi: string): void {
    console.log("Cambiando API a:", newApi);
    this.apiUrl = newApi;
    localStorage.setItem('apiUrl', newApi); // Guarda la nueva URL en localStorage
  }

  checkApi(): void {
    console.log("URL actual:", this.apiUrl);
  }

  
}
