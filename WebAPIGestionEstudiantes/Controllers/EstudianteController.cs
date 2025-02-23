﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using WebAPIGestionEstudiantes.Data;
using WebAPIGestionEstudiantes.Models;

namespace WebAPIGestionEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteData _estudianteData;

        public EstudianteController(EstudianteData estudianteData)
        {
            _estudianteData = estudianteData;
        }

        
        [HttpGet]
        [Route("ListarEstudiantes")]
        public async Task<IActionResult> ListarEstudiantes()
        {
            List<Estudiante> Lista = await _estudianteData.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]        
        public async Task<IActionResult> ObtenerEstudianteById(int id)
        {
            Estudiante estudiante = await _estudianteData.ObtenerEstudiante(id);
            return StatusCode(StatusCodes.Status200OK, estudiante);
        }

        
        [HttpPost]        
        public async Task<IActionResult> CrearEstudiante([FromBody] Estudiante estudiante)
        {
            bool respuesta = await _estudianteData.CrearEstudiante(estudiante);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPut]
        //[Route("EditarEstudiante")]
        public async Task<IActionResult> EditarEstudiante([FromBody] Estudiante objeto)
        {
            bool respuesta = await _estudianteData.EditarEstudiante(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpDelete("{id}")]
        //[Route("EliminarEstudiante")]
        public async Task<IActionResult> EliminarEstudiante(int id)
        {
            bool respuesta = await _estudianteData.EliminarEstudiante(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }
    }
}
