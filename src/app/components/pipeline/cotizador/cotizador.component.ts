import { Component } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.scss']
})
export class CotizadorComponent {

  idinteresfinal=''
  ListaLeads: any[] = [];
  leadSeleccionado: any;

  cred?: any;

  M2: number = 0;
  descuento: number = 0;
  precio_M2: number = 0;
  precioSinEnganche: number = 0;

  hayEnganche: string = "No";
  enganche: number = 0;
  precioConEnganche: number = 0;

  plazos: number = 0;

  arrMensualidades: any[] = [];
  arrAbonos: any[] = [];

  pagoEnganche: number = 0;
  restantePagoEnganche: number = 0;
  auxRestantePagoEnganche: number = 0;

  idCotizacion: string = "";

  // Intereses

  hayInteres:string = 'No';

  interes:number = 0;
  
  mesDesde:number = 0;
  mesHasta:number = 0;

  saldoConInteres


  constructor(
    private cotizacionesService: CotizacionesService,
    private loginService: LoginServiceService,
    private leadApiService: LeadApiService,
    private inventarioApi: InventarioApiService
  ) {

    // AQUI SE OBTIENE LA LISTA DE LEADS APARTADOS
    this.leadApiService.getLeadsApartados().subscribe((data: any[]) => {
      this.ListaLeads = data;
      console.log(this.ListaLeads, "LISTA apartados");

    }, error => {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Ha ocurrido una falla al conectarse con la base de datos",
      });
    });
    this.cred = this.loginService.getCredentials();
    console.log(this.cred, "CREDENCIALES");

  }


  /*obtenerIdInventarioDeLeadSeleccionado(id:string){
   
    this.inventarioApi.getInventarioById(id).subscribe(data=>{
      console.log(data._id,"Id inv");
    });
  }*/







  async getDatosCompletos() {
    console.log(this.leadSeleccionado,"Lead Seleccionado");
     //this.obtenerIdInventarioDeLeadSeleccionado(this.leadSeleccionado);

    for (let lead of this.ListaLeads) {
      // console.log(lead._id, "papuid")
      await this.inventarioApi.getInventarioById(lead.idinteres).subscribe(data => {

        // console.log(data, "interes");
        if (lead._id == this.leadSeleccionado) {
          this.idinteresfinal = data._id
          console.log(data,"buscandointeressssss")
          console.log(this.idinteresfinal,"buscandointeressssss")
          this.M2 = data.medidas;
          this.descuento = data.descuento
          console.log(this.M2, "M2")

          this.precio_M2 = data.precioVenta
          console.log(this.precio_M2, "PRECIOM2")
          this.calcularPrecioSinEnganche()
        }


        this.calcularPrecioSinEnganche()

      });
      console.log(lead)
      
    }
    console.log(this.ListaLeads, "LISTA con datos extra");
  }

  avanzarlead(): void {
    console.log(this.leadSeleccionado);
    


    this.leadApiService.anvanzarLead(this.leadSeleccionado).subscribe((data: any[]) => {
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
        title: "Corización capturada correctamente"
      });

      window.location.reload();
    }, error => {

    });
  }

  // avanzarlead(id :any) : void{
  //   this.leadApiService.anvanzarLead(id).subscribe((data:any[])=>{

  //  },error=>{

  //  });
  // }

  regresarLead(): void {
    //todo:verificar que si se haya seleccionado algo 

    console.log(this.leadSeleccionado, 'Leadseleccionado');

    //Borrar apartado del inventario

    this.leadApiService.popApartado(this.leadSeleccionado).subscribe((data: any[]) => {
    }, error => {
    });

    var est = {
      "estado":"Disponible"
   }

    this.leadApiService.regresarLead(this.leadSeleccionado).subscribe((data: any[]) => {

      this.inventarioApi.putApartarInventario(est,this.idinteresfinal).subscribe(data2=>{
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
      
    }, error => {

    });
  }


  calcularPrecioSinEnganche() {
    if (this.M2 > 0 && this.precio_M2 > 0) {
      this.precioSinEnganche = this.M2 * this.precio_M2 *(1-(this.descuento/100));
    }

  }

  checkEnganche(option: string) {
    this.limpiaTds();
    this.hayEnganche = option;
    if (this.hayEnganche === "Si") {
      this.activarEnganche();
    }
    else {
      this.desactivarEnganche();
    }
  }

  checkInteres(option:string){
    this.limpiaTds();
    this.hayInteres = option;
    if (this.hayInteres === "Si") {
      this.activarInteres();
    }
    else {
      this.desactivarInteres();
    }
  }

  desactivarEnganche() {
    var input = document.getElementById("inputEnganche") as HTMLInputElement;
    var tablaEnganche = document.getElementById("tablaEnganche") as HTMLElement;

    input.style.display = "none";
    tablaEnganche.style.display = "none";
  }

  activarEnganche() {
    var input = document.getElementById("inputEnganche") as HTMLInputElement;
    var tablaEnganche = document.getElementById("tablaEnganche") as HTMLDivElement;

    input.style.display = "block";
    tablaEnganche.style.display = "block";
  }

  desactivarInteres() {
    var input = document.getElementById("inputInteres") as HTMLInputElement;

    input.style.display = "none";
  }

  activarInteres() {
    var input = document.getElementById("inputInteres") as HTMLInputElement;

    input.style.display = "block";
  }

  calcularPrecioConEnganche() {
    this.precioConEnganche = (this.precioSinEnganche - this.enganche) ;
    this.auxRestantePagoEnganche = this.enganche;
    this.restantePagoEnganche = this.enganche;
  }


  asignarPlazos() {
    if (this.plazos > 0 && (this.precioConEnganche > 0 || this.precioSinEnganche > 0)) {
      if (this.precioConEnganche > 0) {
        console.log('1')
        this.generarMensualidades(this.plazos, new Date(), this.precioConEnganche);
      }
      else {
        this.generarMensualidades(this.plazos, new Date(), this.precioSinEnganche);
      }
      this.generarTablaMensualidades();

    }
    else if (this.plazos == 0) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error en la accion",
      //   text: "Eliga una cantidad valida",
      // });
    }
    else {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error en la accion",
      //   text: "Campos incompletos",
      // });
      this.plazos = 0;
    }
  }


  generarMensualidades(numeroMensualidades: number, fechaInicio: Date, precio: number) {
    var AuxPrecio = precio;
    this.arrMensualidades = [];
    const mensualidades: Date[] = [];
    let fechaActual: Date = new Date(fechaInicio);
   

    // console.log(precio + " " + this.plazos, "precio y plazo");

    // Aqui se debe checar si hay interes o si no
    
    if(this.hayInteres == "No"){
      for (let i = 1; i <= numeroMensualidades; i++) {
        
        mensualidades.push(new Date(fechaActual));
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        AuxPrecio = AuxPrecio - (precio / this.plazos);
        
        var mensualidad = {
          periodo: i,
          pago: (precio / this.plazos).toLocaleString(),
          fechaPago: fechaActual.toISOString().slice(0, 10),
          saldo: AuxPrecio,
  
  
        }
        this.arrMensualidades.push(mensualidad);
      }
    }
    else{
      var divMes=numeroMensualidades;
      for (let i = 1; i <= numeroMensualidades; i++) {
       


        mensualidades.push(new Date(fechaActual));
        fechaActual.setMonth(fechaActual.getMonth() + 1);
       
        if(this.seEncuentraEnMes(i,this.mesDesde,this.mesHasta)){
          var int = this.calcularInteres(AuxPrecio);
        }
        else{
          var int = 0;
        }
        
        AuxPrecio = AuxPrecio + int;
        var pagoMesAct = AuxPrecio / divMes;
        divMes = divMes - 1;
        AuxPrecio = AuxPrecio - pagoMesAct;
        
        var mensualida = {
          periodo: i,
          pago: pagoMesAct,
          fechaPago: fechaActual.toISOString().slice(0, 10),
          interes:int,
          saldoConInteres:AuxPrecio + int,
          saldo: AuxPrecio,
  
  
        }
        this.arrMensualidades.push(mensualida);
      }
      console.log(this.arrMensualidades,"ARR");
    }
    


  }

  calcularInteres(saldoAnterior:number){
    var prcInteres = this.interes/100;
    return (saldoAnterior * prcInteres);
  }

  seEncuentraEnMes(numero, inicio, fin) {
    return numero >= inicio && numero <= fin;
}




  generarTablaMensualidades() {
    var tbody = document.getElementById('trBody');
    const periodoTd = document.getElementById('c_periodo');
    const pagoTd = document.getElementById('c_pago');
    const fechaTd = document.getElementById('c_fecha');
    const interesTd = document.getElementById('c_interes');
    const capitalTd = document.getElementById('c_capital');
    const saldoTd = document.getElementById('c_saldo');




    this.limpiaTds();

    if (tbody) {




      for (var i = 0; i < this.plazos; i++) {
        // console.log(this.arrMensualidades[i]);
        var newRow = document.createElement('tr'); // Crear una nueva fila

        var newTd1 = document.createElement('td'); // Crear un nuevo elemento td
        newTd1.textContent = this.arrMensualidades[i].periodo; // Asignar un contenido al td
        newRow.appendChild(newTd1); // Agregar el nuevo td a la fila

        var newTd2 = document.createElement('td'); // Crear un nuevo elemento td
        newTd2.textContent = this.arrMensualidades[i].pago.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }); // Asignar un contenido al td
        newRow.appendChild(newTd2); // Agregar el nuevo td a la fila

        var newTd3 = document.createElement('td'); // Crear un nuevo elemento td
        newTd3.textContent = this.arrMensualidades[i].fechaPago; // Asignar un contenido al td
        newRow.appendChild(newTd3); 
        
        var newTd4 = document.createElement('td'); // Crear un nuevo elemento td
        newTd4.textContent = this.arrMensualidades[i].interes.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        
        if (this.arrMensualidades[i].interes ==0){
          newTd4.textContent =''
        }
        // Asignar un contenido al td
        newRow.appendChild(newTd4);// Agregar el nuevo td a la fila

        /*var newTd5 = document.createElement('td'); // Crear un nuevo elemento td
        newTd5.textContent = this.arrMensualidades[i].interesSaldo; // Asignar un contenido al td
        newRow.appendChild(newTd5);*/
        /*var newTd4 = document.createElement('td'); // Crear un nuevo elemento td
        newTd4.textContent = ''; // Asignar un contenido al td
        newRow.appendChild(newTd4); // Agregar el nuevo td a la fila

        var newTd5 = document.createElement('td'); // Crear un nuevo elemento td
        newTd5.textContent = ''; // Asignar un contenido al td
        newRow.appendChild(newTd5); // Agregar el nuevo td a la fila*/

        var newTd6 = document.createElement('td');
        newTd6.textContent = (this.arrMensualidades[i].saldo).toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        newRow.appendChild(newTd6);
        tbody.appendChild(newRow); // Agregar la nueva fila al tbody



      }
    }

  }





  limpiaTds() {
    var tbody = document.getElementById('trBody');
    if (tbody) {

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
  }



  cambiarPagoEnganche() {
    //Reasignar el pago de enganche cada vez
    this.restantePagoEnganche = this.auxRestantePagoEnganche
    this.restantePagoEnganche = this.restantePagoEnganche - this.pagoEnganche;

  }


  abonarEnganche() {
    var input_fecha = document.getElementById("fechaAbono") as HTMLInputElement;
    var fecha = input_fecha.value;

    var abono = {
      periodo: 0,
      pago: this.pagoEnganche,
      fecha_pago: fecha,
      saldo: this.restantePagoEnganche
    }
    this.arrAbonos.push(abono);

    console.log(abono, "abono");

    this.generarFila(abono);
  }


  generarFila(obj: any) {
    var table = document.getElementById("tabla") as HTMLTableElement;

    if (table) {
      table.getElementsByTagName('tbody')[0];
      var newRow = table.insertRow(table.rows.length);
      var cell1 = newRow.insertCell();
      var cell2 = newRow.insertCell();
      var cell3 = newRow.insertCell();
      var cell4 = newRow.insertCell();
      var cell6 = newRow.insertCell();
      cell1.innerHTML = "";
      cell2.innerHTML = obj.pago
      cell3.innerHTML = obj.fecha_pago;
      cell4.innerHTML = "";
      cell6.innerHTML = obj.saldo;

    }
    this.auxRestantePagoEnganche = this.auxRestantePagoEnganche - this.pagoEnganche;


  }

  
  

  cambiarEstadoInventarioVendido(){
  
    var est = {
      "estado":"Ocupado"
    }
    this.leadApiService.getLeadById(this.leadSeleccionado).subscribe((data:any)=>{
      var est = {
        "estado":"Ocupado"
     }
      this.inventarioApi.putApartarInventario(est,data.idinteres).subscribe(data2=>{
        console.log("Se cambio")
      });
    });
    // console.log("Infor");

  
  // this.inventarioApi.putApartarInventario(est,this.leadSeleccionado.idinteres).subscribe(data=>{
  //     console.log("Cambiado el sasasa");
  // });
  }



  capturaMensualidad() {

    if (this.plazos === 0) {
      
      return; // Detiene la ejecución del método si los plazos son 0
    }

    var Cotizacion = {
      "id_usuario":  this.leadSeleccionado,
      "m2": this.M2,
      "costo_m2": this.precio_M2,
      "precioSinEnganche": this.precioSinEnganche,
      "tieneEnganche": this.hayEnganche,
      "enganche": this.enganche,
      "plazos": this.plazos,
      "pagosEnganche": [],
      "mensualidades": []
    }

    this.cotizacionesService.addCotizacion(Cotizacion).subscribe((data: any) => {
      console.log(data._id, "Cotizacion añadida");
      this.idCotizacion = data._id;
      this.generaMensualidades();
      this.cambiarEstadoInventarioVendido();
      this.avanzarlead();
    });
    // console.log(Cotizacion,"Cotizacion");

  }


  generaMensualidades() {
    var mensualidadesFormateadas = this.formatearMensualidades();
    //var abonosFormateados = this.formatearMensualidades();
    this.generadorDeMensualidaes(mensualidadesFormateadas);
    //this.generadorDeMensualidaes(abonosFormateados);
  }


  generadorDeMensualidaes(mens: any[]) {
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
      title: "Capturando cotización"
    });

    mens.forEach(mes => {
      this.cotizacionesService.addMensualidad(mes).subscribe((data: any) => {
        console.log("Mensualidad registrada");
      });


    });
  }



  formatearMensualidades() {

    var arrMensualidadesFormateado: any = [];

    this.arrMensualidades.forEach(mes => {
      var mensualidad = {
        "id_cotizacion": this.idCotizacion,
        "es_enganche_o_mensualidad": "mensualidad",
        "periodo": mes.periodo,
        "pago": mes.pago,
        "fecha_pago": mes.fechaPago,
        "interes": 0,
        "capitalAmortizado": 0,
        "saldoFinalDePeriodo": mes.saldo
      }
      arrMensualidadesFormateado.push(mensualidad);


    })


    // console.log(this.arrMensualidades,"mENSUALIDADES");
    return arrMensualidadesFormateado;


  }


  validarInteres(){
    // alert(this.interes + " " + this.mesDesde +" "+ this.mesHasta);
    if(this.mesHasta > this.plazos || this.mesDesde > this.mesHasta || this.mesHasta==0 || this.mesDesde==0){
      // alert("Error en los datos");
    }
    else{
      this.limpiaTds();
      this.asignarPlazos();
    }
  }


  formatearAbonos() {
    var arrAbonosFormateados: any = [];


    this.arrAbonos.forEach(mes => {
      var mensualidad = {
        "id_cotizacion": this.idCotizacion,
        "es_enganche_o_mensualidad": "enganche",
        "periodo": mes.periodo,
        "pago": mes.pago,
        "fecha_pago": mes.fechaPago,
        "interes": 0,
        "capitalAmortizado": 0,
        "saldoFinalDePeriodo": mes.saldo
      }
      arrAbonosFormateados.push(mensualidad);


    })


    return arrAbonosFormateados;

  }






}



