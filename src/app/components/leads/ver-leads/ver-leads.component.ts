import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-leads',
  templateUrl: './ver-leads.component.html',
  styleUrls: ['./ver-leads.component.scss']
})
export class VerLeadsComponent {
  ListaLeads: any[] = [];
  ListaVendors: any[] = [];

  constructor(private leadApiService: LeadApiService) {
    this.leadApiService.getLeads().subscribe((data: any[]) => {

      data.sort((a, b) => {
        return new Date(a.currentDate).getTime() - new Date(b.currentDate).getTime();

      });

      this.ListaLeads = data;
      // alert("Exito");
      console.log(this.ListaLeads, "LISTA LEADS");
    }, error => {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Ha ocurrido una falla al conectarse con la base de datos",
      });
    });


    this.leadApiService.getVendors().subscribe((data: any[]) => {
      this.ListaVendors = data;

    }, error => {

    });

  }

  ngOnInit(): void {


  }

  fechatexto(fechaISO: string): String {

    // Crear un objeto de fecha a partir de la cadena ISO
    const fecha: Date = new Date(fechaISO);

    // Obtener los componentes de la fecha
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const año: number = fecha.getFullYear();

    // Asegurarse de que los componentes tengan dos dígitos
    const diaStr: string = dia < 10 ? '0' + dia : dia.toString();
    const mesStr: string = mes < 10 ? '0' + mes : mes.toString();

    // Crear la cadena de fecha en el formato "dd/mm/yyyy"
    const fechaFormateada: string = `${diaStr}/${mesStr}/${año}`;

    return fechaFormateada;
  }

  mostrarTabla: boolean = false;
  cambiotarget:any = null;

  editar(id: any): void {
    console.log(id)
    this.cambiotarget=id
    this.mostrarTabla= true;
  }


  ocultarme(): void {
    this.mostrarTabla= false;
  }
  
  reasignar(id: any, username:any): void {

    
    this.leadApiService.cambiarVendorLead(this.cambiotarget, username, id).subscribe(data=>{
      Swal.fire({
        title: "Accion realizada exitosamente",
        text: "Se ha asignado correctamente",
        icon: "success"
      });
   },error=>{
    Swal.fire({
      icon: "error",
      title: "Error en la accion",
      text: "No se ha asignado correctamente",
    });
   });

    console.log(id)
    console.log(this.cambiotarget)
    this.cambiotarget=null;
  }

  ordenar(caso: string): void {
    console.log("aaaaaa")
    switch (caso) {
      case 'origen':
        this.ListaLeads.sort((a, b) => {
          if (a.leadOrigin < b.leadOrigin) {
            return -1;
          }
          if (a.leadOrigin > b.leadOrigin) {
            return 1;
          }
          return 0;
        });
        break;
      case 'modelo':
        this.ListaLeads.sort((a, b) => {
          if (a.leadModel < b.leadModel) {
            return -1;
          }
          if (a.leadModel > b.leadModel) {
            return 1;
          }
          return 0;
        });
        break;
      case 'vendedor':
        this.ListaLeads.sort((a, b) => {
          if (a.nameVendor < b.nameVendor) {
            return -1;
          }
          if (a.nameVendor > b.nameVendor) {
            return 1;
          }
          return 0;
        });

        break;

      case 'fecha':
        this.ListaLeads.sort((a, b) => {
          return new Date(a.currentDate).getTime() - new Date(b.currentDate).getTime();

        });
        break;
      default:
        console.log('Opción no válida');
    }



  }


}
