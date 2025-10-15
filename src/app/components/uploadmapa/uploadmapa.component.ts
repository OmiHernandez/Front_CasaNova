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


  fileName:string= ''
  selectedFile: File | null = null;

  firebaseConfig = {
    apiKey: "AIzaSyCSPLvaNKKOLrOHDtFk35OYdYRkXmgRNQQ",
    authDomain: "dhs-maps-e4002.firebaseapp.com",
    projectId: "dhs-maps-e4002",
    storageBucket: "dhs-maps-e4002.appspot.com",
    messagingSenderId: "730076217656",
    appId: "1:730076217656:web:2bc4a3c8e57b2a164401cd"
  };
  app = initializeApp(this.firebaseConfig);
  
  
  fb;
  downloadURL: Observable<string>;
  constructor(private router:Router ,private mapa:MapasService,private Api: UploadmapService/*, private storage: AngularFireStorage*/) {}

  ngOnInit() {
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    this.selectedFile = file
   
  }

  crearArchivo() {

    if (this.selectedFile && this.fileName!='') {
      const storage = getStorage();
      const storageRef = ref(storage, this.fileName);
  
      let metadata = {
        contentType: 'image/jpeg'
      };
      

      const uploadTask = uploadBytesResumable(storageRef, this.selectedFile, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    Swal.fire({
      title: 'Ha ocurrido un error inesperado al subir su mapa',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      var mapa = {
        nombreMapa:this.fileName,
        urlMapa:downloadURL,

      }
      this.mapa.addMapa(mapa).subscribe(data=>{
        this.router.navigate(['/dashboard/mapa',mapa.nombreMapa,JSON.stringify(mapa)]);

      });
    });
    
  }
);
    }
    else{
      Swal.fire({
        title: 'Asegurese de elegir un mapa y elegir un nombre valido',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }

}
