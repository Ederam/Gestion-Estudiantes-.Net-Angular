import { Component, inject, Input, OnInit } from '@angular/core';
import { EstudianteService } from '../../Services/estudiante.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Estudiante } from '../../Models/Estudiante';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Clase } from '../../Models/Clase';



@Component({
  selector: 'app-clase',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './clase.component.html',
  styleUrl: './clase.component.css'
})
export class ClaseComponent implements OnInit  {

@Input('id') idEstudiante! : number;
  private estudianteServicio = inject(EstudianteService);
  public formBuild = inject(FormBuilder);

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
