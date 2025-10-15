import { Component } from '@angular/core';
import { MapasService } from 'src/app/services/mapas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MapImageService } from 'src/app/services/map-image.service';

@Component({
  selector: 'app-menu-mapas',
  templateUrl: './menu-mapas.component.html',
  styleUrls: ['./menu-mapas.component.scss']
})
export class MenuMapasComponent {

  mapas:any[]=[];
  urls:string[]=[
    "/assets/img/paseras.png",
    "/assets/img/ejemplo3.jpg",
    "/assets/img/ejemplo2.png",

  ];
  seleccionado: string = this.urls[0];

  constructor(private mapasService:MapasService,private router:Router, private mapImageService:MapImageService){
    this.mapasService.getMapas().subscribe( datos => {
        this.mapas = datos;
        console.log(this.mapas);
    });

    // this.mapImageService.getUrlMapas().subscribe((data:any)=>{
    //   this.urls=data;
    // });
  }

  ngOnInit(){
 
  }


  crearMapa(){
    const selectElement = document.getElementById('selectUrls') as HTMLSelectElement;
    const opcionSeleccionada = selectElement.value;
    var input=document.getElementById("nombreMapa") as HTMLInputElement;
    
    
    const nombre = input.value;

    var datos = {
      nombreMapa:input.value,
      UrlMapa:opcionSeleccionada
    }
    // alert(opcionSeleccionada);

  
    if (nombre === "" || /^\s+$/.test(nombre)) {
        Swal.fire({
          title: "Alerta",
          text: "Ingresa un nombre para el mapa",
          icon: "error"
        });
    } else {
      this.router.navigate(['/dashboard/mapa',nombre,JSON.stringify(datos)]);
    }
  }


  alertMapa(){
    Swal.fire({
      title: 'Crear mapa',
      input: 'text',
      inputPlaceholder: 'Nombre',
      showCancelButton: true,
      confirmButtonText: 'Siguiente'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nombre = result.value;
    
        Swal.fire({
          title: 'Ingrese la URL',
          input: 'url',
          inputPlaceholder: 'https://ejemplo.com',
          showCancelButton: true,
          confirmButtonText: 'Enviar'
        }).then((urlResult) => {
          if (urlResult.isConfirmed && urlResult.value) {
            const url = urlResult.value;
    
            // Realiza la acción que necesitas con `nombre` y `url`
            console.log('Nombre:', nombre);
            console.log('URL:', url);
            // Puedes añadir aquí cualquier lógica adicional
          }
        });
      }
    });
  }

  

  eliminarMapa(idMapa: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar la alerta de éxito inmediatamente
        Swal.fire("Éxito", "Se eliminó el mapa", "success").then(() => {
          // Recargar la página al cerrar la alerta de éxito
          location.reload();
        });
        
        // Intentar eliminar el mapa en el servidor
        this.mapasService.deleteMapa(idMapa).subscribe({
          next: (datos) => {
            // Actualizar la lista de mapas localmente
            this.mapas = this.mapas.filter(mapa => mapa.id !== idMapa);
          },
          error: (error) => {
            console.error("Error eliminando el mapa", error);
          }
        });
      }
    });
  }



/*
eliminarMapa(idMapa:string){
  Swal.fire({
    title: "Seguro?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Eliminar",
    denyButtonText: `No eliminar`
  }).then((result) => {
    
    if (result.isConfirmed) {
      this.mapasService.deleteMapa(idMapa).subscribe(datos =>{
         Swal.fire("Exito", "Se elimino el mapa", "success");
      });
     
    } else if (result.isDenied) {
      
    }
  });

}
*/

configurarMapa(idMapa:string){
  this.router.navigate(['/dashboard/mapa',"ConfigurarMapa",idMapa]);
}










  

}
