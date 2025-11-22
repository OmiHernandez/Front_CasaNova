import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes.service';
import { UserServiceService } from 'src/app/services/user-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  formGroup: FormGroup;
  detallesreporte:any;
  mostrarTabla:boolean=false
  ListaReportes:any[]=[];
  ListaNombres:String[]=[]
  Lista:any[]=[];
  ListaReportesfin:any[]=[];
  Listafin:any[]=[];
  

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

  constructor(
    private reportesService:ReportesService,
     private formBuilder: FormBuilder,
    private userService:UserServiceService) {
    this.reportesService.getReportes().subscribe((data:any[])=>{
      console.log("Data recibida:", data);
      this.ListaReportes = data;
      this.ListaReportes.forEach(e => {
        console.log(e.id_usuario,"Buscando a ID USUARIO");
        this.userService.getUsernameById(e.id_usuario).subscribe(uname=>{
          var obj = {
            _id:e._id,
            id:e.id_usuario,
            tipo:e.tipo,
            desc:e.descripcion,
            fecha:e.fecha,
            nombre:uname.username
          }
          this.Lista.push(obj);
        });
        
      });


        this.Lista.sort((a, b) => {
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        });

      console.log(this.Lista,"LISTAAA");
     
    });

    //reportes resueltos

    this.reportesService.getReportesfin().subscribe((data:any[])=>{
      this.ListaReportesfin = data;
      this.ListaReportesfin.forEach(e => {
        this.userService.getUsernameById(e.id_usuario).subscribe(uname=>{
          var obj = {
            _id:e._id,
            id:e.id_usuario,
            tipo:e.tipo,
            fecha:e.fecha,
            desc:e.descripcion,
            nombre:uname.username
          }
          this.Listafin.push(obj);
        });
        
      });

        this.Listafin.sort((a, b) => {
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        });

      console.log(this.Listafin,"LISTAAA");
     
    });



  }

  ngOnInit():void{
    this.formGroup = this.formBuilder.group({
      detallesreporte: ['', Validators.required], // o los validadores que desees
      otroDetalle: [''] // Si tienes otro campo
    });
  }

  reportepost(id:any):void{
    this.mostrarTabla=true
    console.log(id)
  }


  getName(id:string){
    this.userService.getUsernameById(id).subscribe((data:any)=>{

       return data.username;
    })
  }

  delete(id:string){
    console.log(id)
    this.reportesService.setEstado(id, false).subscribe((data:any)=>{
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
        title: "Reporte dado de baja correctamente"
      });
      window.location.reload();

    })
  }
  
}
