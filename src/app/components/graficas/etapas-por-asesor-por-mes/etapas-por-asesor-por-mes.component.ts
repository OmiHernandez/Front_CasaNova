import { Component } from '@angular/core';

import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts'
import { LeadApiService } from 'src/app/services/lead-api.service';

@Component({
  selector: 'app-etapas-por-asesor-por-mes',
  templateUrl: './etapas-por-asesor-por-mes.component.html',
  styleUrls: ['./etapas-por-asesor-por-mes.component.scss']
})
export class EtapasPorAsesorPorMesComponent {
   single = [
    {
      "name": "Vendedor 1",
      "series": [
        {
          "name": "Enero",
          "value": 2
        },
        {
          "name": "Febrero",
          "value": 1
        }
      ]
    },
  
    {
      "name": "Vendedor 2",
      "series": [
        {
          "name": "Enero",
          "value": 1
        },
        {
          "name": "Febrero",
          "value": 4
        }
      ]
    },
  
  ];

  view: [number, number]  = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Vendedor';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Leads';
  legendTitle: string = 'Fechas';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#AAAAAA', '#5AA454','#3b5998',  '#A10A28', '#C7B42C','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454'],
  };

  constructor(private LeadApi:LeadApiService) {

    this.LeadApi.getLeadsVendorMes().subscribe((data:any[])=>{
      this.single = data;
      console.log(this.single,"LEADS por vendedor por MES");
      Object.assign(this.single)
      

   },error=>{
   });

    
    
  }

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
}
