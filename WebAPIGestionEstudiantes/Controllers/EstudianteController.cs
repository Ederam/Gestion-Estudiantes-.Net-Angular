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
        public async Task<IActionResult> Lista()
        {
            List<Estudiante> Lista = await _estudianteData.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Estudiante estudiante = await _estudianteData.ObtenerEstudiante(id);
            return StatusCode(StatusCodes.Status200OK, estudiante);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Estudiante objeto)
        {
            bool respuesta = await _estudianteData.CrearEstudiante(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Estudiante objeto)
        {
            bool respuesta = await _estudianteData.EditarEstudiante(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _estudianteData.EliminarEstudiante(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }
    }
}
