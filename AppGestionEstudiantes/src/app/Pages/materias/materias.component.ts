import { Component, inject, Input } from '@angular/core';
import { EstudianteService } from '../../Services/estudiante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../Models/Estudiante';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-materias',
  imports: [MatMenuModule,MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatToolbarModule,RouterModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  @Input('id') idEstudiante! : number;
  private estudianteServicio = inject(EstudianteService);
  public formBuild = inject(FormBuilder);

  public formEstudiante:FormGroup = this.formBuild.group({
    id_Estudiante: [''],
    nombreCompleto: [''],
    materia: [''],
    nombre_Profesor: [''],
  });


  
  public listaEstudiantes:Estudiante[] = [];
  public materiasEstudiantes:Estudiante[] = [];
  //E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE,M.NOMBRE MATERIA, P.NOMBRE NOMBRE_PROFESOR 
  //public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','accion'];
  public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','materia','nombre_Profesor'];

  obtenerListadoEstudiantes(){
    this.estudianteServicio.listarEstudiantes().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.materiasEstudiantes = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    //this.obtenerListadoEstudiantes();
    //this.traerMateriasEstudiante();
  }

  ngOnInit(): void {
    if(this.idEstudiante != 0){
      this.estudianteServicio.obtenerMateriasXEstudianteById(this.idEstudiante).subscribe({
        next:(data: any) =>{
          // this.formEstudiante.patchValue({    
          //   id_Estudiante: data.id_Estudiante,
          //   nombreCompleto: data.nombreCompleto,
          //   materia: data.materia,
          //   nombre_Profesor: data.nombre_Profesor,
          // })
          
          if(data.length > 0){
            this.materiasEstudiantes = data;
          }

        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  nuevoEstudiante(){
    this.router.navigate(['/estudiante',0]);
  }

  nuevaClase(){
    this.router.navigate(['/clase',0]);
  }

  //http://localhost:5190/api/Estudiante
  editarEstudiante(estudiante:Estudiante){
    this.router.navigate(['/estudiante',estudiante.id_Estudiante]);
  }

  materiaEstudiante(estudiante:Estudiante){
    this.router.navigate(['/materias',estudiante.id_Estudiante]);
  }

  eliminarEstudiante(estudiante:Estudiante){
    if(confirm("Desea eliminar el empleado " + estudiante.nombreCompleto)){
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
    this.router.navigate(['/estudiante',estudiante.id_Estudiante]);
  }

  traerMateriasEstudiante(){
    if(this.idEstudiante != 0){
      this.estudianteServicio.obtenerMateriasXEstudianteById(this.idEstudiante).subscribe({
        next:(data: any) =>{
          this.formEstudiante.patchValue({    

            id_Estudiante: data.id_Estudiante,
            nombreCompleto: data.nombreCompleto,
            materia: data.materia,
            nombre_Profesor: data.nombre_Profesor,

          })
          // this.myForm.get('input1').disable({ onlySelf: true });
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }
}
