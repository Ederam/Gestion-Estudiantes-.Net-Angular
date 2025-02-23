using WebAPIGestionEstudiantes.Models;
using System.Data;
using System.Data.SqlClient;

namespace WebAPIGestionEstudiantes.Data
{
    public class EstudianteData
    {

        private readonly string conexion;

        public EstudianteData(IConfiguration configuration)
        {            
            conexion = configuration.GetConnectionString("ConexionBD")!;
        }
        [Obsolete]
        public async Task<List<Estudiante>> Lista()
        {
            List<Estudiante> lista = new List<Estudiante>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("SP_CARGAR_ESTUDIANTE", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Estudiante
                        {
                            Id_Estudiante = Convert.ToInt32(reader["ID_ESTUDIANTE"]),
                            NombreCompleto = reader["NOMBRE"].ToString()!,                            
                        });
                    }
                }
            }
            return lista;
        }

        [Obsolete]
        public async Task<Estudiante> ObtenerEstudiante(int Id)
        {
            Estudiante objeto = new Estudiante();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("SP_CARGAR_MATERIAS_X_ESTUDIANTE", con);
                cmd.Parameters.AddWithValue("@ID_ESTUDIANTE", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Estudiante
                        {
                            NombreCompleto = reader["NOMBRE_ESTUDIANTE"].ToString(),                            
                            
                        };
                    }
                }
            }
            return objeto;
        }

        [Obsolete]
        public async Task<bool> CrearEstudiante(Estudiante Estudiante)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_crearEstudiante", con);
                cmd.Parameters.AddWithValue("@NombreCompleto", Estudiante.NombreCompleto);
                //cmd.Parameters.AddWithValue("@Correo", Estudiante.Correo);
                //cmd.Parameters.AddWithValue("@Sueldo", Estudiante.Sueldo);
                //cmd.Parameters.AddWithValue("@FechaContrato", Estudiante.FechaContrato);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        [Obsolete]
        public async Task<bool> EditarEstudiante(Estudiante estudiante)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_editarEstudiante", con);
                cmd.Parameters.AddWithValue("@IdEstudiante", estudiante.Id_Estudiante);
                cmd.Parameters.AddWithValue("@NombreCompleto", estudiante.NombreCompleto);
                //cmd.Parameters.AddWithValue("@Correo", estudiante.Correo);
                //cmd.Parameters.AddWithValue("@Sueldo", estudiante.Sueldo);
                //cmd.Parameters.AddWithValue("@FechaContrato", estudiante.FechaContrato);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        [Obsolete]
        public async Task<bool> EliminarEstudiante(int id)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_eliminarEstudiante", con);
                cmd.Parameters.AddWithValue("@IdEstudiante", id);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}
