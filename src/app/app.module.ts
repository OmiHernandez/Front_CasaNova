import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { HeaderComponent } from './components/header/header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterLeadComponent } from './components/forms/register-lead/register-lead.component';
import { VerLeadsComponent } from './components/leads/ver-leads/ver-leads.component';
import { InventarioFormComponent } from './components/forms/inventario-form/inventario-form.component';
import { LeadsAcomuladosComponent } from './components/graficas/leads-acomulados/leads-acomulados.component';
import { LeadsPorCanalComponent } from './components/graficas/leads-por-canal/leads-por-canal.component';
import { InventarioDisponibleComponent } from './components/graficas/inventario-disponible/inventario-disponible.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { PerfilUsuarioComponent } from './components/usuarios/perfil-usuario/perfil-usuario.component';
import { ApartadoPorPrototipoComponent } from './components/graficas/apartado-por-prototipo/apartado-por-prototipo.component';
import { ApartadoPorCanalComponent } from './components/graficas/apartado-por-canal/apartado-por-canal.component';
import { ApartadosComponent } from './components/pipeline/apartados/apartados.component';
import { ContratosComponent } from './components/pipeline/contratos/contratos.component';
import { FirmasComponent } from './components/pipeline/firmas/firmas.component';
import { EntregaComponent } from './components/pipeline/entrega/entrega.component';
import { PostVentaComponent } from './components/pipeline/post-venta/post-venta.component';
import { VerInventarioComponent } from './components/inventarios/ver-inventario/ver-inventario.component';
import { LeadsMesComponent } from './components/graficas/leads-mes/leads-mes.component';
import { MisLeadsComponent } from './components/leads/mis-leads/mis-leads.component';
import { ProspectosComponent } from './components/leads/prospectos/prospectos.component';
import { LeadsVendorComponent } from './components/graficas/leads-vendor/leads-vendor.component';
import { ContratoComponent } from './components/leads/contrato/contrato.component';
import { HitrateApartadoComponent } from './components/graficas/hitrate-apartado/hitrate-apartado.component';
import { CotizadorComponent } from './components/pipeline/cotizador/cotizador.component';
import { ListaCotizacionesComponent } from './components/pipeline/lista-cotizaciones/lista-cotizaciones.component';
import { VerCotizacionComponent } from './components/pipeline/ver-cotizacion/ver-cotizacion.component';
import { InventariosInfoComponent } from './components/inventarios-info/inventarios-info.component';
import { MapaComponent } from './components/map/mapa/mapa.component';


import { ConvertirProspectosComponent } from './components/leads/convertir-prospectos/convertir-prospectos.component';
import { GenerarcontratoComponent } from './components/leads/generarcontrato/generarcontrato.component';
import { ContratoFirmadoComponent } from './components/leads/contrato-firmado/contrato-firmado.component';
import { FirmadoEntregadaComponent } from './components/leads/firmado-entregada/firmado-entregada.component';
import { MenuMapasComponent } from './components/map/menu-mapas/menu-mapas.component';
import { AsignaInventarioComponent } from './components/map/asigna-inventario/asigna-inventario.component';
import { ConfigurarMapaComponent } from './components/map/configurar-mapa/configurar-mapa.component';
import { FirmadoNotarialComponent } from './components/leads/firmado-notarial/firmado-notarial.component';
import { NotarialfirmadaComponent } from './components/leads/notarialfirmada/notarialfirmada.component';
import { ReportesComponent } from './components/pipeline/reportes/reportes.component';
import { ReportesgraficaComponent } from './components/graficas/reportesgrafica/reportesgrafica.component';
import { EstadisticasglobalesComponent } from './components/graficas/estadisticasglobales/estadisticasglobales.component';
import { PronosticoVentasComponent } from './components/graficas/pronostico-ventas/pronostico-ventas.component';
import { EtapasPorAsesorPorMesComponent } from './components/graficas/etapas-por-asesor-por-mes/etapas-por-asesor-por-mes.component';
import { EtapaspordesarrolloComponent } from './components/graficas/etapaspordesarrollo/etapaspordesarrollo.component';
import { UploadmapaComponent } from './components/uploadmapa/uploadmapa.component';
import { SeleccionarDesarrolloComponent } from './components/seleccionar-desarrollo/seleccionar-desarrollo.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
  
    HeaderComponent,
       DashboardComponent,
       SidebarComponent,
       RegisterLeadComponent,
       VerLeadsComponent,
       InventarioFormComponent,
       LeadsAcomuladosComponent,
       LeadsPorCanalComponent,
       InventarioDisponibleComponent,
       ListaUsuariosComponent,
       PerfilUsuarioComponent,
       ApartadoPorPrototipoComponent,
       ApartadoPorCanalComponent,
       ApartadosComponent,
       ContratosComponent,
       FirmasComponent,
       EntregaComponent,
       PostVentaComponent,
       VerInventarioComponent,
       LeadsMesComponent,
       MisLeadsComponent,
       ProspectosComponent,
       LeadsVendorComponent,
       ContratoComponent,
       HitrateApartadoComponent,
       CotizadorComponent,
       ListaCotizacionesComponent,
       VerCotizacionComponent,
       InventariosInfoComponent,
       MapaComponent,
       ConvertirProspectosComponent,
       GenerarcontratoComponent,
       ContratoFirmadoComponent,
       FirmadoEntregadaComponent,
       MenuMapasComponent,
       AsignaInventarioComponent,
       ConfigurarMapaComponent,
       FirmadoNotarialComponent,
       NotarialfirmadaComponent,
       ReportesComponent,
       ReportesgraficaComponent,
       EstadisticasglobalesComponent,
       PronosticoVentasComponent,
       EtapasPorAsesorPorMesComponent,
       EtapaspordesarrolloComponent,
       UploadmapaComponent,
       SeleccionarDesarrolloComponent,
       DashboardHomeComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
