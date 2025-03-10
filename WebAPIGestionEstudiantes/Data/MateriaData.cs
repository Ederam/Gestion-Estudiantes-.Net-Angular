using System.Data.SqlClient;
using System.Data;
using WebAPIGestionEstudiantes.Models;

namespace WebAPIGestionEstudiantes.Data
{
    public class MateriaData
    {

        private readonly string conexion;

        public MateriaData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("ConexionBD")!;
        }

        [Obsolete]
        public async Task<List<Materia>> ListaMaterias()
        {
            List<Materia> lista = new List<Materia>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("SP_CARGAR_MATERIAS", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Materia
                        {
                            Id_Materia = Convert.ToInt32(reader["ID_MATERIA"]),
                            NombreMateria = reader["NOMBRE"].ToString()!,
                            Creditos = Convert.ToInt32(reader["CREDITOS"]),
                        });
                    }
                }
            }
            return lista;
        }

        [Obsolete]
        public async Task<bool> CrearMateria(Materia Materia)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("SP_CREAR_MATERIA", con);
                cmd.Parameters.AddWithValue("@NOMBRE_MATERIA", Materia.NombreMateria);
                cmd.Parameters.AddWithValue("@CREDITOS", Materia.Creditos);
                cmd.Parameters.AddWithValue("@ID_PROFESOR", Materia.Id_Profesor);
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
