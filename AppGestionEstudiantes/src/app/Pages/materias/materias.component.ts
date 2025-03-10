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

  public formInserMateria:FormGroup = this.formBuild.group({
    id_Materia_Insert: [''],
    nombreMateriaInsert: [''],
    creditosInsert: [''],    
    codigoProfesorInsert: [''],    
  });
  
  // para insert
  @Input('id') idMateria! : number;
  
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

  ngOnInit(): void {
    // this.formInserMateria.controls['id_Materia_Insert'].disable();
    // if(this.idMateria != 0){
    //   this.materiaservice.obtenerMateriaById(this.idMateria).subscribe({
    //     next:(data: any) =>{
    //       this.formInserMateria.patchValue({    
    //         id_Materia_Insert: data.id_Materia,
    //         nombreMateriaInsert: data.id_Estudiante,
    //         creditosInsert: data.id_Estudiante,    
    //         codigoProfesorInsert: data.id_Estudiante,    
    //       })
    //       // this.myForm.get('input1').disable({ onlySelf: true });
    //     },
    //     error:(err) =>{
    //       console.log(err.message)
    //     }
    //   })
    // }
    //this.formInserMateria.disabled();
    //this.formInserMateria = !this.formInserMateria;    
  }

  //http://localhost:5190/api/Materias
  nuevoMateria(){
    //ocultar el formulario de la lista de materias
    //this.formInserMateria.value.style.display = 'block';
    //mostrar formulario de creacion de nueva materia
    this.router.navigate(['/materias',0]);
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
      id_Materia : this.idMateria,
      nombreMateria: this.formInserMateria.value.nombreMateria,
      creditos: this.formInserMateria.value.creditos,
      id_profesor: this.formInserMateria.value.creditos,         
    }
  
    if(this.idMateria == 0){
      this.materiaservice.crearMateria(materia).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }else{
      this.materiaservice.editarMateria(materia).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  
  
  }
  
  volver(){
    this.router.navigate(["/"]);
  }
}
