import { Materia } from "./Materia"

//INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(5,'DIB1_D','DIURNO',3,1);
export interface Clase {
    idMateria: number,
    nombreClase: string,
    horarioClase: string,
    idProfesor: number,
    isEstudiante: number
}