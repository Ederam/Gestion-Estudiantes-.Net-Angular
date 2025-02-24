import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsetiings';
import { Estudiante } from '../Models/Estudiante';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

private http = inject(HttpClient);
private apiUrl:string = appsettings.apiUrl+"Estudiante" 

  constructor() { }

  //http://localhost:5190/api/Estudiante/ListarEstudiantes
  listarEstudiantes(){
    return this.http.get<Estudiante[]>(this.apiUrl+'/listarEstudiantes');
  }

  // http://localhost:5190/api/Estudiante/1
  obtenerEstudianteById(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:5190/api/Estudiante
  /* {
    "nombreCompleto": "VLADIMIR HERNANDEZ"
    
  } */
  crearEstudiante(estudiante:Estudiante){
    return this.http.post<ResponseApi>(this.apiUrl,estudiante);
  }

  //http://localhost:5190/api/Estudiante
  /* {
    "id_Estudiante": 4,
      "nombreCompleto": "DUVAN VARGASHERNANDEZ"
  } */
  // editarEstudiante(estudiante:Estudiante){
  //   // return this.http.put<ResponseApi>(this.apiUrl,estudiante);
  //   return this.http.put<ResponseApi>(this.apiUrl,{ "id_Estudiante": 4, "nombreCompleto": "DUVAN VARGASHERNANDEZ" });
  // }

  editarEstudiante(estudiante:Estudiante){
    return this.http.put<ResponseApi>(this.apiUrl,estudiante);
  }

  //http://localhost:5190/api/Estudiante/1005
  eliminarEstudiante(id : number){
    return this.http.delete<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

}
