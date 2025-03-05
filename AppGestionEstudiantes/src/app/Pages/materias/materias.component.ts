import { Component, inject, Input } from '@angular/core';
import { EstudianteService } from '../../Services/estudiante.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Estudiante } from '../../Models/Estudiante';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MateriaService } from '../../Services/materia.service';
import { Materia } from '../../Models/Materia';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-materias',
  imports: [MatMenuModule,MatCardModule,MatTableModule,MatIconModule,MatButtonModule,MatToolbarModule,RouterModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  //@Input('id') idEstudiante! : number;
  private materiaservice = inject(MateriaService);
  public formBuild = inject(FormBuilder);
  public listaMaterias:Materia[] = [];

  
  public formMaterias:FormGroup = this.formBuild.group({
    id_Materia: [''],
    nombreMateria: [''],
    creditos: [''],    
  });

  
  //public listaEstudiantes:Estudiante[] = [];
  public materiasEstudiantes:Estudiante[] = [];
  public cantMaterias = 0;
  //E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE,M.NOMBRE MATERIA, P.NOMBRE NOMBRE_PROFESOR 
  //public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','accion'];
  //public displayedColumns : string[] = ['id_Estudiante','nombreCompleto','materia','nombre_Profesor'];
  public displayedColumns : string[] = ['id_Materia','nombreMateria','creditos'];

  // obtenerListadoEstudiantes(){
  //   this.estudianteServicio.listarEstudiantes().subscribe({
  //     next:(data)=>{
  //       if(data.length > 0){
  //         this.cantMaterias = data.length;
  //         this.materiasEstudiantes = data;
  //       }
  //     },
  //     error:(err)=>{
  //       console.log(err.message)
  //     }
  //   })
  // }
  cargarMaterias(){
    this.materiaservice.obtenerMaterias().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaMaterias = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    this.cargarMaterias();
  }

  // ngOnInit(): void {
    
  // }

  nuevoEstudiante(){
    this.router.navigate(['/estudiante',0]);
  }

  nuevaClase(){
    if (this.materiasEstudiantes.length <3) {
      this.router.navigate(['/clase',0]);  
    }
    else{
      alert('El estudiante ya tiene 3 materias asignadas')
    }
    
  }

  //http://localhost:5190/api/Estudiante
  editarEstudiante(estudiante:Estudiante){
    this.router.navigate(['/estudiante',estudiante.id_Estudiante]);
  }

  materiaEstudiante(estudiante:Estudiante){
    this.router.navigate(['/materias',estudiante.id_Estudiante]);
  }

  eliminarMateria(materia:Materia){
    if(confirm("Desea eliminar la materia " + materia.nombreMateria)){
      // this.materiaservice.eliminarMateria(materia.id_Materia).subscribe({
      //   next:(data)=>{
      //       //this.obtenerListadoEstudiantes();
          
      //   },
      //   error:(err)=>{
      //     console.log(err.message)
      //   }
      // })
    }
  }

  materiasEstudiante(estudiante:Estudiante){
    this.router.navigate(['/estudiante',estudiante.id_Estudiante]);
  }

  // traerMateriasEstudiante(){
  //   if(this.idEstudiante != 0){
  //     this.estudianteServicio.obtenerMateriasXEstudianteById(this.idEstudiante).subscribe({
  //       next:(data: any) =>{
  //         this.formEstudiante.patchValue({    

  //           id_Estudiante: data.id_Estudiante,
  //           nombreCompleto: data.nombreCompleto,
  //           materia: data.materia,
  //           nombre_Profesor: data.nombre_Profesor,

  //         })
  //         // this.myForm.get('input1').disable({ onlySelf: true });
  //       },
  //       error:(err) =>{
  //         console.log(err.message)
  //       }
  //     })
  //   }
  // }


  guardar(){
    const materia : Materia = {
      id_Materia : this.formMaterias.value.id_Materia,
      nombreMateria: this.formMaterias.value.nombreMateria,
      creditos: this.formMaterias.value.creditos,      
    }
  
    // if(this.idEstudiante == 0){
    //   this.materiaservice.crearMateria(materia).subscribe({
    //     next:(data) =>{
    //       if(data.isSuccess){
    //         this.router.navigate(["/"]);
    //       }else{
    //         alert("Error al crear")
    //       }
    //     },
    //     error:(err) =>{
    //       console.log(err.message)
    //     }
    //   })
    // }else{
    //   this.materiaservice.editarMateria(materia).subscribe({
    //     next:(data) =>{
    //       if(data.isSuccess){
    //         this.router.navigate(["/"]);
    //       }else{
    //         alert("Error al editar")
    //       }
    //     },
    //     error:(err) =>{
    //       console.log(err.message)
    //     }
    //   })
    // }
  
  
  }
  
  volver(){
    this.router.navigate(["/"]);
  }
}
