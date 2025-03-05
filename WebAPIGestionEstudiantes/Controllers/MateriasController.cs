using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using WebAPIGestionEstudiantes.Data;
using WebAPIGestionEstudiantes.Models;

namespace WebAPIGestionEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {

        private readonly MateriaData _materiaData;
        //private readonly MateriaData _materiaData = new MateriaData();

        public MateriasController(MateriaData materiaData)
        {
            _materiaData = materiaData;
        }

        /// <summary>
        /// lista las materias existentes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("ListarMaterias")]
        public async Task<IActionResult> ListarMaterias()
        {
            List<Materia> Lista = await _materiaData.ListaMaterias();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }



        
    }
}
