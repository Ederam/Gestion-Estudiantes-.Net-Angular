using System.Data.SqlClient;
using System.Data;
using WebAPIGestionEstudiantes.Models;
using Microsoft.Extensions.Configuration;

namespace WebAPIGestionEstudiantes.Data
{
    public class ProfesorData
    {
        private readonly string conexion;

        public ProfesorData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("ConexionBD")!;
        }


        [Obsolete]
        public async Task<List<Profesor>> ListaProfesores()
        {
            List<Profesor> lista = new List<Profesor>();
            try
            {
                using (var con = new SqlConnection(conexion))
                {
                    await con.OpenAsync();
                    SqlCommand cmd = new SqlCommand("SP_CARGAR_INFO_PROFESORES", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Materia materia = new Materia();
                            int Idmat = 0;
                            lista.Add(new Profesor
                            {
                                Id_Profesor = Convert.ToInt32(reader["ID_PROFESOR"]),
                                NombreProfesor = reader["NOMBRE_PROFESOR"].ToString()!,
                                Id_Materia = Convert.ToInt32(reader["ID_MATERIA"]),
                                NombreMateria = reader["MATERIA"].ToString()!,

                            });
                        }
                    }
                }
                return lista;
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR:" + e.Message);
                return lista;
            }
        }

        [Obsolete]
        public async Task<Profesor> ObtenerProfesorById(int Id)
        {
            Profesor profesor = new Profesor();
            try
            {
                using (var con = new SqlConnection(conexion))
                {
                    await con.OpenAsync();
                    SqlCommand cmd = new SqlCommand("SP_CARGAR_PROFESOR", con);
                    cmd.Parameters.AddWithValue("@ID_PROFESOR", Id);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            profesor = new Profesor
                            {
                                Id_Profesor = Convert.ToInt32(reader["ID_PROFESOR"]),
                                NombreProfesor = reader["NOMBRE_PROFESOR"].ToString(),
                            };
                        }
                    }
                }
                return profesor;
            }
            catch (Exception e)
            {
                Console.WriteLine("ERROR:" + e.Message);
                return profesor;
            }            
        }


        [Obsolete]
        public async Task<bool> CrearProfesor(Profesor Profesor)
        {
            bool respuesta = true;
            try
            {
                using (var con = new SqlConnection(conexion))
                {

                    SqlCommand cmd = new SqlCommand("SP_CREAR_PROFESOR", con);
                    cmd.Parameters.AddWithValue("@NOMBRE_PROFESOR", Profesor.NombreProfesor);
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
            catch (Exception e)
            {
                Console.WriteLine("ERROR:" + e.Message);
                return respuesta;
            }
        }



        [Obsolete]
        public async Task<bool> EditarProfesor(Profesor profesor)
        {
            bool respuesta = true;
            try
            {
                using (var con = new SqlConnection(conexion))
                {

                    SqlCommand cmd = new SqlCommand("SP_EDITAR_PROFESOR", con);
                    cmd.Parameters.AddWithValue("@ID_PROFESOR", profesor.Id_Profesor);
                    cmd.Parameters.AddWithValue("@NOMBRE_PROFESOR", profesor.NombreProfesor);
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
            catch (Exception e)
            {
                Console.WriteLine("ERROR:" + e.Message);
                return respuesta;
            }
        }

        [Obsolete]
        public async Task<bool> EliminarProfesor(int id)
        {
            bool respuesta = true;
            try
            {
                using (var con = new SqlConnection(conexion))
                {

                    SqlCommand cmd = new SqlCommand("SP_ELIMINAR_PROFESOR", con);
                    cmd.Parameters.AddWithValue("@ID_PROFESOR", id);
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
            catch (Exception e)
            {
                Console.WriteLine("ERROR:" + e.Message);
                return respuesta;
            }

            
        }

    }
}
