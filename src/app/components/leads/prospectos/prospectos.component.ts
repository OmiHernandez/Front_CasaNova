import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.scss']
})
export class ProspectosComponent {
  ListaLeads:any[]=[];
  arrInventarios:any[]=[];
  currentinteres:any = null;
  modelotarget:any = null;
  constructor(private leadApiService:LeadApiService,private inventarioApi:InventarioApiService){

    this.inventarioApi.getInventariosDisponibles().subscribe(data=>{
      this.arrInventarios = data;
      console.log(this.arrInventarios,"INV");

      this.arrInventarios.sort((a, b) => {
        if (a.lote < b.lote) {
          return -1;
        }
        if (a.lote > b.lote) {
          return 1;
        }
        return 0;
      });
      this.arrInventarios.sort((a, b) => {
        if (a.manzana < b.manzana) {
          return -1;
        }
        if (a.manzana > b.manzana) {
          return 1;
        }
        return 0;
      });
      this.arrInventarios.sort((a, b) => {
        if (a.desarrollo > b.desarrollo) {
          return -1;
        }
        if (a.desarrollo < b.desarrollo) {
          return 1;
        }
        return 0;
      });
    
  });

  
    this.leadApiService.getLeadsProspectos().subscribe((data:any[])=>{
      this.ListaLeads = data;
      console.log(this.ListaLeads,"LISTA LEADS");
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


  apartar(id :any) : void{
    if (this.currentinteres === null) {
      Swal.fire({
        icon: 'error',
        title: 'Lote no seleccionado',
        text: 'Por favor, selecciona un lote antes de continuar',
      });
      return;
    }

    if (this.currentinteres != null && this.modelotarget != null)

      this.leadApiService.setApartado(id, this.currentinteres, this.modelotarget).subscribe((data:any[])=>{
        var est = {
          "estado":"Apartado"
       }
       console.log("antes Cambio");

       
        this.inventarioApi.putApartarInventario(est,this.currentinteres).subscribe(data=>{
          console.log("Cambio");
          this.avanzarlead(id);
        });
       
     
    },error=>{

    });

  }



  avanzarlead(id :any) : void{
    this.leadApiService.anvanzarLead(id).subscribe((data:any[])=>{
      Swal.fire({
        title: "La accion se ha realizado con exito",
        text: "Se ha cambiado el apartado correctamente",
        icon: "success"
      });
      window.location.reload();
   },error=>{

   });
  }

  regresarLead(id :any) : void{

    this.leadApiService.regresarLead(id).subscribe((data:any[])=>{
      Swal.fire({
        title: "La accion se ha realizado con exito",
        text: "Se ha desecho la accion correctamente",
        icon: "success"
      });
      window.location.reload();
   },error=>{

   });
  }

  
  selectaInventario(id:string, modelo:string){
    this.currentinteres=id;
    this.modelotarget=modelo;
    const elemento = document.getElementById(id);
    const celdas = elemento.getElementsByTagName('td');

    const celdasblank = document.getElementsByTagName('td');

    for (let i = 0; i < celdasblank.length; i++) {
      celdasblank[i].style.background = 'none';
    }
    
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].style.background = 'gray';
    }

  }














}
