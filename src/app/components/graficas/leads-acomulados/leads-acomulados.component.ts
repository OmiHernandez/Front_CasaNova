import { Component } from '@angular/core';
import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts';

import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads-acomulados',
  templateUrl: './leads-acomulados.component.html',
  styleUrls: ['./leads-acomulados.component.scss']
})
export class LeadsAcomuladosComponent {
  
  
  single = [
    {
      "name": "facebook",
      "value": 4
    },
    {
      "name": "x",
      "value": 6
    },
    {
      "name": "instagram",
      "value": 40
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
    domain: ['#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(  private LeadApi:LeadApiService) {

    this.LeadApi.getCategoryLeads().subscribe((data:any[])=>{
      this.single = data;
      console.log(this.single,"LISTA canales");
   },error=>{
    Swal.fire({
      icon: "warning",
      title: "Error en la accion",
      text: "Datos incorrectos",
    });
   });

  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
