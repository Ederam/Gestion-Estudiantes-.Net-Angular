import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EstudianteComponent } from './Pages/estudiante/estudiante.component';
import { ProfesoresComponent } from './Pages/profesores/profesores.component';
import { MateriasComponent } from './Pages/materias/materias.component';
import { NgModule } from '@angular/core';
import { ClaseComponent } from './Pages/clase/clase.component';
import { MateriasEstudianteComponent } from './Pages/materias-estudiante/materias-estudiante.component';

 export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'estudiantes', component:InicioComponent},
    {path:'estudiante/:id', component:EstudianteComponent},
    {path:'profesores', component:ProfesoresComponent},
    {path:'materias', component:MateriasComponent},
    {path:'materias/:id', component:MateriasComponent},
    {path:'clases', component:ClaseComponent},
    {path:'clase/:id', component:ClaseComponent},
    {path:'materiasEstudiante/:id', component:MateriasEstudianteComponent},
];
