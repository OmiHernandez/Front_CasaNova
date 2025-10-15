import { Component } from '@angular/core';
import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts';
import { InventarioApiService } from 'src/app/services/inventario-api.service';


@Component({
  selector: 'app-etapaspordesarrollo',
  templateUrl: './etapaspordesarrollo.component.html',
  styleUrls: ['./etapaspordesarrollo.component.scss']
})
export class EtapaspordesarrolloComponent {

  single = [
    {
      "name": "disponible",
      "value": 50
    },
    {
      "name": "apartado",
      "value": 20
    },
    {
      "name": "contrato",
      "value": 10
    },
    {
      "name": "pendiente de entrega",
      "value": 3
    }
  ];

  view: [number, number]  = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Desarrollo';
  showYAxisLabel = true;
  yAxisLabel = 'Leads';


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#AAAAAA', '#5AA454','#3b5998',  '#A10A28', '#C7B42C','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454'],
  };

  constructor( private invApi:InventarioApiService) {
    this.invApi.getEtapasDesarrollo().subscribe((data:any[])=>{
      this.single = data;
      console.log(this.single,"LISTA canales");
   },error=>{
   });

    Object.assign(this.single)
  }

  onSelect(): void {
  }

  onActivate(): void {
  }

  onDeactivate(): void {
  }
}
