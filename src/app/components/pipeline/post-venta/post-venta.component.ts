import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-venta',
  templateUrl: './post-venta.component.html',
  styleUrls: ['./post-venta.component.scss']
})
export class PostVentaComponent {
  formGroup: FormGroup;
  detallesreporte:any;
  mostrarTabla:boolean=false
  ListaLeads:any[]=[];

  cred:any;

  idenviar:any;



  constructor(
    private leadApiService:LeadApiService, 
    private formBuilder: FormBuilder,
    private login:LoginServiceService,
    private reportes:ReportesService,
    private inventarioApi:InventarioApiService) {


    this.leadApiService.getLeadsEntregado().subscribe((data:any[])=>{
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

    this.cred = this.login.getCredentials();
    console.log(this.cred,"credenciales");



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
    this.formGroup = this.formBuilder.group({
      detallesreporte: ['', Validators.required], // o los validadores que desees
      otroDetalle: ['',Validators.required] // Si tienes otro campo
    });
  }

  reportepost(id:any):void{
    this.mostrarTabla=true
    this.idenviar=id;
    console.log(id)
  }

  ocultarme( event: Event):void{
    if ((event.target as HTMLElement).id === 'formreporte') {
    this.mostrarTabla=false
    }
  }

  validateForm() {
    if (this.formGroup.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, rellena todos los campos requeridos antes de enviar el reporte.'
      });
      return;
    }
    this.onSubmit();
  }
  

  onSubmit() {

    if (this.formGroup.invalid) {
      return;
    }
    
    this.mostrarTabla=false

    const formData = this.formGroup.value;
    // console.log("id usuario:",this.cred._id)

    let fecha: Date = new Date(); // Obtener la fecha y hora actual
    var fechaString = fecha.toISOString();

    var json={
      tipo:this.formGroup.get('detallesreporte').value,
      descripcion:this.formGroup.get('otroDetalle').value,
      fecha:fechaString,
      status:true,
      id_usuario:this.idenviar,
    }

    this.reportes.addReporte(json).subscribe(data=>{
      console.log(data,"Se dio de de alta");
    });
    
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
      title: "Reporte enviado correctamente"
    });

  }
  

}
