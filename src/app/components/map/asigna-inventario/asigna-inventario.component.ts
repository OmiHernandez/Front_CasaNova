import { Component } from '@angular/core';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { ActivatedRoute } from '@angular/router';
import { CoordenadasService } from 'src/app/services/coordenadas.service';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-asigna-inventario',
  templateUrl: './asigna-inventario.component.html',
  styleUrls: ['./asigna-inventario.component.scss']
})
export class AsignaInventarioComponent {

  
  lote:any = {
    id:"",
    nombreLote:"",
    inventario:"",
    estado:"",
    // 
    desarrollo:"",
    manzana:"",
    lote:""

  }

  private dataSubject = new BehaviorSubject<any>(this.lote);
  public data$ = this.dataSubject.asObservable();

    inventarios:any[]=[];
    id:string="";


    constructor(
      private inventarioService:InventarioApiService,
      private coordenadaService:CoordenadasService,
      private activatedRoute:ActivatedRoute
    ){

      this.activatedRoute.params.subscribe(params => {
        this.id = params['id']; 

        var coord = {
           id: this.id
        }
        this.coordenadaService.getCoordenadaPorId(coord).subscribe((data:any)=>{
            this.lote.id=this.id
            this.lote.nombreLote=data.nombre_lote;
            this.lote.estado = data.estado_lote;
            this.lote.inventario=data.id_inventario;
            if(this.lote.inventario!==""){
              this.checarEstado(this.lote.inventario);
              
            }
        
        });
        
    });


        this.inventarioService.getInventorys().subscribe(data=>{
          this.inventarios=data;
        }
        );
    }


    seleccionarInventario(id:string){

      this.inventarioService.getInventarioById(id).subscribe((data:any)=>{
        const nuevoEstado = {
          id: this.lote.id,
          nuevoEstado: data.estado
        };
        console.log(nuevoEstado,"Homero simp");
        
        this.coordenadaService.putEstadoLote(nuevoEstado).subscribe((datos:any)=>{
          console.log("Se cambio el estado");
          this.lote.estado=data.estado;
        });
       
      });

      



      var coord={
        id:this.lote.id,
        nuevoId:id
      }
      console.log(coord,"La corde");
      this.inventarioService.asignarCoordenada(coord).subscribe(data=>{


        this.lote.inventario = id;
        // Aqui llenar los datos del inventario que se selecciono
        this.checarEstado(id);
        Swal.fire({
          title: "Hecho!",
          text: "El inventario ha sido asignado!",
          icon: "success"
        });

      });
    }

    checarEstado(id:string){
      this.inventarioService.getInventarioById(id).subscribe(
        data=>{
          this.lote.desarrollo = data.desarrollo;
          this.lote.manzana = data.manzana;
          this.lote.lote = data.lote;
          
          
        });
    
      

    }

    
}
