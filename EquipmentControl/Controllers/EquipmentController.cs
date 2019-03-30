using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquipmentControl.Model;
using Microsoft.AspNetCore.Mvc;

namespace EquipmentControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController: ControllerBase
    {
        private readonly IEquipmentLogic Logic;

        public EquipmentController(IEquipmentLogic logic)
        {
            Logic = logic;
        }

        [HttpGet("hierarchy")]
        public IActionResult GetHierarchy()
        {
            return Ok(Logic.GetHierarchy());
        }

        [HttpGet("{id}")]
        public IActionResult DeleteUnit(Guid id)
        {
            Logic.DeleteUnit(id);
            return Ok();
        }
        [HttpPost]
        public IActionResult GetEquipment([FromBody] List<int> listOfId)
        {
            return Ok(Logic.GetEquipment(listOfId));
        }

        [HttpPut]
        public IActionResult ChangeUnit([FromBody] EquipmentModel equipment)
        {
            Logic.ChangeUnit(equipment);
            return Ok();
        }
        [HttpPut("Add")]
        public IActionResult AddUnit([FromBody]AddUnitModel equipment)
        {
            Logic.AddUnit(equipment);
            return Ok();
        }
        [HttpGet("check/{id}")]
        public IActionResult CheckEquipment(int id)
        {
            return Ok(Logic.CheckEquipment(id));
        }
    }
}
