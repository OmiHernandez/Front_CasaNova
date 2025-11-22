import { Component } from '@angular/core';

import { NgxChartsModule,  Color, ScaleType } from '@swimlane/ngx-charts'
import { PronosticosService } from 'src/app/services/pronosticos.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pronostico-ventas',
  templateUrl: './pronostico-ventas.component.html',
  styleUrls: ['./pronostico-ventas.component.scss']
})
export class PronosticoVentasComponent {
  pronosticoventas = 0
  actualizado = false;
  single = [
    {
      "name": "Ventas",
      "value": 0
    },
    {
      "name": "Pronostico",
      "value": 0
    }
  ];

  double = [
    {
      "name": "Real",
      "value": 0
    },
    {
      "name": "Pronostico",
      "value": 0
    }
  ];

  



  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Pronostico vs Real';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas';


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#AAAAAA', '#5AA454','#3b5998',  '#A10A28', '#C7B42C','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454','#5AA454'],
  };

  constructor( private PronosticosApi:PronosticosService, private invApi:InventarioApiService) {
    this.PronosticosApi.getPronostico().subscribe((data:any[])=>{
      
      console.log(data,"Pronosticos");

      let pronosticoIndex = data.findIndex(item => item.tipo === "Ventas");
      if (pronosticoIndex !== -1) {
          console.log(data[pronosticoIndex].valor)
          this.double[1].value = data[pronosticoIndex].valor
          this.pronosticoventas = data[pronosticoIndex].valor
      }

      this.invApi.getotalventas().subscribe((data2:number)=>{
        this.double[0].value = data2
        this.single = this.double
        console.log(data2,"CONTEO VENTAS");
        this.actualizado = true
     },error=>{
     });
   },error=>{
   });

  }

  onSelect() {

  }


  modificar(){

      
    this.PronosticosApi.updatePronostico('Ventas', this.pronosticoventas).subscribe((data:any)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Estado actualizado correctamente"
      });
      window.location.reload();

    });
  }
}
