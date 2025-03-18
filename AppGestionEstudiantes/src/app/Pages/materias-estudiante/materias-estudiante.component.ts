import { Component, inject, Input } from '@angular/core';
import { Estudiante } from '../../Models/Estudiante';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudianteService } from '../../Services/estudiante.service';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxToastNotifierModule } from 'ngx-toast-notifier';

@Component({
  selector: 'app-materias-estudiante',
  imports: [MatMenuModule,MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatToolbarModule,RouterModule,NgxToastNotifierModule],
  templateUrl: './materias-estudiante.component.html',
  styleUrl: './materias-estudiante.component.css'
})
export class MateriasEstudianteComponent {
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
  public cantMaterias = 0;
  public NombreEstudiante='SIN NOMBRE';
  //E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE,M.NOMBRE MATERIA, P.NOMBRE NOMBRE_PROFESOR 
  //public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','accion'];
  //public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','materia','nombre_Profesor'];
  public displayedColumns : string[] = ['materia','nombre_Profesor'];

  obtenerListadoEstudiantes(){
    this.estudianteServicio.listarEstudiantes().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.cantMaterias = data.length;
          this.materiasEstudiantes = data;
        }
      },
      error:(err: { message: any; })=>{
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
          
          if(data.length > 0){
            this.cantMaterias = data.length;
            this.materiasEstudiantes = data;
            this.NombreEstudiante = data[0].nombreCompleto;
          }
          else{
            //mensaje que el estudiante no tiene materias asignadas
            alert('El estudiante no tiene materias asignadas')
            if(confirm("Desea crear mataeria para el estudiante ")){
            }
            //preguntar si desea crear materia ahora
          }

        },
        error:(err: { message: any; }) =>{
          console.log(err.message)
        }
      })
    }
  }

  nuevoEstudiante(){
    this.router.navigate(['/estudiante',0]);
  }

  nuevaClase(){
    if (this.materiasEstudiantes.length < 3 ) {
      console.log('desea crear nueva clase para el estudiante tal?');
      this.router.navigate(['/clase',0]);  
    }
    else{
      alert('El estudiante ya tiene 3 materias asignadas');
      //alert("Buenas buenas\nValidando saltos de léa\nEspero que te guste");
      // window.alert("Bienvenido a nuestro sitio web");
      // swal("Oops!", "Something went wrong on the page!", "error");//pendiente implementacion
    }
    
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
        next:(data: any)=>{
          // if(data.isSuccess){
            this.obtenerListadoEstudiantes();
          // }else{
          //   alert("no se pudo eliminar")
          // }
        },
        error:(err: { message: any; })=>{
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
        error:(err: { message: any; }) =>{
          console.log(err.message)
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }
}
