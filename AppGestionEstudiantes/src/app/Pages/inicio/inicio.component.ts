import { Component,inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { Estudiante } from '../../Models/Estudiante';
import { EstudianteService } from '../../Services/estudiante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private empleadoServicio = inject(EstudianteService);
  public listaEstudiantes:Estudiante[] = [];
  public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','accion'];

  obtenerListadoEstudiantes(){
    this.empleadoServicio.listarEstudiantes().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaEstudiantes = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    this.obtenerListadoEstudiantes();
  }

  nuevoEstudiante(){
    this.router.navigate(['/estudiante',0]);
  }

  //http://localhost:5190/api/Estudiante
  editarEstudiante(estudiante:Estudiante){
    this.router.navigate(['/estudiante',estudiante.id_Estudiante]);
  }
  eliminarEstudiante(estudiante:Estudiante){
    if(confirm("Desea eliminar el empleado " + estudiante.nombreCompleto)){
      this.empleadoServicio.eliminarEstudiante(estudiante.id_Estudiante).subscribe({
        next:(data)=>{
          // if(data.isSuccess){
            this.obtenerListadoEstudiantes();
          // }else{
          //   alert("no se pudo eliminar")
          // }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }
}
