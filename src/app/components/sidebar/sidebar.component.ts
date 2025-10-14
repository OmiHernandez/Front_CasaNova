import { Component } from '@angular/core';
import { Observable,Subject } from 'rxjs';import { HeaderControlsService } from 'src/app/services/header-controls.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  seleccion:string = "";

  leads:boolean = false
  estadisticas:boolean = false
  administrar:boolean = false
  inventarios:boolean = false

  esventas:boolean = false

  essuperventas:boolean = false

  esconstruccion:boolean = false

  estecnico:boolean = false

  constructor(private headerControl:HeaderControlsService){}

  ngOnInit(){
    this.headerControl.headerControl$.subscribe((selec:any)=>{
      
      this.seleccion = selec;
    });

    console.log("hola")

    var tipo = localStorage.getItem('usertype')
    
    if (tipo=="Administración"){
      this.estecnico=true
      this.esventas= true
      this.essuperventas = true
      this.esconstruccion =true

      return
    }
    if (tipo=="Tecnico"){
      this.estecnico=true
      
      return
    }
    if (tipo=="Ventas"){

      this.esventas= true
      
      return
    }
    if (tipo=="Vendedor lider"){
      this.essuperventas = true
      this.esventas= true
      this.esconstruccion =true
      return
    }
    if (tipo=="Construccion"){
      this.esconstruccion =true
      return
    }
  }

}
