import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadpdfService {

  constructor(private http: HttpClient, private globalApiService: GlobalApiService) { }
  
    uploadContrato(file: Blob, leadId: string, message: string, filename: string): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, 'contrato.pdf');
      formData.append('leadId', leadId);
      formData.append('message', message);
      formData.append('filename', filename);
      return this.http.post<any>(`${this.globalApiService.getApiURL()}/leads/upload-contrato`, formData);
    }
}
