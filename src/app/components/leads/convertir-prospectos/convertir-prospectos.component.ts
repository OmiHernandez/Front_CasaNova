import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-convertir-prospectos',
  templateUrl: './convertir-prospectos.component.html',
  styleUrls: ['./convertir-prospectos.component.scss']
})
export class ConvertirProspectosComponent {
  ListaLeads:any[]=[];
  
  constructor(private leadApiService:LeadApiService){
    this.leadApiService.getLeadsLeads().subscribe((data:any[])=>{
      this.ListaLeads = data;
      console.log(this.ListaLeads,"LISTA LEADSLEADS");
   },error=>{
    Swal.fire({
      icon: "warning",
      title: "Error",
      text: "Ha ocurrido una falla al conectarse con la base de datos",
    });
   });

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

}
