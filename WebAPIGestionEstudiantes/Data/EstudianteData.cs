﻿using WebAPIGestionEstudiantes.Models;
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
            Estudiante estudiante = new Estudiante();

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
                        estudiante = new Estudiante
                        {
                            Id_Estudiante = Convert.ToInt32(reader["ID_ESTUDIANTE"]),
                            NombreCompleto = reader["NOMBRE_ESTUDIANTE"].ToString(),                            
                            Materia = reader["MATERIA"].ToString(),
                            Nombre_Profesor = reader["NOMBRE_PROFESOR"].ToString(),
                        };
                    }
                }
            }
            return estudiante;
        }

        [Obsolete]
        public async Task<bool> CrearEstudiante(Estudiante Estudiante)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("SP_CREAR_ESTUDIANTE", con);
                cmd.Parameters.AddWithValue("@NOMBRE_COMPLETO", Estudiante.NombreCompleto);
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

                SqlCommand cmd = new SqlCommand("SP_EDITAR_ESTUDIANTE", con);
                cmd.Parameters.AddWithValue("@ID_ESTUDIANTE", estudiante.Id_Estudiante);
                cmd.Parameters.AddWithValue("@NOMBRE_ESTUDIANTE", estudiante.NombreCompleto);
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

                SqlCommand cmd = new SqlCommand("SP_ELIMINAR_ESTUDIANTE", con);
                cmd.Parameters.AddWithValue("@ID_ESTUDIANTE", id);
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
