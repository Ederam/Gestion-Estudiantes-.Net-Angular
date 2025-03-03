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
                            Creaditos = Convert.ToInt32(reader["CREDITOS"]),
                        });
                    }
                }
            }
            return lista;
        }

    }
}
