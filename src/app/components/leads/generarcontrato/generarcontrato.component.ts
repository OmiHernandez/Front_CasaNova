import { Component } from '@angular/core';
import { LeadApiService } from 'src/app/services/lead-api.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-generarcontrato',
  templateUrl: './generarcontrato.component.html',
  styleUrls: ['./generarcontrato.component.scss']
})
export class GenerarcontratoComponent {
  idinteresfinal = ""
  ListaLeads: any[] = [];
  nombrecom: any;
  nacionalidad: any;
  origenes: any;
  domicilio: any;
  civil: any;
  ocupacion: any;
  etapaf: any;
  medterf: any;

  //datosrobar

  constructor(private cotizacionesService: CotizacionesService, private leadApiService: LeadApiService, private inventarioApi: InventarioApiService) {
    this.leadApiService.getLeadsCotizado().subscribe((data: any[]) => {

      data.sort((a, b) => {
        return new Date(a.currentDate).getTime() - new Date(b.currentDate).getTime();

      });

      this.ListaLeads = data;
      // alert("Exito");
      console.log(this.ListaLeads, "LISTA LEADS");
      this.getDatosCompletos()

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
      await this.inventarioApi.getInventarioById(lead.idinteres).subscribe(data => {

        console.log(data, "interes");

        lead.idinv = data._id;
        lead.manzana = data.manzana;
        lead.desarrollo = data.desarrollo;
        lead.lote = data.lote;
        lead.medidas = data.medidas;
        lead.preciovente = data.precioVenta;
        lead.descuento = data.descuento;

      });
      console.log(lead)
    }
    console.log(this.ListaLeads, "LISTA con datos extra");
  }

  convertirFecha(fecha: string): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const nombreMes = meses[mes - 1]; // Restar 1 porque los meses están indexados desde 0

    return `${dia} ${nombreMes} ${anio}`;
  }

  Unidades(num) {

    switch (num) {
      case 1: return 'UN';
      case 2: return 'DOS';
      case 3: return 'TRES';
      case 4: return 'CUATRO';
      case 5: return 'CINCO';
      case 6: return 'SEIS';
      case 7: return 'SIETE';
      case 8: return 'OCHO';
      case 9: return 'NUEVE';
    }

    return '';
  }
  // Unidades()

  Decenas(num) {

    const decena = Math.floor(num / 10);
    const unidad = num - (decena * 10);

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return 'DIEZ';
          case 1: return 'ONCE';
          case 2: return 'DOCE';
          case 3: return 'TRECE';
          case 4: return 'CATORCE';
          case 5: return 'QUINCE';
          default: return 'DIECI' + this.Unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0: return 'VEINTE';
          default: return 'VEINTI' + this.Unidades(unidad);
        }
      case 3: return this.DecenasY('TREINTA', unidad);
      case 4: return this.DecenasY('CUARENTA', unidad);
      case 5: return this.DecenasY('CINCUENTA', unidad);
      case 6: return this.DecenasY('SESENTA', unidad);
      case 7: return this.DecenasY('SETENTA', unidad);
      case 8: return this.DecenasY('OCHENTA', unidad);
      case 9: return this.DecenasY('NOVENTA', unidad);
      case 0: return this.Unidades(unidad);
    }
  }// Unidades()

  DecenasY(strSin, numUnidades) {
    if (numUnidades > 0) {
      return strSin + ' Y ' + this.Unidades(numUnidades);
    }
    return strSin;
  }// DecenasY()

  Centenas(num) {
    const centenas = Math.floor(num / 100);
    const decenas = num - (centenas * 100);

    switch (centenas) {
      case 1:
        if (decenas > 0) {
          return 'CIENTO ' + this.Decenas(decenas);
        }
        return 'CIEN';
      case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
      case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
      case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
      case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
      case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
      case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
      case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
      case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
  }// Centenas()

  Seccion(num, divisor, strSingular, strPlural) {
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);

    let letras = '';

    if (cientos > 0) {
      if (cientos > 1) {
        letras = this.Centenas(cientos) + ' ' + strPlural;
      } else {
        letras = strSingular;
      }
    }
    if (resto > 0) {
      letras += '';
    }
    return letras;
  }// Seccion()

  Miles(num) {
    const divisor = 1000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);

    const strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
    const strCentenas = this.Centenas(resto);

    if (strMiles === '') {
      return strCentenas;
    }
    return strMiles + ' ' + strCentenas;
  }// Miles()

  Millones(num) {
    const divisor = 1000000;
    const cientos = Math.floor(num / divisor);
    const resto = num - (cientos * divisor);

    const strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    const strMiles = this.Miles(resto);

    if (strMillones === '') {
      return strMiles;
    }

    return strMillones + ' ' + strMiles;
  }// Millones()

  numeroATexto(num) {
    console.log(num)
    const data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      letrasMonedaPlural: 'PESOS', // 'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: 'PESO', // 'PESO', 'Dólar', 'Bolivar', 'etc'
      letrasMonedaCentavoPlural: 'CENTAVOS',
      letrasMonedaCentavoSingular: 'CENTAVOS'
    };

    if (data.centavos > 0) {
      let centavos = '';
      if (data.centavos === 1) {
        centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
      } else {
        centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
      }
      data.letrasCentavos = 'CON ' + centavos;
    }

    if (data.enteros === 0) {
      return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    }
    if (data.enteros === 1) {
      return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    } else {
      return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    }
  }
  async createPdf(id: any, idinv: any, modelo: any, etapa: any, medidas: any, manzana: any, lote: any, frac: any, medTer: any, colind: any, nombre: any, nacionalidad: any, origenes: any, domicilio: any, civil: any, ocupacion: any, costototal: any, costotexto: any, fecha: any, leadparam: any) {

    if (!nombre || !nacionalidad || !origenes || !domicilio || !civil || !ocupacion) {
      // Mostrar un mensaje de alerta si falta algún campo
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos necesarios para generar el contrato.',
      });
      return; // Detener la ejecución de la función
    }

    var tableBody = [];

    medTer = this.medterf



    await this.cotizacionesService.getCotizacionPorIdUsuario(id).subscribe(async data2 => {
      console.log(data2._id, "cotizaciones");

      await this.cotizacionesService.getMensualidadesPorId(data2._id).subscribe(async data3 => {
        console.log(data2.tieneEnganche, "enganche")
        if (data2.tieneEnganche == "Si") {
          var rowData = [];
          rowData.push('0');
          rowData.push(data2.enganche.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }));
          var etextonum = this.numeroATexto(parseFloat(data2.enganche))

          rowData.push(etextonum + " 00/100");
          rowData.push('Enganche');
          rowData.push('FECHA'); //convertir a texto

          tableBody.push(rowData);
        }


        console.log(data3, "mensualidades");
        // [ 'DEPÓSITO', 'IMPORTE EN PESOS', '(IMPORTE CON LETRA)', 'CONCEPTO', 'VENCIMIENTO'],
        data3.sort((a, b) => {
          // Convertir los valores de 'periodo' a números
          const periodoA = parseInt(a.periodo);
          const periodoB = parseInt(b.periodo);

          // Comparar los números
          if (periodoA < periodoB) {
            return -1;
          }
          if (periodoA > periodoB) {
            return 1;
          }
          return 0;
        });
        data3.forEach((row) => {
          var rowData = [];
          //FALTA AGREGAR EL DEPOSITO Y EL APARTADO
          rowData.push(parseInt(row.periodo));
          var pagofix = parseFloat(row.pago).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
          console.log(pagofix, "pagofix")
          rowData.push(pagofix);
          var textonum = this.numeroATexto(parseFloat(row.pago.replace(',', '')))

          rowData.push(textonum + " 00/100");
          rowData.push(row.es_enganche_o_mensualidad.charAt(0).toUpperCase() + row.es_enganche_o_mensualidad.slice(1));
          rowData.push(this.convertirFecha(row.fecha_pago)); //convertir a texto

          tableBody.push(rowData);
        });





        colind = ""


        await this.inventarioApi.getColindanciasById(idinv).subscribe(data => {
          data.forEach((colin) => {
            if (colin.manzanac == "Colinda con calle") {
              colind += "al " + colin.direccion + " en " + colin.metros + " metros con la calle " + colin.lotec + ", "
            }
            else {
              colind += "al " + colin.direccion + " en " + colin.metros + " metros con el lote " + colin.lotec + " de la manzana " + colin.manzanac + ", "
            }

          });
          costototal = leadparam.preciovente * leadparam.medidas * (1 - (leadparam.descuento / 100));

          costotexto = this.numeroATexto(costototal)

          costototal = costototal.toLocaleString();

          pdfMake.vfs = pdfFonts.pdfMake.vfs;


          var textmetros = ''

          if (medidas > 1) {
            textmetros = modelo + ' de ' + medidas + ' metros de construcción que se construirá en el lote '

          }
          else {
            textmetros = modelo + ' de ' + medidas + ' metros de construcción que se construirá en el lote '
          }

          const docDefinition = {
            content: [
              {
                text: [
                  { text: 'CONTRATO DE PROMESA QUE CELEBRAN POR UNA PARTE LA EMPRESA DENOMINADA “_______” REPRESENTADA EN ESTE ACTO POR EL SEÑOR _______ A QUIEN EN LO SUCESIVO SE LE DENOMINARÁ “EL VENDEDOR” Y POR LA OTRA ' + nombre + ', A QUIEN EN ADELANTE SE LE DENOMINARÁ COMO “EL CLIENTE” AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLAUSULAS:\n\n', bold: true },
                ]
              },
              {
                text: [
                  { text: 'DECLARACIONES:\n\n\n\n', bold: true, alignment: 'center' },
                ]
              },
              {
                text: [
                  { text: 'I.- DECLARA “_______”:\n\n', bold: true, alignment: 'justify' },
                ]
              },
              {
                text: [
                  { text: 'A) .-', bold: true },
                  'Que  es una sociedad mercantil debidamente constituida mediante Escritura Pública número _______, de fecha _______, pasada ante la fe del _______, Notario Público Número _______ del Estado de _______, y que su representante _______, con carácter de _______, cuenta con las facultades necesarias para la celebración del presente contrato, mismas que se desprenden de la  escritura pública descrita en este inciso, en la cual, le fueron otorgados poderes amplísimos de representación de la sociedad, declarando bajo protesta de decir verdad que las facultades que le fueron conferidas no le han sido modificadas o revocadas en forma alguna. \n\n',
                ]
              },
              {
                text: [
                  { text: 'B) .-', bold: true },
                  'Que tiene su domicilio en _______, mismo que señala para todos los efectos legales relativos a la celebración del presente Contrato.  \n\n',
                ]
              },
              {
                text: [
                  { text: 'C) .-', bold: true },
                  'Que su representado(a) ha celebrado un convenio de negocios, por virtud del cual cuenta con los derechos, entre otros, sobre la casa ',
                  { text: textmetros, bold: true },
                  'ubicado en la etapa ',
                  { text: this.etapaf + ' de la manzana ' + manzana + ' lote ' + lote + ' del Fraccionamiento ' + frac + ', con las siguiente superficie de terreno, medidas y colindancias; superficie de ' + medTer + ', colindando ' + colind + ' y para efectos del presente contrato, se le denominará como "EL INMUEBLE".\n\n', bold: true },
                ]
              },
              {
                text: [
                  { text: 'D) .-', bold: true },
                  'Que de conformidad con el convenio de negocios señalado en el inciso que antecede, está facultada y ha realizado todos los trámites que establecen las leyes aplicables al caso para celebrar contratos preparatorios con respecto a ',
                  { text: '"EL INMUEBLE".\n\n', bold: true },
                ]
              },
              {
                text: [
                  { text: 'H) .-', bold: true },
                  'Que de conformidad con las licencias, autorizaciones y permisos respectivos emitidos por autoridad competente, ',
                  { text: 'EL INMUEBLE ', bold: true },
                  'cuenta con la infraestructura para el adecuado funcionamiento de los servicios de suministro de energía eléctrica, agua potable, drenaje y alcantarillado, y demás obras de equipamiento urbano.',
                ]
              },
              {
                text: [
                  { text: 'I) .-', bold: true },
                  'Que es su deseo el celebrar el presente contrato con ',
                  { text: '"EL CLIENTE".\n\n', bold: true },

                ]
              },

              {
                text: [
                  { text: 'II.- DECLARA "EL CLIENTE":\n\n', bold: true },

                ]
              },

              {
                text: [
                  { text: 'A) .-', bold: true },
                  'Ser ' + nacionalidad + ', originario de ' + origenes + ', de estado civil ' + civil + ', mayor de edad, de ocupación ' + ocupacion + ', con domicilio particular en ' + domicilio + ' y que tiene capacidad legal para obligarse y celebrar el presente contrato de promesa de compraventa.\n\n'

                ]
              },

              {
                text: [
                  { text: 'B) .-', bold: true },
                  'Que es su voluntad celebrar el presente contrato de promesa, ya que está interesado(a) en adquirir',
                  { text: ' "EL INMUEBLE" ', bold: true },
                  'que se describe en el presente contrato, y manifiesta que conoce y está de acuerdo las características del mismo, conforme a los términos y condiciones pactados en el presente instrumento.\n\n'
                ]
              },
              {
                text: [
                  { text: 'C) .-', bold: true },
                  'Que se obliga a respetar y hacer cumplir los lineamientos y restricciones previstos en el Reglamento de la Asociación de Colonos o en el Reglamento del Régimen de la Propiedad en Condominio a que se sujetará  mediante la adquisición de "EL INMUEBLE", de ser el caso.\n\n'
                ]
              },

              {
                text: [
                  { text: 'III.- De las partes en conjunto:\n\n', bold: true },

                ]
              },

              {
                text: [
                  { text: 'A) .-', bold: true },
                  'Que atentos a las declaraciones anteriores  y reconociéndose mutuamente la capacidad y facultades  con que comparecen para la celebración  del presente contrato, lo otorgan de conformidad con las siguientes:\n\n'
                ]
              },


              {
                text: [
                  { text: 'CLAUSULAS\n\n', bold: true, alignment: 'center' },

                ]
              },

              {
                text: [
                  { text: 'PRIMERA: OBJETO.- ', bold: true },
                  'Por el presente Contrato "EL VENDEDOR", promete llevar a cabo los actos necesarios para transferir la propiedad de "EL INMUEBLE" descrito en el inciso C) de la declaración I del presente contrato a "EL CLIENTE" quién por su parte se obliga a cumplir con todas y cada una de las obligaciones establecidas en el presente Contrato, en la forma y plazos previstos para tales efectos.\n\n'
                ]
              },

              {
                text: [
                  { text: 'SEGUNDA: TERMINO DEL CONTRATO .- "LAS PARTES"', bold: true },
                  'convienen en que la celebración del contrato definitivo que ampare la transmisión de la propiedad de',
                  { text: ' "EL INMUEBLE" ', bold: true },
                  'y que es objeto del presente contrato, se deberá llevar a cabo, ante Notario Público, una vez que la casa esté terminada en la fecha estipulada entre las partes.\n\n'
                ]
              },

              {
                text: [
                  { text: 'TERCERA: CONDICION SUSPENSIVA.-', bold: true },
                  'Las partes acuerdan que se reunirán en el domicilio de "EL VENDEDOR" al término del plazo estipulado  en la cláusula segunda del presente contrato, para continuar con el trámite de la escritura definitiva.\n\n',
                  'En caso de incumplimiento por parte de "EL CLIENTE", a lo estipulado en la presente cláusula, "EL VENDEDOR" queda eximido de cualquier responsabilidad ya sea por la no tramitación de la escritura definitiva o por la terminación del presente contrato.\n\n',
                  'Las partes acuerdan en que una vez que se haya cumplido la presente condición, el presente contrato tendrá la fuerza legal necesaria en todos sus derechos y obligaciones.\n\n',
                ]
              },

              {
                text: [
                  { text: 'CUARTA: FORMALIZACIÓN DEL CONTRATO DEFINITIVO.-', bold: true },
                  'Las partes convienen en que será a elección de "EL VENDEDOR" la designación del Notario Público que formalizará la escritura de propiedad definitiva.\n\n',
                  'Así mismo, a la formalización de la escritura de propiedad definitiva deberá comparecer "EL CLIENTE" y "EL VENDEDOR", éste último garantizando los vicios ocultos que se pudiesen presentar en las construcciones que haya efectuado sobre "EL INMUEBLE", por un término de un año contado a partir de su fecha de conclusión.\n\n',
                ]
              },

              {
                text: [
                  { text: 'QUINTA: DERECHOS DE TERCEROS.-', bold: true },
                  'Las partes convienen en que el presente contrato  surte efecto a partir de la fecha de firma del mismo, por lo que ningún derecho a favor de tercero constituido por voluntad de "EL VENDEDOR" a partir de esa fecha surtirá efecto entre las partes.\n\n',
                ]
              },

              {
                text: [
                  { text: 'SEXTA: PRECIO.- ', bold: true },
                  'El precio que "EL CLIENTE" se obliga a cubrir por la transmisión de la propiedad de "EL INMUEBLE", la que se llevará a cabo ante notario público, será la cantidad de',
                  { text: ' ' + costototal + ' M.N.  (' + costotexto + ') ', bold: true },
                  'misma que',
                  { text: ' "EL CLIENTE" ', bold: true },
                  'se obliga a pagar a más tardar el día del otorgamiento de la escritura de propiedad respectiva, en moneda nacional.\n\n'
                ]
              },

              {
                text: [
                  { text: 'SÉPTIMA: FORMA DE PAGO.- ', bold: true },
                  '"LAS PARTES" convienen que el precio pactado en la cláusula sexta, respecto de "EL INMUEBLE" deberá cubrirse mediante depósito firme en la cuenta y conforme a las referencias que se indican a continuación:\n\n\n',
                ]
              },
              {
                text: [
                  { text: 'Banco:\n\n', bold: true },
                  { text: 'Titular: _______\n\n', bold: true },
                  { text: 'Cuenta Bancaria: _______\n\n', bold: true },
                  { text: 'Cuenta CLABE: _______\n\n', bold: true },
                  { text: 'Titular de la cuenta : _______\n\n', bold: true },
                  { text: 'Las partes están de acuerdo en que "EL CLIENTE" deberá haber depositado el monto total del precio pactado a mas tardar el día del otorgamiento de las escrituras de propiedad correspondientes, por lo que se obliga a efectuar depósitos parciales conforme al siguiente calendario:\n\n', bold: true }
                ]
              },
              {
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto', 'auto', 'auto'],

                  body: [
                    ['DEPÓSITO', 'IMPORTE EN PESOS', '(IMPORTE CON LETRA)', 'CONCEPTO', 'VENCIMIENTO'],
                    ...tableBody
                  ]
                }
              },
              {
                text: [
                  '\n\nEn caso de que con posterioridad a la firma del presente instrumento existiera algún acuerdo de ambas partes por cualquier discrepancia o modificacion en las dimensiones del "INMUEBLE", se hará el ajuste respectivo en el precio del INMUEBLE y en consiguiente en la escritura ',
                  { text: 'definitiva en que conste la transmisión de propiedad del INMUEBLE.\n\n', bold: true },
                ]
              },
              {
                text: [
                  'Los depósitos estipulados deberán realizarse en la cuenta bancaria referida con antelación.  Así mismo las partes acuerdan expresamente que el incumplimiento en alguno de los depósitos aquí estipulados, ocasionará y en su caso será causa de rescisión del mismo sin responsabilidad para "EL VENDEDOR".\n\n',
                ]
              },
              {
                text: [
                  'En caso que "EL CLIENTE" no lleve a cabo cualquiera de los depósitos de las cantidades pactadas de forma oportuna, se generará un interés moratorio igual al 3% mensual sobre la cantidad no cubierta oportunamente, hasta la total liquidación del adeudo.\n\n',
                ]
              },
              {
                text: [
                  { text: 'OCTAVA: ENTREGA DE "EL INMUEBLE".- ', bold: true },
                  '"EL VENDEDOR" se obliga a llevar a cabo las acciones que permitan entregar y a transmitir la propiedad de "EL INMUEBLE" objeto del presente Contrato, una vez que sea pagado por "EL CLIENTE" el total del precio pactado y una vez que se haya formalizado definitivamente la escritura de propiedad correspondiente (extinción parcial de fideicomiso, en su caso) ante Notario Público, en términos de la fecha estipulada en la cláusula segunda del presente contrato.\n\n',
                ]
              },
              {
                text: [
                  '"EL VENDEDOR" llevará a cabo las acciones necesarias para entregar  la posesión real y material de "EL INMUEBLE" libre de todo adeudo de carácter fiscal, local o federal, así como de aquéllos derivados de servicios de conservación o pagos administrativos requeridos por las autoridades en el plazo pactado en la cláusula segunda, siempre y cuando se haya pagado en su totalidad el precio pactado por "EL INMUEBLE".\n\n',
                ]
              },
              {
                text: [
                  { text: 'NOVENA: GASTOS DE ESCRITURACIÓN E IMPUESTOS.- ', bold: true },
                  'Las partes convienen en que los gastos que se generen con motivo de la escrituración de "EL INMUEBLE" objeto del presente Contrato correrán a cargo de "EL CLIENTE"; así mismo las partes están de acuerdo en que los impuestos, contribuciones u otras cargas fiscales deberán ser cubiertas por la parte a la que la legislación de la materia imponga dicha obligación.\n\n',
                ]
              },
              {
                text: [
                  { text: 'DÉCIMA.- ', bold: true },
                  'Las partes reconocen y aceptan que el presente contrato representa el total acuerdo entre éstas, dejando sin efecto cualquier otra comunicación, ya sea oral o escrita anterior a su firma, y que en su celebración no existe dolo, mala fe, violencia, error ni ningún otro vicio que pueda invalidar el presente contrato.\n\n',
                ]
              },
              {
                text: [
                  { text: 'DÉCIMA PRIMERA: DOMICILIOS.- ', bold: true },
                  'Las partes señalan como sus domicilios para todo lo relativo al cumplimiento de las obligaciones pactadas en este contrato, los señalados en el capítulo de declaraciones del presente contrato.\n\n',
                ]
              },
              {
                text: [
                  { text: 'DECIMA SEGUNDA: LEGISLACIÓN APLICABLE.- ', bold: true },
                  'La Procuraduría Federal del Consumidor (PROFECO) es competente en la vía administrativa para resolver cualquier controversia que se suscite sobre la interpretación o cumplimiento del presente contrato.  Sin perjuicio de lo anterior, las partes acuerdan que para la interpretación y cumplimiento de lo pactado en el presente contrato, las partes se someten expresamente a la jurisdicción y competencia de los tribunales de _______, renunciando expresamente a cualquier otro fuero que en razón de sus domicilios presentes o futuros o por cualquier otra causa, pudiera corresponderles.\n\n',
                ]
              },
              {
                text: [
                  'Leído que fue el presente Contrato de Promesa de Compraventa, que consta de 5 hojas útiles por un solo lado y estando ',
                  { text: '"LAS PARTES" ', bold: true },
                  'de acuerdo con su contenido, lo firman por duplicado, ante los testigos que también firman, en _______ a ' + fecha + '.\n\n\n\n',
                ]
              },
              {
                text: [
                  { text: '"LAS PARTES"\n\n\n', bold: true, alignment: 'center' },
                  { text: '"EL VENDEDOR"\n\n', bold: true, alignment: 'center' },
                  { text: '_______\n\n', bold: true, alignment: 'center' },
                  { text: '_______\n\n', bold: true, alignment: 'center' },
                  { text: '\n\n\n\n', bold: true },
                  { text: '"EL CLIENTE"\n\n', bold: true, alignment: 'center' },
                  { text: nombre + '\n\n', bold: true, alignment: 'center' },
                  { text: '\n\n\n\n', bold: true },
                  { text: 'TESTIGO                                                                              TESTIGO', bold: true, alignment: 'center' },
                ]
              },
            ]
          };



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


        });

      });


    });


  }


  avanzarlead(id: any) {
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
  async regresarLead(id: any, idinv: any): Promise<void> {

    await this.cotizacionesService.borrarCotizacionPorIdUsuario(id).subscribe(async data2 => {
      console.log(data2._id, "cotizaciones");

      await this.cotizacionesService.borrarPorIdCotizacion(data2._id).subscribe(async data3 => {

      });

    });

    var est = {
      "estado": "Apartado"
    }

    this.leadApiService.regresarLead(id).subscribe((data: any[]) => {
      this.inventarioApi.putApartarInventario(est, idinv).subscribe(data2 => {
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
      });

    }, error => {

    });
  }





  saveByteArray(reportName: any, byte: any) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };
}
