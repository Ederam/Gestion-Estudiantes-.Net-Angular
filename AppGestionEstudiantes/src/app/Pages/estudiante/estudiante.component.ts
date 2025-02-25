import { Component,inject, Input,OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';

import { EstudianteService } from '../../Services/estudiante.service';
import { Router } from '@angular/router';
import { Estudiante } from '../../Models/Estudiante';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {

  @Input('id') idEstudiante! : number;
  private estudianteServicio = inject(EstudianteService);
  public formBuild = inject(FormBuilder);

  public formEstudiante:FormGroup = this.formBuild.group({
    id_Estudiante: [''],
    nombreCompleto: [''],
    materia: [''],
    nombre_Profesor: [''],
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

  guardar(){
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
  
  volver(){
    this.router.navigate(["/"]);
  }

}
