import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsetiings';
import { Estudiante } from '../Models/Estudiante';
import { ResponseApi } from '../Models/ResponseApi';
import { Clase } from '../Models/Clase';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

private http = inject(HttpClient);
private apiUrl:string = appsettings.apiUrl+"Estudiante"; 
private apiUrlMateria:string = appsettings.apiUrl+"Materias";
private apiUrlClases:string = appsettings.apiUrl+"Clase";

  constructor() { }

  //http://localhost:5190/api/Estudiante/ListarEstudiantes
  listarEstudiantes(){
    return this.http.get<Estudiante[]>(this.apiUrl+'/listarEstudiantes');
  }

  // http://localhost:5190/api/Estudiante/1
  obtenerEstudianteById_Old(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

  obtenerEstudianteById(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrl}/ObtenerEstudianteById/${id}`);
  }

  // http://localhost:5190/api/Estudiante
  /* {
    "nombreCompleto": "VLADIMIR HERNANDEZ"
    
  } */
  crearEstudiante(estudiante:Estudiante){
    return this.http.post<ResponseApi>(this.apiUrl,estudiante);
  }

  crearClase(clase:Clase){
    return this.http.post<ResponseApi>(this.apiUrlClases,clase);
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

  editarClase(clase:Clase){
    return this.http.put<ResponseApi>(this.apiUrl,clase);
  }

  //http://localhost:5190/api/Estudiante/1005
  eliminarEstudiante(id : number){
    return this.http.delete<Estudiante[]>(`${this.apiUrl}/${id}`);
  }

  //http://localhost:5190/api/Materias/1
  obtenerMateriasXEstudianteById_Old(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrlMateria}/ObtenerEstudianteById/${id}`);//ObtenerEstudianteById
  }

  //http://localhost:5190/api/Estudiante/ObtenerMateriasXEstudianteById/1
  obtenerMateriasXEstudianteById(id : number){
    return this.http.get<Estudiante[]>(`${this.apiUrl}/ObtenerMateriasXEstudianteById/${id}`);
  }
}
