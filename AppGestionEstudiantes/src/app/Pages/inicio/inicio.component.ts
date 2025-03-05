import { Component,inject } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { Estudiante } from '../../Models/Estudiante';
import { EstudianteService } from '../../Services/estudiante.service';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatMenuModule,MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatToolbarModule,RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private estudianteServicio = inject(EstudianteService);
  public listaEstudiantes:Estudiante[] = [];
  public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','accion'];

  obtenerListadoEstudiantes(){
    this.estudianteServicio.listarEstudiantes().subscribe({
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
    if(confirm("Desea eliminar el estudiante " + estudiante.nombreCompleto)){
      this.estudianteServicio.eliminarEstudiante(estudiante.id_Estudiante).subscribe({
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

  materiasEstudiante(estudiante:Estudiante){
    this.router.navigate(['/materias',estudiante.id_Estudiante]);
  }

  materiaEstudiante(estudiante:Estudiante){
    this.router.navigate(['/materias',estudiante.id_Estudiante]);
  }
}
