import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HeaderControlsService } from 'src/app/services/header-controls.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
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
    if (tipo=="Administración"){
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
    if (tipo=="Ventas"){
      this.leads = true
      return
    }
    if (tipo=="Vendedor lider"){
      this.leads = true
      return
    }
    if (tipo=="Construccion"){
      this.leads = true
      return
    }
    
  }

  hacerSeleccion(seleccion:string){
   
    this.headerControl.setHeaderControl(seleccion);

    switch (seleccion) {
      case 'Dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'Leads':
        this.router.navigate(['/dashboard/verLeads']);
        break;
      case 'Estadisticas':
        this.router.navigate(['/dashboard/Estadisticasglobales']);
        break;
      case 'Administrar':
        this.router.navigate(['/dashboard/listaUsuarios']);
        break;
      case 'Inventarios':
        this.router.navigate(['/dashboard/verInventario']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  logout(){
    this.loginService.clearCredentials();
    this.cred=0;
    this.router.navigate(['/login']);
    
  }

}
