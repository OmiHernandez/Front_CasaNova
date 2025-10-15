import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-notarialfirmada',
  templateUrl: './notarialfirmada.component.html',
  styleUrls: ['./notarialfirmada.component.scss']
})
export class NotarialfirmadaComponent {
  ListaLeads:any[]=[];
  constructor(private leadApiService:LeadApiService, private inventarioApi:InventarioApiService) {
    this.leadApiService.getLeadsNotarial().subscribe((data:any[])=>{
      this.ListaLeads = data;
      this.getDatosCompletos()
      console.log(this.ListaLeads,"LISTA LEADS");
   },error=>{
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Ha ocurrido una falla al conectarse con la base de datos",
    });
   });

  }

  async getDatosCompletos() {

    for (let lead of this.ListaLeads) {
      console.log(lead.idinteres)
      if (lead.idinteres!=undefined){
        await this.inventarioApi.getInventarioById(lead.idinteres).subscribe(data=>{
        
          console.log(data,"interes");
          lead.desarrollo = data.desarrollo;
          lead.manzana = data.manzana;
          lead.lote = data.lote;
          lead.medidas = data.medidas;
          lead.preciovente = data.precioVenta;
          lead.descuento = data.descuento;
  
      });
      }
      
    console.log(lead)
    }
    console.log(this.ListaLeads, "LISTA con datos extra");
  }

  ngOnInit():void{

  }

  avanzarlead(id :any) : void{
    this.leadApiService.anvanzarLead(id).subscribe((data:any[])=>{
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
   },error=>{

   });
  }

  regresarLead(id :any) : void{
    this.leadApiService.regresarLead(id).subscribe((data:any[])=>{
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
   },error=>{

   });
  }
  
}
