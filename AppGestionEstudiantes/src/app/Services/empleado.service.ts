import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsetiings';
import { Estudiante } from '../Models/Estudiante';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

private http = inject(HttpClient);
private apiUrl:string = appsettings.apiUrl+"Estudiante" 

  constructor() { }

  listarEmpleados(){
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  obtenerEmpleado(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

  crearEstudiante(estudiante:Estudiante){
    return this.http.post<ResponseApi>(this.apiUrl,estudiante);
  }

  editarEstudiante(estudiante:Estudiante){
    return this.http.put<ResponseApi>(this.apiUrl,estudiante);
  }

  eliminarEmpleado(id : number){
    return this.http.delete<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

}
