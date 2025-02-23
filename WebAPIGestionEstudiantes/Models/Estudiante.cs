namespace WebAPIGestionEstudiantes.Models
{
    public class Estudiante
    {
        public int Id_Estudiante { get; set; }
        public string? NombreCompleto { get; set; }
        public string Materia { get; set; }
        public string Nombre_Profesor { get; set; }
    }
}
