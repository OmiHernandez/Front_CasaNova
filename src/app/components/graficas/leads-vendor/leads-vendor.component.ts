import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts'
import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads-vendor',
  templateUrl: './leads-vendor.component.html',
  styleUrls: ['./leads-vendor.component.scss']
})
export class LeadsVendorComponent {

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


  double = [
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
  
    view: [number, number] = [700, 400];
  
    // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Vendedor';
  showYAxisLabel = true;
  yAxisLabel = 'Leads';


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#AAAAAA', '#5AA454', '#3b5998', '#A10A28', '#C7B42C', '#5AA454', '#5AA454', '#5AA454', '#5AA454', '#5AA454', '#5AA454', '#5AA454', '#5AA454'],
  };

  constructor(private LeadApi: LeadApiService) {
    this.LeadApi.getVendorAcomulado().subscribe( (data: any[]) => {
      this.double = data;
      this.single= this.double

      console.log(this.single, "lista de leads por vendor");
    }, error => {
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
