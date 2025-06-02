import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { InventarioFormComponent } from './components/forms/inventario-form/inventario-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    InventarioFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
