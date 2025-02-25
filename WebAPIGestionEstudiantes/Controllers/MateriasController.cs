using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

using WebAPIGestionEstudiantes.Data;
using WebAPIGestionEstudiantes.Models;

namespace WebAPIGestionEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : Controller
    {
        private readonly EstudianteData _estudianteData;

        public MateriasController(EstudianteData estudianteData)
        {
            _estudianteData = estudianteData;
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet("{id}")]
        ///http://localhost:5190/api/Materias/1
        public async Task<IActionResult> ObtenerMateriasXEstudianteById(int id)
        {
            List<Estudiante> Lista = await _estudianteData.ObtenerMateriasXEstudiante(id);
            return StatusCode(StatusCodes.Status200OK, Lista);

            //Estudiante estudiante = await _estudianteData.ObtenerMateriasXEstudiante(id);
            //return StatusCode(StatusCodes.Status200OK, estudiante);
        }
    }
}
