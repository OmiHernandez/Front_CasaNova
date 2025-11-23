import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoordenadasService } from 'src/app/services/coordenadas.service';
import { InventarioApiService } from 'src/app/services/inventario-api.service';
import { MapasService } from 'src/app/services/mapas.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {

  @ViewChild('mapContainer') mapContainer: ElementRef | undefined;
  pins: { id: string, id_inventario: string, nombre: string, estado: string, left: number, top: number }[] = [];
  pinsSinAdaptacion: any[] = [];
  realmapaname: string = "";
  nombreMapa: string = "";
  idMapa: string = "";
  idMapaAntiguo: string = "";
  coordLngMapa: string = "";
  coordLatMapa: string = "";
  arrCordenadas: string[] = [];

  esConfiguracionMapa: boolean = false;


  id_LoteViewing: string = "";

  listaInventarios: any[] = [];

  urlImagenMapa: any = "";
  backgroundUrl: string = 'url(x)';



  constructor(
    private coordenadaService: CoordenadasService,
    private route: ActivatedRoute,
    private mapaService: MapasService,
    private router: Router,
    private inventario: InventarioApiService) {

    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state && navigation.extras.state['mapa']) {
      // New way: data passed via router state
      this.urlImagenMapa = navigation.extras.state['mapa'];
      this.nombreMapa = this.urlImagenMapa.nombreMapa;
      this.realmapaname = this.urlImagenMapa.nombreMapa;
      this.coordLatMapa = this.urlImagenMapa.coordLat;
      this.coordLngMapa = this.urlImagenMapa.coordLng;
      this.idMapaAntiguo = this.urlImagenMapa.id;
      console.log('Mapa data received via state:', this.urlImagenMapa);
    } else {
      // Old way or "ConfigurarMapa": data from route params
      this.route.params.subscribe(params => {
        this.nombreMapa = params['nombre'];
        this.idMapa = params['idMapa'];

        if (this.nombreMapa == "ConfigurarMapa") {
          this.esConfiguracionMapa = true;
          this.coordenadaService.getCoordenadasPorIdMapa(this.idMapa).subscribe((data: any) => {
            this.pinsSinAdaptacion = data;
            console.log(this.pinsSinAdaptacion, "Datos pins");
            this.convertirCoordenadasAPins();

            this.mapaService.getMapaPorId(this.idMapa).subscribe(data2 => {
              this.coordLatMapa = data2.coordLat;
              this.coordLngMapa = data2.coordLng;
              this.urlImagenMapa = data2.urlMapa; // urlImagenMapa is a string here
              console.log(this.coordLatMapa, "COORDENADA LAT");
              console.log(this.coordLngMapa, "COORDENADA LNG");
              var mapaElement = document.getElementById("imagenMapa") as HTMLDivElement;
              if (mapaElement) {
                mapaElement.style.backgroundImage = "url('" + this.urlImagenMapa + "')";
              }
            });
          });
        }
        else {
          // This block is for direct navigation with params (old way) if state wasn't used.
          try {
            var obj = JSON.parse(params['idMapa']);
            this.urlImagenMapa = obj; // urlImagenMapa is an object here
            this.realmapaname = this.urlImagenMapa.nombreMapa;
            this.coordLatMapa = this.urlImagenMapa.coordLat;
            this.coordLngMapa = this.urlImagenMapa.coordLng;
            this.idMapaAntiguo = this.urlImagenMapa.id;
            console.log(this.coordLatMapa, "COORDENADA LAT (from params)");
          } catch (e) {
            console.error('Error parsing map data from route params:', e);
          }
        }
      });
    }

    this.inventario.getInventorys().subscribe(data => {
      this.listaInventarios = data;
    });
  }

  ngAfterViewInit() {
    if (this.urlImagenMapa && typeof this.urlImagenMapa === 'object' && this.urlImagenMapa.urlMapa) {
        var mapaDiv = document.getElementById("imagenMapa") as HTMLDivElement;
        if (mapaDiv && !mapaDiv.style.backgroundImage) {
          mapaDiv.style.backgroundImage = "url('" + this.urlImagenMapa.urlMapa + "')";
          console.log("Image set in ngAfterViewInit from object:", this.urlImagenMapa.urlMapa);
        }
    } else if (typeof this.urlImagenMapa === 'string' && this.urlImagenMapa !== "") {
        var mapaDiv = document.getElementById("imagenMapa") as HTMLDivElement;
        if (mapaDiv && !mapaDiv.style.backgroundImage) {
          mapaDiv.style.backgroundImage = "url('" + this.urlImagenMapa + "')";
          console.log("Image set in ngAfterViewInit from string:", this.urlImagenMapa);
        }
    }
  }

  addPin(event: MouseEvent) {
    if (this.mapContainer) {
      const rect = this.mapContainer.nativeElement.getBoundingClientRect();
      const offsetX = event.clientX - rect.left; // Considerando el desplazamiento del pin
      const offsetY = event.clientY - rect.top; // Considerando el desplazamiento del pin

      // Verificar si el clic se realizó en un pin existente
      const clickedOnPin = this.pins.some(pin => {
        return Math.abs(pin.left - offsetX) < 10 && Math.abs(pin.top - offsetY) < 10;
      });

      // Si no se hizo clic en un pin existente, agregar el nuevo pin
      if (!clickedOnPin && this.esConfiguracionMapa == false) {
        this.pins.push({ id: "", nombre: "", id_inventario: "", estado: "", left: offsetX, top: offsetY });
        console.log('Pins:', this.pins); // Muestra las posiciones de todos los pines en la consola
        this.generarPin();
      }
    }
  }

  // Hecer clic en un pin
  onPinClick(index: number, event: MouseEvent) {
    // console.log(this.pins[index].id,"Infromacion");
    this.id_LoteViewing = this.pins[index].id;
    if (this.esConfiguracionMapa == false) {
      Swal.fire({
        title: "Deseas eliminar este punto?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          const divClickeado = event.target as HTMLDivElement;
          divClickeado.remove();
          Swal.fire("Lote eliminado", "", "success");
          this.encontrarCoordenadaEliminar(this.pins[index].left, this.pins[index].top);
        } else if (result.isDenied) {
        }
      });
    }
    else {
      try {
        this.inventario.getInventarioById(this.pins[index].id_inventario).subscribe(data => {
          console.log(data, "INFORMACION");
          Swal.fire({
            title: 'Información',
            html:
              '<h4>Manzana: ' + data.manzana + '</h4>' +
              '<h4>Lote: ' + data.lote + '</h4>' +
              '<h4>Estado: ' + this.pins[index].estado + '</h4>',
            focusConfirm: false,
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Asignar Inventario',
            cancelButtonColor: '#24479A',
            showCloseButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              // Recuperar los valores del formulario y el select
              const nombre = document.getElementById('swal-input1') as HTMLInputElement;
              const estado = document.getElementById('swal-select') as HTMLSelectElement;
              console.log(nombre.value + " " + estado.value);
              this.asignarCambiosLote(nombre.value, estado.value);
              // Hacer lo que necesites con los datos (en este caso, solo los mostramos)
              // Swal.fire(`Nombre: ${nombre}<br>Correo electrónico: ${correo}<br>Estado: ${estado}`);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              // Si se cierra el SweetAlert2, llamar a la función de opciones adicionales
              this.mostrarOpcionesAdicionales(this.id_LoteViewing);
            }
          });
        }, (error: any) => {
          Swal.fire({
            title: 'Pin sin inventario asignado',
            focusConfirm: false,
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Asignar Inventario',
            cancelButtonColor: '#24479A',
            showCloseButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              // Recuperar los valores del formulario y el select
              const nombre = document.getElementById('swal-input1') as HTMLInputElement;
              const estado = document.getElementById('swal-select') as HTMLSelectElement;
              console.log(nombre.value + " " + estado.value);
              this.asignarCambiosLote(nombre.value, estado.value);
              // Hacer lo que necesites con los datos (en este caso, solo los mostramos)
              // Swal.fire(`Nombre: ${nombre}<br>Correo electrónico: ${correo}<br>Estado: ${estado}`);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              // Si se cierra el SweetAlert2, llamar a la función de opciones adicionales
              this.mostrarOpcionesAdicionales(this.id_LoteViewing);
            }
          });
        });
      }
      catch {
      }
    }
  }

  mostrarOpcionesAdicionales(id: string) {
    this.router.navigate(['/dashboard/asignaInventario', id])
  }

  //De un array de coordenadas colocar cada una en el mapa usando un ngFor
  initializePins(positions: { id: string, nombre: "", id_inventario: "", estado: "", left: number, top: number }[]) {
    this.pins = positions;
  }

  generarPin() {
    var div = document.createElement("div");
    div.classList.add("flex-sa", "w-100", "loteDisponibilidad");

    var p1 = document.createElement("p");
    p1.textContent = "Lote";

    var p2 = document.createElement("p");
    p2.textContent = "Disponible";

    div.appendChild(p1);
    div.appendChild(p2);

    var container = document.getElementById("container") as HTMLDivElement;
    container.appendChild(div);
  }

  encontrarCoordenadaEliminar(left: number, top: number) {
    for (let i = 0; i < this.pins.length; i++) {
      const pin = this.pins[i];
      if (pin.left === left && pin.top === top) {
        console.log("Pin a eliminar:" + pin);

        this.pins = this.pins.filter((pin, index) => index !== i);
        console.log(this.pins);
      }
    }
    return null;
  }

  eliminarPin(id: string) {
    var divToRemove = document.getElementById(id) as HTMLDivElement;
    divToRemove.remove();
  }

guardaMapa() {
  var mapa = {
    "nombreMapa": this.realmapaname,
    "urlMapa": this.urlImagenMapa.urlMapa,
    "coordLng": this.coordLngMapa,
    "coordLat": this.coordLatMapa,
    "coordenadas": [],
  };

  console.log(mapa, "Mapa a guardar");

  this.mapaService.addMapa(mapa).subscribe((data: any) => {
    this.idMapa = data._id;

    const observables = this.pins.map(pin => {
      const coord = {
        "id_mapa": data._id,
        "coordenadaX": pin.left,
        "coordenadaY": pin.top
      };
      return this.coordenadaService.addCoordenada(coord);
    });

    forkJoin(observables).subscribe((cordes) => {
      console.log('Todas las coordenadas se han guardado');
      console.log(cordes, 'Cordenadas recibidas');
      cordes.forEach((cord: any) => {
        this.arrCordenadas.push(cord._id);
      });
      this.asignarCoordenadas();
    }, (error) => {
      console.error('Error al guardar coordenadas:', error);
      // Si hay error, eliminar el mapa creado
      this.mapaService.deleteMapa(this.idMapa).subscribe();
    });
  }, (error) => {
    console.error('Error al crear el mapa:', error);
  });
}

asignarCoordenadas() {
  var mapa = {
    "nombreMapa": this.idMapa,
    "coordenadasArray": this.arrCordenadas,
  };

  this.mapaService.putCoordenadas(mapa).subscribe(data => {
    console.log("Coordenadas Asignadas");

    // Llamar a deleteMapa usando this.nombreMapa como ID
    console.log(this.idMapaAntiguo, "ID MAPA A ELIMINAR");
    this.mapaService.deleteMapa(this.idMapaAntiguo).subscribe(() => {
      console.log('Mapa temporal eliminado después del proceso completo');
    });

    Swal.fire({
      title: 'Mapa registrado',
      text: 'El mapa y sus lotes han sido registrados',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/dashboard/menuMapas']);
      }
    });

  }, (error) => {
    console.error('Error al asignar coordenadas:', error);
    // Si hay error, eliminar el mapa creado
    this.mapaService.deleteMapa(this.idMapa).subscribe();
  });
}


  convertirCoordenadasAPins() {
    this.pinsSinAdaptacion.forEach(pinRaw => {
      if (pinRaw.id_inventario == "Sin asignar") {
        var pin = {
          "id": pinRaw._id,
          "nombre": pinRaw.nombre_lote,
          "id_inventario": pinRaw.id_inventario,
          "estado": pinRaw.estado_lote,
          "left": pinRaw.coordenadaX,
          "top": pinRaw.coordenadaY
        }
        this.pins.push(pin);
      }
      else {
        this.inventario.getInventarioById(pinRaw.id_inventario).subscribe(inv => {
          console.log(inv, "EL IMP");
          var pin = {
            "id": pinRaw._id,
            "nombre": pinRaw.nombre_lote,
            "id_inventario": pinRaw.id_inventario,
            "estado": inv.estado,
            "left": pinRaw.coordenadaX,
            "top": pinRaw.coordenadaY
          }
          this.pins.push(pin);
        });
      }


    });
  }

  asignarCambiosLote(nombre: string, estado: string) {

    const nuevoNombre = {
      id: this.id_LoteViewing,
      nuevoNombre: nombre
    };

    const nuevoEstado = {
      id: this.id_LoteViewing,
      nuevoEstado: estado
    };

    this.coordenadaService.putEstadoLote(nuevoEstado).subscribe((datos: any) => {
      this.coordenadaService.putNombreLote(nuevoNombre).subscribe((datas: any) => {
        console.log("Se hicieron los cambios");
        this.actualizarArrayPins();
      });
    });
  }

  actualizarArrayPins() {
    this.coordenadaService.getCoordenadasPorIdMapa(this.idMapa).subscribe((data: any) => {
      this.pinsSinAdaptacion = data;
      console.log(this.pinsSinAdaptacion, "Datos pins");
      this.reconfigurarMapa();
    });
  }

  reconfigurarMapa() {
    this.coordenadaService.getCoordenadasPorIdMapa(this.idMapa).subscribe((data: any) => {
      this.pinsSinAdaptacion = data;
      console.log(this.pinsSinAdaptacion, "Datos pins");
      this.convertirCoordenadasAPins();
    });
  }


  getPinClasses(pin: any): { [key: string]: boolean } {
    return {
      'pin': true, // clase estática
      [pin.estado]: true // clase dinámica basada en el estado de pin
    };
  }

}
