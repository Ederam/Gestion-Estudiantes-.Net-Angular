namespace WebAPIGestionEstudiantes.Models
{
    public class Profesor
    {
        public int? Id_Profesor { get; set; }
        public string NombreProfesor { get; set; }
        //public Materia datosMateria { get; set; }        
        public int? Id_Materia { get; set; }
        public string? NombreMateria { get; set; }
    }
}
