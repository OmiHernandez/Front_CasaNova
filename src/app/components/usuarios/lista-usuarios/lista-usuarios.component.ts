import { Component } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  standalone: false,
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  listaUsuarios:any[]=[];
  constructor( private userService:UserServiceService){

    this.userService.getUsers().subscribe((data:any)=>{
      this.listaUsuarios = data;
    },error => {
      console.log("No se encontraron los usuarios");
    })
  }

  

  deleteUser(id:string){
    console.log(id,"ID");-
    Swal.fire({
      title: "Estas seguro?",
      text: "Desea eliminar el usuario permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(id).subscribe(data=>{
          
        },error=>{

        })

        Swal.fire({
          title: "Hecho",
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
        
      }
    });
  }

}
