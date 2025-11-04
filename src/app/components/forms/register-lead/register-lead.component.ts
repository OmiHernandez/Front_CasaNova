import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-lead',
  templateUrl: './register-lead.component.html',
  styleUrls: ['./register-lead.component.scss'],
})
export class RegisterLeadComponent implements OnInit {
  RegisterLeadForm: FormGroup;
  arrInventarios: any[] = [];
  currentinteres: any;
  modelotarget: any;

  norrellenados: string[] = []; //muestra los campos no rellenados

  constructor(
    private fb: FormBuilder,
    private leadApiService: LeadApiService,
    private inventarioApi: InventarioApiService
  ) {
    this.RegisterLeadForm = this.fb.group({
      nombreLead: ['', Validators.required],
      origenLead: ['', Validators.required],
      nota: ['', Validators.required],
      correoElectronico: ['', [Validators.email]],
      numero: ['', Validators.required],
    });

    this.inventarioApi.getInventorys().subscribe((data) => {
      this.arrInventarios = data;
      console.log(this.arrInventarios, 'INV');
    });
  }

  origenLeadOptions: string[] = [
    'RECOMENDACIÓN',
    'WHATSAPP y FACEBOOK',
    'REDES SOCIALES',
    'VISITA AL DESARROLLO',
    'ESPECTACULARES',
    'PRENSA Y REVISTAS',
    'RADIO',
    'FERIAS Y EXPOSICIONES',
    'VOLANTEO CREATIVO',
    'SINDICATOS',
    'VISITA A EMPRESAS',
    'FOLLETOS EN BANCOS',
    'CENTROS COMERCIALES',
    'OTROS',
  ];

  ngOnInit(): void {}

  private obtenerMesActualTexto(): string {
    let fecha: Date = new Date(); // Obtener la fecha y hora actual
    var fechaString = fecha.toISOString();
    return fechaString;
  }

  onSubmit() {
    // Verificar si hay campos vacíos
    if (this.RegisterLeadForm.invalid) {
      // Obtener los campos no válidos
      const controls = this.RegisterLeadForm.controls;
      this.norrellenados = Object.keys(controls).filter(key => controls[key].errors?.['required']).map(key => this.mapFieldName(key));
      
      // Mostrar mensaje de error con los campos no rellenados
      Swal.fire({
        icon: 'question',
        title: 'Por favor, complete los campos: ',
        text: `${this.norrellenados.join(', ')}`  
      });
      return;
    }
  
    // Si todos los campos están llenos, continuar con el registro
    var idcuenta = localStorage.getItem('accountId');
    var nameVendor = localStorage.getItem('username');
  
    console.log(idcuenta);
    const LEAD:any = {
      leadName:this.RegisterLeadForm.get('nombreLead')?.value,
      nota: this.RegisterLeadForm.get('nota')?.value,
      leadOrigin:this.RegisterLeadForm.get('origenLead')?.value,
      leadEmail:this.RegisterLeadForm.get('correoElectronico')?.value,
      leadNumber:this.RegisterLeadForm.get('numero')?.value,
      leadModel: ''/*this.modelotarget*/,
      leadStatus:'LEAD',
      leadVendor: idcuenta,
      nameVendor: nameVendor,
      idinteres: ''/*this.currentinteres*/,
      currentDate: this.obtenerMesActualTexto()
    }
  
    console.log(LEAD)
  
    this.leadApiService.addLead(LEAD).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu lead ha sido registrado exitosamente.'
      });
      // Limpiar el formulario
      this.RegisterLeadForm.reset();
    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar tu lead. Por favor, intenta nuevamente.'
      });
    });
  }

  mapFieldName(fieldName: string): string {
    switch (fieldName) {
      case 'nombreLead':
        return 'Nombre del lead';
      case 'origenLead':
        return 'Origen del lead';
      case 'correoElectronico':
        return 'Correo electrónico';
      case 'numero':
        return 'Número';
      default:
        return fieldName;
    }
  }

  selectaInventario(id: string, modelo: string) {
    this.currentinteres = id;
    this.modelotarget = modelo;
    const elemento = document.getElementById(id);
    const celdas = elemento.getElementsByTagName('td');

    const celdasblank = document.getElementsByTagName('td');

    for (let i = 0; i < celdasblank.length; i++) {
      celdasblank[i].style.background = 'none';
    }

    for (let i = 0; i < celdas.length; i++) {
      celdas[i].style.background = 'gray';
    }
  }
}

/*
onSubmit() {
  // Verificar si hay campos vacíos
  if (this.RegisterLeadForm.invalid) {
    // Obtener los campos no válidos
    const controls = this.RegisterLeadForm.controls;
    this.norrellenados = Object.keys(controls).filter(key => controls[key].errors?.['required']).map(key => this.mapFieldName(key));
    
    // Mostrar mensaje de error con los campos no rellenados
    Swal.fire({
      icon: 'question',
      title: 'Por favor, complete los campos: ',
      text: `${this.norrellenados.join(', ')}`  
    });
    return;
  }

  // Si todos los campos están llenos, continuar con el registro
  var idcuenta = localStorage.getItem('accountId');
  var nameVendor = localStorage.getItem('username');

  console.log(idcuenta);
  const LEAD:any = {
    leadName:this.RegisterLeadForm.get('nombreLead')?.value,
    leadOrigin:this.RegisterLeadForm.get('origenLead')?.value,
    leadEmail:this.RegisterLeadForm.get('correoElectronico')?.value,
    leadNumber:this.RegisterLeadForm.get('numero')?.value,
    leadModel:this.modelotarget,
    leadStatus:'LEAD',
    leadVendor: idcuenta,
    nameVendor: nameVendor,
    idinteres: this.currentinteres,
    currentDate: this.obtenerMesActualTexto()
  }

  console.log(LEAD)

  this.leadApiService.addLead(LEAD).subscribe(data=>{
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Tu lead ha sido registrado exitosamente.'
    });
    // Limpiar el formulario
    this.RegisterLeadForm.reset();
  },error=>{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al registrar tu lead. Por favor, intenta nuevamente.'
    });
  });
}
////////////////////////////////////////////////////////////////
  onSubmit() {
    var idcuenta = localStorage.getItem('accountId');
    var nameVendor = localStorage.getItem('username');

    console.log(idcuenta);
    const LEAD: any = {
      leadName: this.RegisterLeadForm.get('nombreLead')?.value,
      leadOrigin: this.RegisterLeadForm.get('origenLead')?.value,
      leadEmail: this.RegisterLeadForm.get('correoElectronico')?.value,
      leadNumber: this.RegisterLeadForm.get('numero')?.value,
      leadModel: this.modelotarget,
      leadStatus: 'LEAD',
      leadVendor: idcuenta,
      nameVendor: nameVendor,
      idinteres: this.currentinteres,
      currentDate: this.obtenerMesActualTexto(),
    };

    console.log(LEAD);

    this.leadApiService.addLead(LEAD).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu lead ha sido registrado exitosamente.',
        });
        //limpiar el formulario
        this.RegisterLeadForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar tu lead. Por favor, intenta nuevamente.',
        });
      }
    );
  }

*/
