import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterLeadComponent } from './components/forms/register-lead/register-lead.component';
import { VerLeadsComponent } from './components/leads/ver-leads/ver-leads.component';
import { MisLeadsComponent } from './components/leads/mis-leads/mis-leads.component';
import { GenerarcontratoComponent } from './components/leads/generarcontrato/generarcontrato.component';
import { ConvertirProspectosComponent } from './components/leads/convertir-prospectos/convertir-prospectos.component';
import { ContratoComponent } from './components/leads/contrato/contrato.component';
import { ProspectosComponent } from './components/leads/prospectos/prospectos.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { PerfilUsuarioComponent } from './components/usuarios/perfil-usuario/perfil-usuario.component';
import { InventarioFormComponent } from './components/forms/inventario-form/inventario-form.component';
import { ApartadosComponent } from './components/pipeline/apartados/apartados.component';
import { FirmasComponent } from './components/pipeline/firmas/firmas.component';
import { PostVentaComponent } from './components/pipeline/post-venta/post-venta.component';
import { VerInventarioComponent } from './components/inventarios/ver-inventario/ver-inventario.component';
import { ContratosComponent } from './components/pipeline/contratos/contratos.component';
import { InventariosInfoComponent } from './components/inventarios-info/inventarios-info.component';
import { ContratoFirmadoComponent } from './components/leads/contrato-firmado/contrato-firmado.component';
import { FirmadoEntregadaComponent } from './components/leads/firmado-entregada/firmado-entregada.component';
import { MenuMapasComponent } from './components/map/menu-mapas/menu-mapas.component';
import { MapaComponent } from './components/map/mapa/mapa.component';
import { AsignaInventarioComponent } from './components/map/asigna-inventario/asigna-inventario.component';
import { FirmadoNotarialComponent } from './components/leads/firmado-notarial/firmado-notarial.component';
import { NotarialfirmadaComponent } from './components/leads/notarialfirmada/notarialfirmada.component';
import { ReportesComponent } from './components/pipeline/reportes/reportes.component';
import { EstadisticasglobalesComponent } from './components/graficas/estadisticasglobales/estadisticasglobales.component';
import { SeleccionarDesarrolloComponent } from './components/seleccionar-desarrollo/seleccionar-desarrollo.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginFormComponent},
  {path:'dashboard',component:DashboardComponent,children: [
    { path: '', component: DashboardHomeComponent },
    { path: 'registerLead', component: RegisterLeadComponent },
    { path: 'verLeads',component:VerLeadsComponent},
    { path: 'misLeads',component:MisLeadsComponent},
    { path: 'registerForm',component:RegisterFormComponent},
    { path: 'listaUsuarios',component:ListaUsuariosComponent},
    { path: 'perfilUsuario',component:PerfilUsuarioComponent},
    { path: 'prospectos',component:ProspectosComponent},
    { path: 'contratatofirmado',component:ContratoFirmadoComponent},
    { path: 'firmadoentregado', component:FirmadoEntregadaComponent},
    { path: 'notarial', component:FirmadoNotarialComponent},
    { path: 'notarialfirmada', component:NotarialfirmadaComponent},
    { path: 'addInventory',component:InventarioFormComponent},
    { path: 'apartado',component:ApartadosComponent},
    { path: 'firma',component:FirmasComponent},
    { path: 'postVenta',component:PostVentaComponent},
    { path: 'reportes',component:ReportesComponent},
    { path: 'verInventario',component:VerInventarioComponent},
    { path: 'contrato',component:ContratoComponent},
    { path: 'contratos',component:ContratosComponent},
    { path: 'avanzarleads',component:ConvertirProspectosComponent},
    { path: 'generarcontrato',component:GenerarcontratoComponent},
    { path: 'Estadisticasglobales',component:EstadisticasglobalesComponent},
    { path: 'infoInventario/:id',component:InventariosInfoComponent},
    { path: 'menuMapas',component:MenuMapasComponent},
    { path: 'mapa/:nombre',component:MapaComponent},
    { path: 'mapa/:nombre/:idMapa',component:MapaComponent},
    { path: 'asignaInventario/:id',component:AsignaInventarioComponent},
    { path: 'desarrollo',component:SeleccionarDesarrolloComponent}
    
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
