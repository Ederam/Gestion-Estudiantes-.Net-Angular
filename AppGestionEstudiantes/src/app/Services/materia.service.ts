import { Injectable,inject } from '@angular/core';
import { Materia } from '../Models/Materia';
import { appsettings } from '../../Settings/appsetiings';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl+"Estudiante";
  private apiUrlMateria:string = appsettings.apiUrl+"Materias";

  constructor() { }

  // http://localhost:5190/api/Estudiante
  obtenerMaterias(){
    //return this.http.get<Materia[]>(this.apiUrl+'/listarMaterias');
    return this.http.get<Materia[]>(this.apiUrl);
  }

  crearMateria(materia:Materia){
      //return this.http.post<ResponseApi>(this.apiUrl,estudiante);
      return this.http.post<ResponseApi>(this.apiUrl,materia);
    }

    editarMateria(materia:Materia){
        return this.http.put<ResponseApi>(this.apiUrl,materia);
      }

      eliminarMateria(id : number){
          //return this.http.delete<Estudiante[]>(`${this.apiUrl}/${id}`);
          let msg ={
            "isSuccess": true
          }
          //let msg = 'ELIMINACION POR CONSTRUIR EN EL SERVICIO'
          console.log(msg)
          return msg;
        }

  // http://localhost:5190/api/Estudiante/1
    obtenerMateriaById(id : number){
      return this.http.get<Materia[]>(`${this.apiUrl}/${id}`);
    }

}
