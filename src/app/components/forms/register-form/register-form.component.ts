import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//sweet alert
import Swal from 'sweetalert2';
import { UserServiceService } from '../../../services/user-service.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  RegisterForm!: FormGroup;

  tiposusuario: string[] = ['Construccion', 'Ventas', 'Administración', 'Tecnico', 'Vendedor lider'];

  norrellenados: string[] = []; //muestra los campos no rellenados
  
  constructor(
    private fb: FormBuilder,
    private registerService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  async onSubmit() {
    // verificar si hay campos vacíos
    if (this.RegisterForm.invalid) {
      // obtener los campos no válidos
      const controls = this.RegisterForm.controls;
      this.norrellenados = Object.keys(controls).filter(key => controls[key].errors?.['required']).map(key => this.mapFieldName(key));
      
      // mostrar mensaje de error con los campos no rellenados
      Swal.fire({
        icon: 'question',
        title: 'Por favor, complete los campos: ',
        text: `${this.norrellenados.join(', ')}`  
      });
      return;
    }
  
    // si todos los campos están llenos, continuar con el registro
    console.log(this.RegisterForm.value);
    
    if(await this.registerUser()){
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Usuario registrado exitosamente.'
      });
      this.RegisterForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el usuario'
      });
    }
  }

  mapFieldName(fieldName: string): string {
    switch (fieldName) {
      case 'username':
        return 'nombre';
      case 'password':
        return 'contraseña';
      case 'type':
        return 'tipo de usuario';
      default:
        return fieldName;
    }
  }

  // Funcion para registrar usuario
  async registerUser(): Promise<boolean> {
    console.log(this.RegisterForm?.value.type, 'TIPO USUARIO');
    return this.registerService.registerUser(
      this.RegisterForm?.value.username,
      this.RegisterForm?.value.password,
      this.RegisterForm?.value.type
    );
  }

}
