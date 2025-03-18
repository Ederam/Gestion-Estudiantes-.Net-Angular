using Microsoft.AspNetCore.Mvc;
using WebAPIGestionEstudiantes.Data;
using WebAPIGestionEstudiantes.Models;

namespace WebAPIGestionEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoresController : ControllerBase
    {
        private readonly ProfesorData _profesorData;

        //public IActionResult Index()
        //{
        //    return View();
        //}

        public ProfesoresController(ProfesorData profesorData)
        {
            _profesorData = profesorData;
        }

        [HttpGet]
        [Route("ListarProfesores")]
        public async Task<IActionResult> ListarProfesores()
        {
            List<Profesor> Lista = await _profesorData.ListaProfesores();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("ObtenerProfesorById/{id}")]
        public async Task<IActionResult> ObtenerProfesorById(int id)
        {
            Profesor profesor = await _profesorData.ObtenerProfesorById(id);
            return StatusCode(StatusCodes.Status200OK, profesor);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CrearProfesor([FromBody] Profesor profesor)
        {
            bool respuesta = await _profesorData.CrearProfesor(profesor);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPut]
        //[Route("EditarEstudiante")]
        public async Task<IActionResult> EditarProfesor([FromBody] Profesor objeto)
        {
            bool respuesta = await _profesorData.EditarProfesor(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpDelete("{id}")]
        //[Route("EliminarEstudiante")]
        public async Task<IActionResult> EliminarProfesor(int id)
        {
            bool respuesta = await _profesorData.EliminarProfesor(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

    }
}
