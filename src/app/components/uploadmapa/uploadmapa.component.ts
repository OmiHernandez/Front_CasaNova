import { Component } from '@angular/core';

import { UploadmapService } from 'src/app/services/uploadmap.service';
import { map, finalize } from "rxjs/operators";
import { Observable } from 'rxjs';
import { initializeApp } from "firebase/app";
import { MapImageService } from 'src/app/services/map-image.service';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Swal from 'sweetalert2';
import { MapasService } from 'src/app/services/mapas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uploadmapa',
  templateUrl: './uploadmapa.component.html',
  styleUrls: ['./uploadmapa.component.scss']
})
export class UploadmapaComponent {

  fileName: string = '';
  selectedFile: File | null = null;

  // ELIMINAMOS LA CONFIGURACIÓN DE FIREBASE
  constructor(private router: Router, private mapa: MapasService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  crearArchivo() {
    if (this.selectedFile && this.fileName != '') {
      // Convertir archivo a base64
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        
        // Crear objeto mapa con la imagen en base64
        var mapa = {
          nombreMapa: this.fileName,
          urlMapa: base64Image, // Ahora es base64 en lugar de URL de Firebase
        };

        // Enviar al servicio
        this.mapa.addMapa(mapa).subscribe({
          next: (data: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Mapa subido correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            
            // Navegar a la vista del mapa
            this.router.navigate(['/dashboard/mapa', data._id, JSON.stringify(data)]);
          },
          error: (error) => {
            console.error('Error al subir mapa:', error);
            Swal.fire({
              title: 'Ha ocurrido un error inesperado al subir su mapa',
              icon: 'warning',
              confirmButtonText: 'Aceptar',
            });
          }
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
      
      // Leer el archivo como Data URL (base64)
      reader.readAsDataURL(this.selectedFile);
      
    } else {
      Swal.fire({
        title: 'Asegúrese de elegir un mapa y elegir un nombre válido',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
