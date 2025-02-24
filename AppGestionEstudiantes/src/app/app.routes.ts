import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EstudianteComponent } from './Pages/estudiante/estudiante.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'estudiante/:id', component:EstudianteComponent},

    // {path:'',component:InicioComponent},
    // {path:'inicio',component:InicioComponent},
    // {path:'empleado/:id',component:EmpleadoComponent},
];
