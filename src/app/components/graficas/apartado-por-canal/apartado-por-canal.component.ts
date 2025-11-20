import { Component } from '@angular/core';
import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts'

import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-apartado-por-canal',
  templateUrl: './apartado-por-canal.component.html',
  styleUrls: ['./apartado-por-canal.component.scss']
})
export class ApartadoPorCanalComponent {

  single = [
    {
      "name": "facebook",
      "value": 0
    },
    {
      "name": "x",
      "value": 0
    },
    {
      "name": "instagram",
      "value": 0
    }
  ];

  view: [number, number]  = [700, 400];



  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Canal';
  showYAxisLabel = true;
  yAxisLabel = 'Leads';


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#AAAAAA', '#5AA454','#3b5998',  '#A10A28', '#C7B42C','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454'],
  };

  constructor( private LeadApi:LeadApiService) {
    this.LeadApi.getApartadoPorCanal().subscribe((data:any[])=>{
      this.single = data;
   },error=>{
    Swal.fire({
      icon: "warning",
      title: "Error en la accion",
      text: "Datos incorrectos",
    });
   });

    Object.assign(this.single)

   
  }

  onSelect() {

  }
}
