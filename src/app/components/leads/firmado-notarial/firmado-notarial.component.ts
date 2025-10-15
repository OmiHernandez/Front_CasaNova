import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';

import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-firmado-notarial',
  templateUrl: './firmado-notarial.component.html',
  styleUrls: ['./firmado-notarial.component.scss']
})
export class FirmadoNotarialComponent {

  nombrecom: any;
  nacionalidad: any;
  origenes: any;
  domicilio: any;
  civil: any;
  ocupacion: any;

  sociedadf: any;
  fidef: any;
  actof: any;
  adquieref: any;
  valorf: any;

  suscribef: any;

  seccionSeleccionada: boolean = true;
  fiduciarios: boolean = true;

  cambiarSeccion(seleccion: boolean) {
    this.fiduciarios = seleccion;
  }

  ListaLeads: any[] = [];
  constructor(private leadApiService: LeadApiService, private inventarioApi: InventarioApiService) {
    this.leadApiService.getLeadsFirmado().subscribe((data: any[]) => {
      this.ListaLeads = data;
      this.getDatosCompletos()
      console.log(this.ListaLeads, "LISTA LEADS");
    }, error => {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Ha ocurrido una falla al conectarse con la base de datos",
      });
    });

  }

  async getDatosCompletos() {

    for (let lead of this.ListaLeads) {
      console.log(lead.idinteres)
      if (lead.idinteres != undefined) {
        await this.inventarioApi.getInventarioById(lead.idinteres).subscribe(data => {

          console.log(data, "interes");
          lead.desarrollo = data.desarrollo;
          lead.manzana = data.manzana;
          lead.lote = data.lote;
          lead.medidas = data.medidas;
          lead.preciovente = data.precioVenta;
          lead.descuento = data.descuento;

        });
      }

      console.log(lead)
    }
    console.log(this.ListaLeads, "LISTA con datos extra");
  }


  ngOnInit(): void {

  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const dia = this.agregarCeroALaIzquierda(fecha.getDate());
    const mes = this.agregarCeroALaIzquierda(fecha.getMonth() + 1); // Los meses van de 0 a 11
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  agregarCeroALaIzquierda(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  async createPdf2(id: any, modelo: any, etapa: any, medidas: any, manzana: any, lote: any, frac: any, medTer: any, colind: any, nombre: any, nacionalidad: any, origenes: any, domicilio: any, civil: any, ocupacion: any, costototal: any, costotexto: any, fecha: any, leadparam: any) {

    fecha = this.obtenerFechaActual();

    if (!this.sociedadf || !this.fidef || !this.actof || !this.adquieref) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos antes de generar el contrato.",
        icon: "error"
      });
      return;
    }

    console.log(leadparam, "leadparam")
    costototal = leadparam.preciovente * leadparam.medidas * (1 - (leadparam.descuento / 100));

    //scostotexto = this.numeroATexto(costototal)

    console.log(costototal)
    costototal = costototal.toLocaleString();

    var sociedad = this.sociedadf;
    var fide = this.fidef;
    var acto = this.actof;
    var adquiere = this.adquieref;
    var valor = costototal;


    var docDefinition = {
      content: [
        {
          text: [
            { text: '_______ día ' + fecha, fontSize: 11, alignment: 'right' }
          ]
        },
        {
          text: [
            '_______',
          ]
        },
        {
          text: [
            '_______',
          ]
        },
        {
          text: [
            'PRESENTE\n\n',
          ]
        },
        {
          text: [
            { text: 'REFERENCIA: Fideicomiso No. _______', alignment: 'center' }
          ]
        },
        {
          text: [
            { text: 'ASUNTO: Carta Instrucción  para Transmisión de Propiedad en ejecución y extinción parcial de fideicomiso\n\n', alignment: 'center' }
          ]
        },
        {
          text: [
            'El que suscribe ' + this.suscribef + ' en representación de la sociedad denominada ' + sociedad + ' con el carácter de Fideicomitente y Fideicomisario ' + fide + ', en el CONTRATO DE FIDEICOMISO DE ADMINISTRACION INMOBILIARIA E INVERSION CON DERECHO A REVERSION, identificado administrativamente con el número _______, formalizado mediante escritura pública número _______, de fecha _______, otorgada ante la fe del _______, notario público número _______ en ejercicio en _______.',
            '\n\n',
          ]
        },
        {
          text: [
            'Con base en lo estipulado en el numeral 7 de la cláusula Sexta de Fines del Fideicomiso del contrato de fideicomiso referido en el párrafo inmediato anterior, por medio del presente se instruye a _______, en su carácter de Fiduciario a fin de que a su vez instruya la formalización del acto que se describe a continuación, así como de comparecer a la firma del instrumento en el cual se haga constar su formalización.\n\n',
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],

            body: [
              ['Acto', 'Adquirente', 'Mz', 'Lt', 'Fraccionamiento', 'Valor de operación'],
              [acto, adquiere, manzana, lote, frac, valor],
            ]
          }
        },
        {
          text: [
            '\n\nPara lo anterior se proporcionan los datos de la notaría asignada para la formalización del acto instruido, así como el contacto del responsable:',
          ]
        },
        {
          text: [
            'NOTARIO: _______',
          ]
        },
        {
          text: [
            'TELEFONO: _______',
          ]
        },
        {
          text: [
            'RESPONSABLE: _______     CORREO: _______\n\n',
          ]
        },
        {
          text: [
            'Por lo anterior, libero de toda responsabilidad al Fiduciario por la ejecución de la presente instrucción.\n\n\n\n',
          ]
        },
        {
          text: [
            { text: 'ATENTAMENTE\n\n\n\n', alignment: 'center' }
          ]
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }],
        },
        {
          text: [
            { text: '\n\nFIDEICOMITENTE Y FIDEICOMISARIO ' + fide, alignment: 'center' }
          ]
        },
        {
          text: [
            { text: sociedad, alignment: 'center' }
          ]
        },
        {
          text: [
            { text: nombre, alignment: 'center' }
          ]
        }
      ]

    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    try {
      pdfMake.createPdf(docDefinition).download('userdata.pdf');
      Swal.fire({
        title: "Contrato generado correctamente",
        text: "Contrato generado",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al generar el contrato',
        text: 'Ocurrió un error al generar el contrato. Por favor, inténtalo de nuevo.',
      });
    }
  }

  async createPdf(id: any, modelo: any, etapa: any, medidas: any, manzana: any, lote: any, frac: any, medTer: any, colind: any, nombre: any, nacionalidad: any, origenes: any, domicilio: any, civil: any, ocupacion: any, costototal: any, costotexto: any, fecha: any, leadparam: any) {

    if (!this.sociedadf || !this.fidef || !this.actof || !this.adquieref) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos antes de generar el contrato.",
        icon: "error"
      });
      return;
    }

    fecha = this.obtenerFechaActual();

    console.log(leadparam, "leadparam")
    costototal = leadparam.preciovente * leadparam.medidas * (1 - (leadparam.descuento / 100));

    //scostotexto = this.numeroATexto(costototal)

    console.log(costototal)
    costototal = costototal.toLocaleString();

    var sociedad = this.sociedadf;
    var fide = this.fidef;
    var acto = this.actof;
    var adquiere = this.adquieref;
    var valor = costototal;


    var docDefinition = {
      content: [
        {
          text: [
            { text: '_______ día ' + fecha, fontSize: 11, alignment: 'right' }
          ]
        },
        {
          text: [
            '_______',
          ]
        },
        {
          text: [
            '_______',
          ]
        },
        {
          text: [
            'PRESENTE\n\n',
          ]
        },
        {
          text: [
            { text: 'REFERENCIA: Fideicomiso No. _______', alignment: 'center' }
          ]
        },
        {
          text: [
            { text: 'ASUNTO: Carta Instrucción  para Transmisión de Propiedad en ejecución y extinción parcial de fideicomiso\n\n', alignment: 'center' }
          ]
        },
        {
          text: [
            'El que suscribe ' + this.suscribef + ' en representación de la sociedad denominada ' + sociedad + ' con el carácter de Fideicomitente y Fideicomisario ' + fide + ', en el CONTRATO DE FIDEICOMISO DE ADMINISTRACION INMOBILIARIA E INVERSION CON DERECHO A REVERSION, identificado administrativamente con el número _______, formalizado mediante escritura pública número _______, de fecha _______, otorgada ante la fe del _______, notario público número _______ en ejercicio en _______.',
            '\n\n',
          ]
        },
        {
          text: [
            'Con base en lo estipulado en el numeral 7 de la cláusula Sexta de Fines del Fideicomiso del contrato de fideicomiso referido en el párrafo inmediato anterior, por medio del presente se instruye a _______, en su carácter de Fiduciario a fin de que a su vez instruya la formalización del acto que se describes a continuación, así como de comparecer a la firma del instrumento en el cual se haga constar su formalización.\n\n',
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],

            body: [
              ['Acto', 'Adquirente', 'Mz', 'Lt', 'Fraccionamiento', 'Valor de operación'],
              [acto, adquiere, manzana, lote, frac, valor],
            ]
          }
        },
        {
          text: [
            '\n\nPara lo anterior se proporcionan los datos de la notaría asignada para la formalización del acto instruido, así como el contacto del responsable:',
          ]
        },
        {
          text: [
            'NOTARIO: _______',
          ]
        },
        {
          text: [
            'TELEFONO: _______',
          ]
        },
        {
          text: [
            'RESPONSABLE: _______     CORREO: _______\n\n',
          ]
        },
        {
          text: [
            'Por lo anterior, libero de toda responsabilidad al Fiduciario por la ejecución de la presente instrucción.\n\n\n\n',
          ]
        },
        {
          text: [
            { text: 'ATENTAMENTE\n\n\n\n', alignment: 'center' }
          ]
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 500, y2: 0, lineWidth: 2 }],
        },
        {
          text: [
            { text: '\n\nFIDEICOMITENTE Y FIDEICOMISARIO ' + fide, alignment: 'center' }
          ]
        },
        {
          text: [
            { text: sociedad, alignment: 'center' }
          ]
        },
        {
          text: [
            { text: this.suscribef, alignment: 'center' }
          ]
        },

      ]

    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    try {
      pdfMake.createPdf(docDefinition).download('userdata.pdf');
      Swal.fire({
        title: "Contrato generado correctamente",
        text: "Contrato generado",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al generar el contrato',
        text: 'Ocurrió un error al generar el contrato. Por favor, inténtalo de nuevo.',
      });
    }
  }

  avanzarlead(id: any): void {
    this.leadApiService.anvanzarLead(id).subscribe((data: any[]) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Estado actualizado correctamente"
      });
      window.location.reload();
    }, error => {

    });
  }
  regresarLead(id: any): void {
    this.leadApiService.regresarLead(id).subscribe((data: any[]) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Estado actualizado correctamente"
      });
      window.location.reload();
    }, error => {

    });
  }



}
