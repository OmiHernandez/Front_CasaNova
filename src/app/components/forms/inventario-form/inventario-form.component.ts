import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InventarioApiService } from '../../../services/inventario-api.service';
import { LoginServiceService } from '../../../services/login-service.service';
@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.scss'],
})
export class InventarioFormComponent implements OnInit {
  inventarioForm: FormGroup;
  selectedOption: string = 'NoCalle';

  cred: any;

  arrColindancias: any[] = [];

  preciofinal: number = 0;

  preciobase: number = 0;

  descuentopor: number = 0;

  metrosterreno: number = 0;

  verificador: number = 0; //verifica si todos los campos fueron llenados

  norrellenados: string[] = []; //muestra los campos no rellenados

  desarrollo: string = "Paseras"

  aprobado: boolean = false;

  seccionSeleccionada: string = 'seccion1'; // Por defecto, selecciona la sección 1

  valorpormetros: boolean = true

  cambiarSeccion(seleccion: boolean) {
    this.valorpormetros = seleccion;
    if (seleccion === false){
      this.metrosterreno=1;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiInventario: InventarioApiService,
    private login: LoginServiceService,
    private router: Router,
  ) {
    this.inventarioForm = this.formBuilder.group({
      desarrollo: ['', Validators.required],
      manzana: ['', Validators.required],
      lote: ['', Validators.required],
      lotec: ['', Validators.required],
      manzanac: ['', Validators.required],
      metros: ['', Validators.required],
      opcion: ['', Validators.required],
      opcionRadio: ['', Validators.required],
      medidas: ['', Validators.required],
      precioVenta: ['', Validators.required],
      descuentoPronto: ['', Validators.required],
      medidasTerreno: ['', Validators.required],
      terrenosComercial: ['', Validators.required],
      nombreCalle:['']
    });

    

    this.cred = this.login.getCredentials();
  }

  ngOnInit(): void { }

  onSubmit() {
    var inventario = {};
    var inventario_id = '';
  
    inventario = {
      id_usuario: this.cred._id,
      desarrollo: this.inventarioForm.value.desarrollo,
      manzana: this.inventarioForm.value.manzana,
      lote: this.inventarioForm.value.lote,
      metros: this.inventarioForm.value.metros,
      prototipo: this.inventarioForm.value.opcion,
      medidas: this.metrosterreno,
      precioVenta: this.inventarioForm.value.precioVenta,
      descuento: this.descuentopor,
      colindancias: [],
    };
    
   
    if (this.aprobado == true) {
      this.apiInventario.addInventory(inventario).subscribe((res: any) => {
        console.log(res, 'Respuesta servidor');
        inventario_id = res._id;
        this.registradorColindancias(inventario_id);
      });
      this.aprobado = false;
    } else {
      console.log('El formulario esta incompleto');
    }
  }

  registradorColindancias(id_inv: string) {
    console.log(this.arrColindancias, 'comenzar colin');
    let peticionesCompletadas = 0;

    // Número total de peticiones esperadas
    const totalPeticiones = this.arrColindancias.length;

    this.arrColindancias.forEach((colin) => {
      colin.id_inventario = id_inv;
      this.apiInventario.addColindancia(colin).subscribe((res: any) => {
        console.log(res, 'respuesta colin');
        peticionesCompletadas++;

        // Verifica si se han completado todas las peticiones
        if (peticionesCompletadas === totalPeticiones) {
          // Si se han completado todas, realiza el reload
          window.location.reload();
        }
      });
    });
  }

  onRadioChange(value: string) {
    if(value==="NoCalle"){
      this.inventarioForm.get('nombreCalle')?.setValue("");

    }
  
    this.selectedOption = value;
  }

  asignadorColindancias(id_inventario: string) {
    // var obj = {
    //   idInventario:id_inventario;
    // }
    // this.apiInventario.asignarColindanciasArray();
  }

  onSubmitColindancia() {
    var colin = {};
    if(this.selectedOption == 'SiCalle'){
      colin = {
        id_inventario: '',
        manzanac: this.checarInventarioCalle(this.inventarioForm.value.nombreCalle),
        lotec: this.checarInventarioCalle(this.inventarioForm.value.nombreCalle),
        metros: this.inventarioForm.value.metros,
        direccion: this.inventarioForm.value.opcionRadio,
        nombreCalle: this.checarInventarioCalle(this.inventarioForm.value.nombreCalle)
      };
    }
    else{
      colin = {
        id_inventario: '',
        manzanac: this.inventarioForm.value.manzanac,
        lotec: this.inventarioForm.value.lotec,
        metros: this.inventarioForm.value.metros,
        direccion: this.inventarioForm.value.opcionRadio,
        nombreCalle: this.checarInventarioCalle(this.inventarioForm.value.nombreCalle)  
      };
    }
    
    this.arrColindancias.push(colin);
    this.colocadorDeColindancias(colin);
  }

  checarInventarioCalle(nombreCalle:string){
    if(nombreCalle === ''){
      return "NoCalle";
    }
    else{
      return nombreCalle;
    }
  }

  calcularPrecioFinal(): number {
    return (
      (this.metrosterreno * this.preciobase * (100 - this.descuentopor)) / 100
    );
  }

  colocadorDeColindancias(colin: any) {
    // Crear la estructura de elementos
    const divColindancia = document.createElement('div');
    divColindancia.classList.add('colindancia', 'w-75', 'p-1');

    const divFlex = document.createElement('div');
    divFlex.classList.add('flex-sa');
    const divManzana = document.createElement('div');
    const divLote = document.createElement('div');
    console.log(colin.manzanac);
    if(this.checarInventarioCalle(colin.nombreCalle)==="NoCalle"){
    
      const pManzana = document.createElement('p');
      pManzana.textContent = 'Manzana:' + colin.manzanac;
      divManzana.appendChild(pManzana);
  
     
      divLote.classList.add('ml-5');
      const pLote = document.createElement('p');
      pLote.textContent = 'Lote:' + colin.lotec;
      divLote.appendChild(pLote);
    }
    else{
    
      const pManzana = document.createElement('p');
      pManzana.textContent = 'Calle:' + colin.manzanac;
      divManzana.appendChild(pManzana);
    }
    

    const divNorte = document.createElement('div');
    divNorte.classList.add('ml-4');
    const pNorte = document.createElement('p');
    pNorte.textContent = 'Norte:' + colin.direccion;
    divNorte.appendChild(pNorte);

    const divMetros = document.createElement('div');
    divMetros.classList.add('ml-4');
    const pMetros = document.createElement('p');
    pMetros.textContent = 'Metros:' + colin.metros;
    divMetros.appendChild(pMetros);

    // Adjuntar los elementos en la estructura correcta
    divFlex.appendChild(divManzana);
    divFlex.appendChild(divLote);
    divFlex.appendChild(divNorte);
    divFlex.appendChild(divMetros);

    divColindancia.appendChild(divFlex);

    // Obtener el div donde se desea hacer appendChild
    const divPadre = document.getElementById(
      'contColindancias'
    ) as HTMLDivElement; // Reemplaza 'divPadre' con el ID de tu div padre

    // Hacer appendChild
    divPadre.appendChild(divColindancia);
  }

  //alerta de validacion
  picarbotton() {
    console.log('--------------------------------------------------------------------------------------------------------------');
    this.norrellenados = [];
    this.verificador = 0;
    console.log('contador:', this.verificador);
    const vmanzana = this.inventarioForm.get('manzana')!.value;
    const vlote = this.inventarioForm.get('lote')!.value;
    const vprecioVenta = this.inventarioForm.get('precioVenta')!.value;
    const vmedidasTerreno = this.metrosterreno;
    const vdescuentoPronto = this.inventarioForm.get('descuentoPronto')!.value;
    const vterrenosComercial =
      this.inventarioForm.get('terrenosComercial')!.value;
    const vopcion = this.inventarioForm.get('opcion')!.value;
    const vdesarrollo = this.inventarioForm.get('desarrollo')!.value;


    console.log('El valor de la manzana es:', vmanzana);
    console.log('El valor del lote es:', vlote);
    console.log('El valor del precioVenta es:', vprecioVenta);
    console.log('El valor de las medidasTerreno son:', vmedidasTerreno);
    console.log('El valor del descuentoPronto es:', vdescuentoPronto);
    console.log('El valor del terrenosComercial es:', vterrenosComercial);
    console.log('El valor del opcion es:', vopcion);

    if (!vmanzana || vmanzana.trim() === '') {
      console.log('El valor de la manzana está vacío.');
      this.norrellenados.push('Manzana');
      this.verificador += 1;
    } else {
      this.verificador += 1;
    }

    if (!vlote || vlote.trim() === '') {
      console.log('El valor del lote está vacío.');
      this.norrellenados.push('Lote');
      this.verificador += 1;
    } else {
      this.verificador += 1;
    }

    if (!vopcion || vopcion.trim() === '') {
      console.log('El valor del opcion está vacío.');
      this.norrellenados.push('Prototipo');
    } else {
      this.verificador += 1;
    }

    if (!vdesarrollo || vdesarrollo.trim() === '') {
      console.log('El valor del desarrollo está vacío.');
      this.norrellenados.push('Desarrollo');
    } else {
      this.verificador += 1;
    }

    if (vprecioVenta <= 0) {
      console.log('El valor del precioVenta está vacío.');
      this.norrellenados.push('Precio por M2');
    } else {
      this.verificador += 1;
    }

    if (vmedidasTerreno <= 0) {
      console.log('El valor de las medidasTerreno están vacías.');
      this.norrellenados.push('Medidas del terreno');
    } else {
      this.verificador += 1;
    }

    /*if (vdescuentoPronto <= 0) {
      console.log('El valor del vdescuentoPronto está vacío.');
      this.norrellenados.push('Descuento');
    } else {
      this.verificador += 1;
    }*/

    this.verificador += 1;

    /*if (!vterrenosComercial || vterrenosComercial.trim() === '') {
      console.log('El valor del terrenosComercial está vacío.');
      this.norrellenados.push('Terrenos Comercial');
    } else {
      this.verificador += 1;
    }
*/
    if (this.verificador == 7) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La alta se ha dado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      this.aprobado = true;
    } else {
      const norrellenadosm = this.norrellenados.join(', ');
      Swal.fire({
        title:
          'Parece que no has rellenado algunos campos requeridos los cuales son:',
        text: norrellenadosm,
        icon: 'question',
      });
    }
    console.log('contador:', this.verificador);
  }
}