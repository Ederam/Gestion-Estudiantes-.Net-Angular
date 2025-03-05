import { Component, inject, Input, OnInit } from '@angular/core';
import { EstudianteService } from '../../Services/estudiante.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudiante } from '../../Models/Estudiante';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Clase } from '../../Models/Clase';
import { NgFor } from '@angular/common';
import { ClaseInsert } from '../../Models/ClaseInsert';



@Component({
  selector: 'app-clase',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,NgFor],
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent implements OnInit  {

@Input('id') idEstudiante! : number;
  private estudianteServicio = inject(EstudianteService);
  public formBuild = inject(FormBuilder);
  opciones: string[] =[];
  materias=[
    {
      id:1, 
      nombre: 'Seleccione',
      creditos: 3
    },
    {
      id:2,
      nombre: 'matematicas',
      creditos: 3
    },
    {
      id:3, 
      nombre: 'español',
      creditos: 4
    },
    {
      id:4, 
      nombre: 'Inglés',
      creditos: 5
    }
  ]
  listaMaterias =['Seleccione', 'Español', 'Inglés', 'Historia', 'Pensamiento','Informática'];
  materia: ClaseInsert | undefined


  public formEstudiante:FormGroup = this.formBuild.group({
    // id_Estudiante: [''],
    // nombreCompleto: [''],
    // materia: [''],
    // nombre_Profesor: [''],

    idMateria: [''],
    nombreClase: [''],
    horarioClase: [''],
    idProfesor: [''],
    isEstudiante: [''],
  });

  constructor(private router:Router){
    
  }

  ngOnInit(): void {
      if(this.idEstudiante != 0){
        this.estudianteServicio.obtenerEstudianteById(this.idEstudiante).subscribe({
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
      this.formEstudiante.value.idMateria = this.materias[1].nombre; 
      console.log(this.formEstudiante.value.idMateria);   
    }
  
    guardar_Old(){
      const estudiante : Estudiante = {
        id_Estudiante : this.idEstudiante,
        nombreCompleto: this.formEstudiante.value.nombreCompleto,
        materia: '',
        nombre_Profesor: '',
  
      }
    
      if(this.idEstudiante == 0){
        this.estudianteServicio.crearEstudiante(estudiante).subscribe({
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
        this.estudianteServicio.editarEstudiante(estudiante).subscribe({
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
    
    guardar(){
      const clase : Clase = {
        idMateria: this.formEstudiante.value.idMateria,
        nombreClase: this.formEstudiante.value.nombreClase,
        horarioClase: this.formEstudiante.value.horarioClase,
        idProfesor: this.formEstudiante.value.idProfesor,
        isEstudiante: this.formEstudiante.value.isEstudiante,                           
  
      }
    
      if(this.idEstudiante == 0){
        //clase.isEstudiante = this.idEstudiante;
        this.estudianteServicio.crearClase(clase).subscribe({
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
        this.estudianteServicio.editarClase(clase).subscribe({
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
