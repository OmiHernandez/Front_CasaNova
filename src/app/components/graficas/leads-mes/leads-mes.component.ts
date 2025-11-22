import { Component } from '@angular/core';

import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts'


import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads-mes',
  templateUrl: './leads-mes.component.html',
  styleUrls: ['./leads-mes.component.scss']
})
export class LeadsMesComponent {
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
    this.LeadApi.getLeadsMes().subscribe((data:any[])=>{
      this.single = data;
      console.log(this.single,"LEADS MES");

      

   },error=>{
    Swal.fire({
      icon: "warning",
      title: "Error en la accion",
      text: "Datos incorrectos",
    });
   });
  }

  onSelect() {

  }
}
