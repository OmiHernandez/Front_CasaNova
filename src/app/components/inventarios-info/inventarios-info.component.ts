import { Component } from '@angular/core';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inventarios-info',
  templateUrl: './inventarios-info.component.html',
  styleUrls: ['./inventarios-info.component.scss']
})
export class InventariosInfoComponent {

  // NG MODELS
  manzana:string="";
  lote:string="";
  metros:string="";
  prototipo="";
  medidas:string="";
  precioVenta:string="";
  descuento:string="";
  desarrollo:string="";
  inventario:any;
  id:any;




  obtenerMedidasComoEntero(): number {
    return parseInt(this.medidas, 10);
  }

  colindancias:any[]=[];
  constructor(private inventarioApiService:InventarioApiService,
    private route: ActivatedRoute,
    private router: Router
  ){

    this.route.params.subscribe(params => {
      var id =params['id'];
      this.id=id
    
        this.inventarioApiService.getInventarioById(id).subscribe((data:any)=>{
        this.inventario=data;
        this.desarrollo=data.desarrollo;
        this.manzana=data.manzana;
        this.lote=data.lote;
        this.metros=data.metros;
        this.prototipo=data.prototipo;
        this.medidas=data.medidas;
        this.precioVenta=data.precioVenta;
        this.descuento=data.descuento;
        
        this.inventarioApiService.getColindanciasById(data._id).subscribe((data2:any)=>{

          this.colindancias= data2;
          console.log(this.colindancias,"COLIN");
        });

      });
    });
   
    

      
  }
  


  modificar(){

    /*this.inventario=data;
      console.log(this.inventario);
      this.manzana=data.manzana;
      this.lote=data.lote;
      this.metros=data.metros;
      this.prototipo=data.prototipo;
      this.medidas=data.medidas;
      this.precioVenta=data.precioVenta;*/

      var inventario = {
        id: this.id,
        desarrollo: this.desarrollo,
        manzana: this.manzana,
        lote: this.lote,
        metros: this.metros,
        prototipo: this.prototipo,
        medidas: this.medidas,
        precioVenta: this.precioVenta,
        descuento: this.descuento,
      };
      
    this.inventarioApiService.updateInventario(inventario).subscribe((data:any)=>{
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





  eliminarinv(){


    this.inventarioApiService.borrarInv(this.id).subscribe((data:any)=>{
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
        title: "Eliminado correctamente"
      });
      //Redirigir
      this.router.navigateByUrl('/dashboard/verInventario');

    });
  }



  onEnter(value:string,campoCambiar:string,id:string){
    var colindanciaCambio = {
      _id:"",
      id_inventario:"",
      manzanac:"",
      lotec:"",
      metros:"",
      direccion:""
    }

    
    

    switch(campoCambiar){
      case "Manzana":{
        this.inventarioApiService.getColindanciaById(id).subscribe(
          (data:any)=>{
            colindanciaCambio._id=data._id;
            colindanciaCambio.id_inventario = data.id_inventario;
            colindanciaCambio.manzanac = value;
            colindanciaCambio.lotec = data.lotec;
            colindanciaCambio.metros = data.metros;
            colindanciaCambio.direccion = data.direccion;
            this.putColindancia(colindanciaCambio);
          }
       
        );
        
       
        break;
      }
      case "Lote":{

        this.inventarioApiService.getColindanciaById(id).subscribe(
          (data:any)=>{
            colindanciaCambio._id=data._id;
            colindanciaCambio.id_inventario = data.id_inventario;
            colindanciaCambio.manzanac = data.manzanac;
            colindanciaCambio.lotec = value;
            colindanciaCambio.metros = data.metros;
            colindanciaCambio.direccion = data.direccion;
            
            this.putColindancia(colindanciaCambio);
          }
        );
       
      
        break;
      }
      case "Metro":{

        this.inventarioApiService.getColindanciaById(id).subscribe(
          (data:any)=>{
            colindanciaCambio._id=data._id;
            colindanciaCambio.id_inventario = data.id_inventario;
            colindanciaCambio.manzanac = data.manzanac;
            colindanciaCambio.lotec = data.lotec;
            colindanciaCambio.metros = value;
            colindanciaCambio.direccion = data.direccion;
            this.putColindancia(colindanciaCambio);
          }
        );

       
        break;
      }
    }
   
  }

  putColindancia(colindancia:any){
    
    this.inventarioApiService.putColindancia(colindancia).subscribe((data:any)=>{
      window.location.reload();
    });
  }

  

  onSelectChange(event: Event,id:string) {
    console.log(id,"EL ID");
    

    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Valor seleccionado:', selectedValue);
    var colindanciaCambio = {
      _id:"",
      id_inventario:"",
      manzanac:"",
      lotec:"",
      metros:"",
      direccion:""
    }

    this.inventarioApiService.getColindanciaById(id).subscribe(
      (data:any)=>{
        colindanciaCambio._id=data._id;
        colindanciaCambio.id_inventario = data.id_inventario;
        colindanciaCambio.manzanac = data.manzanac;
        colindanciaCambio.lotec = data.lotec;
        colindanciaCambio.metros = data.metros;
        colindanciaCambio.direccion = selectedValue;
        this.putColindancia(colindanciaCambio);
      }
   
    );
    
    
    // Aquí puedes realizar cualquier otra acción que necesites.
  }

  
  cambiarAManzanaYLote(id:string){
  
    this.inventarioApiService.getColindanciaById(id).subscribe(data=>{
      var colindancia=data;
      colindancia.nombreCalle= "NoCalle";
      colindancia.lotec = "Defina un lote y presione enter";
      colindancia.manzanac = "Defina una manzana y presione enter";
      
      this.inventarioApiService.putColindancia(colindancia).subscribe(data2=>{
        console.log(data2,'NOCALLE');
        window.location.reload();
      });
    
    });
  }

  



  cambiarColindaConCalle(element: HTMLInputElement,element2: HTMLInputElement){
    
   
    var colindanciaCambio = {
      _id:"",
      id_inventario:"",
      manzanac:"",
      lotec:"",
      metros:"",
      direccion:"",
      nombreCalle:""
    }

    this.inventarioApiService.getColindanciaById(element.id).subscribe(
        (data:any)=>{
          colindanciaCambio._id=data._id;
          colindanciaCambio.id_inventario = data.id_inventario;
          colindanciaCambio.manzanac = "Colinda con calle";
          colindanciaCambio.lotec = "Asigne un nombre y presione enter";
          colindanciaCambio.metros = data.metros;
          colindanciaCambio.direccion = data.direccion;
          colindanciaCambio.nombreCalle = "Sin definir";
          this.putColindancia(colindanciaCambio);
        }
     
    );
    
    
      
    
    
  }



  obtenerColindancia(id:string):any{
    this.inventarioApiService.getColindanciaById(id).subscribe(data=>{
      return data;
    });

  }



  

}

