import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { UploadmapService } from 'src/app/services/uploadmap.service';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { MapImageService } from 'src/app/services/map-image.service';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import Swal from 'sweetalert2';
import { MapasService } from 'src/app/services/mapas.service';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

declare var google: any;

@Component({
  selector: 'app-uploadmapa',
  templateUrl: './uploadmapa.component.html',
  styleUrls: ['./uploadmapa.component.scss'],
})
export class UploadmapaComponent implements OnInit, AfterViewInit {
  fileName: string = '';
  selectedFile: File | null = null;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  marker: any;
  coordLat: number = 0;
  coordLng: number = 0;
  isPositionConfirmed: boolean = false;

  constructor(private router: Router, private mapa: MapasService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mexico = { lat: 23.6345, lng: -102.5528 };
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: mexico,
      zoom: 5,
    });

    this.marker = new google.maps.Marker({
      position: mexico,
      map: this.map,
      draggable: true,
    });

    this.map.addListener('click', (e: any) => {
      this.marker.setPosition(e.latLng);
      this.isPositionConfirmed = false; // Reset if user changes position after confirming
    });
  }

  confirmarPosicion() {
    const position = this.marker.getPosition();
    if (position) {
      this.coordLat = position.lat();
      this.coordLng = position.lng();
      Swal.fire({
        title: 'Posición confirmada',
        html: `<b>Latitud:</b> ${this.coordLat.toFixed(
          6
        )}<br><b>Longitud:</b> ${this.coordLng.toFixed(6)}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      this.isPositionConfirmed = true; // Set flag to true
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido obtener la posición. Intente de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      this.isPositionConfirmed = false; // Ensure flag is false on error
    }
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  crearArchivo() {
    if (!this.isPositionConfirmed) { // Check the new flag
      Swal.fire({
        title: 'Error',
        text: 'Debe confirmar la posición en el mapa antes de crear el archivo.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (
      this.selectedFile &&
      this.fileName != '' &&
      this.coordLat !== 0 &&
      this.coordLng !== 0
    ) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64Image = e.target.result;

        var mapa = {
          id: '',
          nombreMapa: this.fileName,
          urlMapa: base64Image,
          coordLat: this.coordLat,
          coordLng: this.coordLng,
        };

        this.mapa.addMapa(mapa).subscribe({
          next: (data: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Mapa subido correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });

            mapa.id = data._id;

            this.router.navigate(
              ['/dashboard/mapa', mapa.nombreMapa],
              { state: { mapa: mapa } }
            );
          },
          error: (error) => {
            console.error('Error al subir mapa:', error);
            Swal.fire({
              title: 'Ha ocurrido un error inesperado al subir su mapa',
              icon: 'warning',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      };

      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
        Swal.fire({
          title: 'Error al procesar la imagen',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      Swal.fire({
        title:
          'Asegúrese de elegir un mapa, un nombre válido y confirmar la posición',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}