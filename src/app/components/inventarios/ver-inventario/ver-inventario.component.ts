import { Component } from '@angular/core';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.component.html',
  styleUrls: ['./ver-inventario.component.scss']
})
export class VerInventarioComponent {

  arrInventarios:any[]=[];

  constructor(private inventarioApi:InventarioApiService,private router:Router){
    

  }

  ngOnInit(){
    this.inventarioApi.getInventorys().subscribe(data=>{
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
  }

  selectaInventario(id:string){
    //alert(id);
    this.router.navigate(['dashboard/infoInventario', id]);
  }



}
