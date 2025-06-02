import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { HeaderControlsService } from '../../services/header-controls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Tipos de usuario
  // 0 - No se ha logueadod
  // 1 - Administrador
  // 2 - Tesorero
  // 3 - Tecnico
  // 4 - Vendedor
  leads:boolean = false
  estadisticas:boolean = false
  administrar:boolean = false
  inventarios:boolean = false

  userType:number=0;
  seleccion:string = "";
  cred:any;
  constructor(private loginService:LoginServiceService, 
    private headerControl:HeaderControlsService,
    private router:Router
  ){}


  ngOnInit(){
    this.cred = this.loginService.getCredentials();
    this.loginService.credenciales$.subscribe((credenciales:any) =>{
      this.userType = credenciales.type;
    })
    this.userType = this.cred.type;
    var tipo = localStorage.getItem('usertype')
    
    console.log(tipo, 'tipoheader')
    if (tipo=="Administración"){//
      this.leads = true
      this.estadisticas = true
      this.administrar = true
      this.inventarios = true
      console.log(tipo, 'administracion')
      return
    }
    if (tipo=="Tecnico"){
      this.inventarios = true
      return
    }
    if (tipo=="Ventas"){//
      this.leads = true
      return
    }
    if (tipo=="Vendedor lider"){
      this.leads = true
      return
    }
    if (tipo=="Construccion"){//
      this.leads = true
      return
    }
    
  }

  hacerSeleccion(seleccion:string){
   
    this.headerControl.setHeaderControl(seleccion);
  }

  logout(){
    this.loginService.clearCredentials();
    this.cred=0;
    this.router.navigate(['/login']);
    
  }

}
