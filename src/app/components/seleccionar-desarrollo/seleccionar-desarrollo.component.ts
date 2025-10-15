import { Component } from '@angular/core';
import { GlobalApiService } from 'src/app/services/global-api.service';

@Component({
  selector: 'app-seleccionar-desarrollo',
  templateUrl: './seleccionar-desarrollo.component.html',
  styleUrls: ['./seleccionar-desarrollo.component.scss']
})
export class SeleccionarDesarrolloComponent {
  selectedUrl: string;
  constructor(private api:GlobalApiService) {

    
  }

  changeGlobalAPI(){
    console.log('URL seleccionada:', this.selectedUrl);
    this.api.changeApi(this.selectedUrl);
  }

 
    
}
