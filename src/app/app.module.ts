import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { PerfilUsuarioComponent } from './components/usuarios/perfil-usuario/perfil-usuario.component';
<<<<<<< HEAD
import { InventarioFormComponent } from './components/forms/inventario-form/inventario-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
=======
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
>>>>>>> rama_naomi

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ListaUsuariosComponent,
    PerfilUsuarioComponent,
<<<<<<< HEAD
    InventarioFormComponent,
    LoginFormComponent,
    RegisterFormComponent
=======
    HeaderComponent,
    NavbarComponent
>>>>>>> rama_naomi
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
